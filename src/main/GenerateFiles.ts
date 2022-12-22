import { CharStreams, CommonTokenStream } from 'antlr4ts';
import fs from 'node:fs';
import path from 'node:path';
import { ParserToASTConverter } from '../ast/ParserToASTConverter';
import { EvaluateVisitor } from '../ast/visitors/EvaluateVisitor';
import { StaticCheckVisitor } from '../ast/visitors/StaticCheckVisitor';
import { config } from '../config';
import { EZDiscordLexer } from '../parser/EZDiscordLexer';
import { EZDiscordParser } from '../parser/EZDiscordParser';

const input = fs.readFileSync(path.resolve(config.inputFile)).toString();

const charStream = CharStreams.fromString(input);
const lexer = new EZDiscordLexer(charStream);
const tokenStream = new CommonTokenStream(lexer);
const parser = new EZDiscordParser(tokenStream);

const tree = parser.bot();
if (parser.numberOfSyntaxErrors > 0) {
	throw new Error('Bad Syntax');
}

const astConverter = new ParserToASTConverter();

const bot = astConverter.visit(tree);
const staticChecker = new StaticCheckVisitor();
bot.accept(staticChecker, undefined);
if (staticChecker.errors.length > 0) {
	throw new Error(`\n${staticChecker.errors.join('\n')}`);
}
const evaluator = new EvaluateVisitor();
bot.accept(evaluator, undefined);
