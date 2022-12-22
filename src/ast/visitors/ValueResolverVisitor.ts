import {
	Argument,
	ArrayValue,
	BinaryExpression,
	BinaryRightExpression,
	BooleanValue,
	FunctionCall,
	MathValue,
	NumberValue,
	StringValue,
	VarNameValue,
} from '../nodes';
import { ASTBaseVisitor } from './ASTBaseVisitor';
import { BuiltInFunction } from '../nodes/FunctionCall';
import { VariableType } from '../../util/ScopedSymbolTable';
import { isPartOfEnum } from '../../util/EnumUtils';
import { BinaryCompare, BinaryExpressionType, BinaryOperator } from '../nodes/binary/types';

/**
 * Resolves value to proper Typescript specification for TS-morph
 */
export class ValueResolverVisitor extends ASTBaseVisitor<void, string> {
	visitArrayVarValue(arrVarVal: ArrayValue, params: void): string {
		const resolvedValue = arrVarVal.value.reduce((currentArray, type) => {
			return `${currentArray}${type.accept(this, undefined)},`;
		}, '[ ');

		return `${resolvedValue.slice(0, -1)}]`;
	}

	visitBooleanVarValue(booleanVarVal: BooleanValue, params: void): string {
		return String(booleanVarVal.value);
	}

	visitBuiltInFunctionVarValue(builtInFunction: FunctionCall, params: void): string {
		const funcParams = builtInFunction.params.map((funcParam) => funcParam.accept(this, undefined));

		let parameters = '';
		for (let param of funcParams) {
			parameters += `${param}, `;
		}
		if (builtInFunction.function === BuiltInFunction.reply) {
			/**
			 * need to pass in the discordjs interaction object to the reply function as well as check
			 * if bot has replied already
			 */
			return `!interaction.replied ? await ${builtInFunction.function.valueOf()}(interaction, ${parameters.slice(
				0,
				-2
			)}) : undefined`;
		}
		return `${builtInFunction.function}(${parameters.slice(0, -2)})`;
	}

	visitNumberVarValue(numberVarValue: NumberValue, params: void): string {
		return String(numberVarValue.value);
	}

	visitStringVarValue(stringVarValue: StringValue, params: void): string {
		return `'${stringVarValue.value}'`;
	}

	visitVarNameValue(varName: VarNameValue, params: void): string {
		return varName.value;
	}

	visitMathValue(mathValue: MathValue, params: void): string {
		return mathValue.value;
	}

	visitArgument(arg: Argument, params: void): string {
		switch (arg.type) {
			case VariableType.Boolean:
				return `.addBooleanOption((options) => options.setName('${arg.formattedName}').setDescription('${arg.name}').setRequired(true))`;
			case VariableType.Number:
				return `.addNumberOption((options) => options.setName('${arg.formattedName}').setDescription('${arg.name}').setRequired(true))`;
			case VariableType.String:
				return `.addStringOption((options) => options.setName('${arg.formattedName}').setDescription('${arg.name}').setRequired(true))`;
		}
	}

	visitBinaryExpression(binary: BinaryExpression, params: void): string {
		switch (binary.type) {
			case BinaryExpressionType.Regular:
				return `(${binary.value.accept(this, params)})${
					binary.rightExpression ? binary.rightExpression.accept(this, params) : ''
				}`;
			case BinaryExpressionType.Not:
				return `!${binary.value.accept(this, params)}${
					binary.rightExpression ? binary.rightExpression.accept(this, params) : ''
				}`;
			case BinaryExpressionType.Atom:
				return `${binary.value.accept(this, params)}${
					binary.rightExpression ? binary.rightExpression.accept(this, params) : ''
				}`;
		}
	}

	visitBinaryRightExpression(binaryRight: BinaryRightExpression, params: void): string {
		return `${this.getBinaryFunction(binaryRight.binaryFunction)}${binaryRight.value.accept(this, params)}${
			binaryRight.rightExpression ? binaryRight.rightExpression.accept(this, params) : ''
		}`;
	}

	private getBinaryFunction(func: BinaryCompare | BinaryOperator): string {
		if (isPartOfEnum(func, BinaryCompare)) {
			return func;
		}
		return func === BinaryOperator.AND ? '&&' : '||';
	}
}
