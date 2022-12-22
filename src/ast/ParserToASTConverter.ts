import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { EZDiscordParserVisitor } from '../parser/EZDiscordParserVisitor';
import {
	ArgumentContext,
	ArrayContext,
	BinaryAtomContext,
	BinaryContext,
	BinaryExprContext,
	BinaryExprRightContext,
	BooleanContext,
	BotContext,
	ClientIDContext,
	CommandContext,
	ConditionContext,
	ConfigContext,
	ElementContext,
	ForEachBlockContext,
	FunctionCallContext,
	GuildIDContext,
	LoopContext,
	MathAtomContext,
	MathContext,
	MathExprPrimeContext,
	MathFactorContext,
	MathTermContext,
	MathTermPrimeContext,
	NumberContext,
	ParamContext,
	StatementBlockContext,
	StatementContext,
	StringContext,
	TokenContext,
	TypeContext,
	ValueContext,
	VariableAssignContext,
	VariableDeclareContext,
	VarNameContext,
	WhileBlockContext,
} from '../parser/EZDiscordParser';
import {
	Argument,
	ArrayValue,
	ASTNode,
	BinaryExpression,
	BinaryRightExpression,
	BooleanValue,
	Bot,
	ClientId,
	Command,
	Conditional,
	Config,
	ForEachLoop,
	FunctionCall,
	GuildId,
	MathValue,
	NumberValue,
	StatementBlock,
	StringValue,
	Token,
	Variable,
	VarNameValue,
	VarType,
	WhileLoop,
} from './nodes';
import { BuiltInFunction } from './nodes/FunctionCall';
import { VariableType } from '../util/ScopedSymbolTable';
import { BinaryAtom, BinaryCompare, BinaryExpressionType, BinaryOperator } from './nodes/binary/types';

type AtomValue = StringValue | VarNameValue | NumberValue | BooleanValue | FunctionCall;
type VariableValue = VarType<string | number | boolean> | BinaryExpression | FunctionCall;

export class ParserToASTConverter extends AbstractParseTreeVisitor<ASTNode> implements EZDiscordParserVisitor<ASTNode> {
	protected defaultResult(): ASTNode {
		return new Bot(new Config(new Token(''), new ClientId(''), new GuildId([])), []);
	}

	visitBot(ctx: BotContext) {
		const config = this.visitConfig(ctx.config());
		const statements = ctx.statement().map((statementContext) => this.visitStatement(statementContext));
		return new Bot(config, statements);
	}

	visitStatement(ctx: StatementContext) {
		return this.visitChildren(ctx);
	}

	visitConfig(ctx: ConfigContext) {
		return new Config(
			this.visitToken(ctx.token()!),
			this.visitClientID(ctx.clientID()!),
			this.visitGuildID(ctx.guildID()!)
		);
	}

	visitToken(ctx: TokenContext) {
		const stringNode = this.visitString(ctx.string());
		if (!stringNode.value) {
			throw Error('Token value is invalid');
		}
		return new Token(stringNode.value);
	}

	visitClientID(ctx: ClientIDContext) {
		const stringNode = this.visitString(ctx.string());
		if (!stringNode.value) {
			throw Error('Client ID value is invalid');
		}
		return new ClientId(stringNode.value);
	}

	visitGuildID(ctx: GuildIDContext) {
		return new GuildId(
			ctx
				.guildIDArray()
				.string()
				.map((idStringContext) => idStringContext.text.split("'").join(''))
		);
	}

	visitVariableDeclare(ctx: VariableDeclareContext) {
		return new Variable(ctx.VAR_NAME().text, this.visitValue(ctx.value()), true);
	}

	visitVariableAssign(ctx: VariableAssignContext) {
		return new Variable(ctx.VAR_NAME().text, this.visitValue(ctx.value()), false);
	}

	visitValue(ctx: ValueContext) {
		return this.visitChildren(ctx) as VariableValue;
	}

	visitString(ctx: StringContext) {
		return new StringValue(ctx.STRING_VALUE()?.text ?? '');
	}

	visitNumber(ctx: NumberContext) {
		return new NumberValue(Number.parseFloat(ctx.NUMBER().text));
	}

	visitBoolean(ctx: BooleanContext) {
		return new BooleanValue(JSON.parse(ctx.BOOLEAN().text.toLowerCase()));
	}

	visitVarName(ctx: VarNameContext) {
		return new VarNameValue(ctx.VAR_NAME().text);
	}

	visitFunctionCall(ctx: FunctionCallContext) {
		return new FunctionCall(
			ctx.FUNCTION().text as BuiltInFunction,
			ctx
				.params()
				.param()
				.map((paramCtx) => this.visitParam(paramCtx))
		);
	}

	visitParam(ctx: ParamContext) {
		return this.visitChildren(ctx) as AtomValue;
	}

	visitArray(ctx: ArrayContext) {
		return new ArrayValue(ctx.element().map((elementCtx) => this.visitElement(elementCtx)));
	}

	visitElement(ctx: ElementContext) {
		return this.visitChildren(ctx) as AtomValue;
	}

	visitMath(ctx: MathContext) {
		return new MathValue(ctx.text, ctx.accept(new MathExpressionParser()));
	}

	visitBinary(ctx: BinaryContext) {
		return this.visitBinaryExpr(ctx.binaryExpr());
	}

	visitBinaryExpr(ctx: BinaryExprContext) {
		const isReg = ctx.L_PAREN();
		const isNot = ctx.NOT();
		const isAtom = ctx.binaryAtom();

		const binaryExp = ctx.binaryExpr()?.accept(this) as BinaryExpression;
		const boolean = ctx.boolean()?.accept(this) as BooleanValue;
		const string = ctx.string()?.accept(this) as StringValue;
		const atom = isAtom?.accept(this) as BinaryAtom;

		const binaryRightExp = ctx.binaryExprRight()?.accept(this) as BinaryRightExpression;

		if (isReg) {
			return new BinaryExpression(BinaryExpressionType.Regular, binaryExp ?? boolean ?? string, binaryRightExp);
		} else if (isNot) {
			return new BinaryExpression(BinaryExpressionType.Not, binaryExp ?? atom, binaryRightExp);
		} else {
			return new BinaryExpression(BinaryExpressionType.Atom, atom, binaryRightExp);
		}
	}

	visitBinaryExprRight(ctx: BinaryExprRightContext) {
		const binaryExp = ctx.binaryExpr()?.accept(this) as BinaryExpression;
		const atom = ctx.binaryAtom()?.accept(this) as BinaryAtom;
		const binaryExpRight = ctx.binaryExprRight()?.accept(this) as BinaryRightExpression;

		const binaryFunction = (ctx.BINARY_COMPARE()?.text || ctx.BINARY_OP()?.text) as any as
			| BinaryCompare
			| BinaryOperator;

		return new BinaryRightExpression(binaryFunction, binaryExp ?? atom, binaryExpRight);
	}

	visitBinaryAtom(ctx: BinaryAtomContext) {
		return this.visitChildren(ctx);
	}

	visitCommand(ctx: CommandContext) {
		const name = ctx.VAR_NAME().text;
		const args = ctx.argument().map((argCtx) => this.visitArgument(argCtx));
		const statementBlock = this.visitStatementBlock(ctx.statementBlock());

		return new Command(name, statementBlock, args);
	}

	visitArgument(ctx: ArgumentContext) {
		const name = ctx.VAR_NAME().text;
		const type = this.getType(ctx.type());

		return new Argument(name, type);
	}

	// don't need an AST node returned so we don't use the visitor name
	getType(ctx: TypeContext) {
		const bool = ctx.BOOL();
		return ctx.BOOL() ? VariableType.Boolean : ctx.NUM() ? VariableType.Number : VariableType.String;
	}

	visitCondition(ctx: ConditionContext) {
		const varName = ctx.conditionBlock().VAR_NAME().text;
		const ifStatementBlock = this.visitStatementBlock(ctx.conditionBlock().statementBlock());

		const elseStatBlockCtx = ctx.statementBlock();
		const elseStatementBlock = elseStatBlockCtx ? this.visitStatementBlock(elseStatBlockCtx) : undefined;

		return new Conditional(varName, ifStatementBlock, elseStatementBlock);
	}

	visitStatementBlock(ctx: StatementBlockContext) {
		const statements = ctx.blockStatement().map((statementCtx) => this.visitChildren(statementCtx));
		return new StatementBlock(statements);
	}

	visitLoop(ctx: LoopContext) {
		return this.visitChildren(ctx);
	}

	visitWhileBlock(ctx: WhileBlockContext) {
		const varName = ctx.VAR_NAME().text;
		const statementBlock = this.visitStatementBlock(ctx.statementBlock());
		return new WhileLoop(varName, statementBlock);
	}

	visitForEachBlock(ctx: ForEachBlockContext) {
		const loopVarName = ctx.forEachBlockLoopVar().VAR_NAME().text;
		const arrayName = ctx.forEachBlockArray().VAR_NAME().text;
		const statementBlock = this.visitStatementBlock(ctx.statementBlock());
		return new ForEachLoop(loopVarName, arrayName, statementBlock);
	}
}

/**
 * defined here to avoid circular dependencies
 */
class MathExpressionParser
	extends AbstractParseTreeVisitor<Array<NumberValue | VarNameValue | FunctionCall>>
	implements EZDiscordParserVisitor<Array<NumberValue | VarNameValue | FunctionCall>>
{
	protected defaultResult(): (NumberValue | VarNameValue | FunctionCall)[] {
		return [];
	}

	visitMathAtom(ctx: MathAtomContext) {
		const number = ctx.number()?.accept(new ParserToASTConverter()) as NumberValue | undefined;
		const varName = ctx.varName()?.accept(new ParserToASTConverter()) as VarNameValue | undefined;
		const functionCall = ctx.functionCall()?.accept(new ParserToASTConverter()) as FunctionCall | undefined;
		return [number ?? varName ?? (functionCall as FunctionCall)];
	}

	visitMathFactor(ctx: MathFactorContext) {
		const atom = ctx.mathAtom()?.accept(this) ?? [];
		const rest = ctx.math()?.accept(this) ?? [];
		return [...atom, ...rest];
	}

	visitMathTermPrime(ctx: MathTermPrimeContext) {
		const factor = ctx.mathFactor()?.accept(this) ?? [];
		const rest = ctx.mathTermPrime()?.accept(this) ?? [];
		return [...factor, ...rest];
	}

	visitMathTerm(ctx: MathTermContext) {
		const factor = ctx.mathFactor().accept(this);
		const rest = ctx.mathTermPrime().accept(this);
		return [...factor, ...rest];
	}

	visitMathExprPrime(ctx: MathExprPrimeContext) {
		const term = ctx.mathTerm()?.accept(this) ?? [];
		const rest = ctx.mathExprPrime()?.accept(this) ?? [];
		return [...term, ...rest];
	}

	visitMath(ctx: MathContext) {
		const term = ctx.mathTerm().accept(this);
		const rest = ctx.mathExprPrime().accept(this);
		return [...term, ...rest];
	}
}
