import { expect } from 'chai';
import TestUtil, { TestGrammar } from '../TestUtil';
import { CharStreams, CodePointCharStream, CommonTokenStream, ConsoleErrorListener } from 'antlr4ts';
import { EZDiscordLexer } from '../../src/parser/EZDiscordLexer';
import Log from '../../src/util/Log';
import { EZDiscordParser } from '../../src/parser/EZDiscordParser';
import { ParserToASTConverter } from '../../src/ast/ParserToASTConverter';
import { StaticCheckVisitor } from '../../src/ast/visitors/StaticCheckVisitor';
import { stat } from 'fs';

describe('Static Checks rule test', function () {
	let testGrammarFiles: TestGrammar[] = [];

	before(function () {
		Log.test(`Before ${this!.test!.parent!.title}`);
		try {
			testGrammarFiles = TestUtil.readTestGrammarFiles('test/static-checks/resources/');
		} catch (err) {
			expect.fail('', '', `Failed to read one or more test queries. ${err}`);
		}
	});

	beforeEach(function () {
		Log.test(`BeforeTest: ${this!.currentTest!.title}`);
	});

	after(function () {
		Log.test(`After: ${this!.test!.parent!.title}`);
	});

	afterEach(function () {
		Log.test(`AfterTest: ${this!.currentTest!.title}`);
	});

	it('Should run grammar tests', function () {
		describe('Dynamic tests Grammar.spec.ts: ', function () {
			for (const test of testGrammarFiles) {
				it(`[${test.filename}] ${test.title}`, function () {
					let charStream: CodePointCharStream;
					let lexer: EZDiscordLexer;
					let tokenStream: CommonTokenStream;
					let parser: EZDiscordParser;
					let staticChecker: StaticCheckVisitor;
					try {
						charStream = CharStreams.fromString(test.inputString);
						lexer = new EZDiscordLexer(charStream);
						tokenStream = new CommonTokenStream(lexer);
						parser = new EZDiscordParser(tokenStream);
						// Comment out to see Antlr parser errors
						parser.removeErrorListeners();
						// Comment out to see Antlr lexer errors
						lexer.removeErrorListener(ConsoleErrorListener.INSTANCE);
						const tree = parser.bot();
						const astConverter = new ParserToASTConverter();
						const bot = astConverter.visit(tree);
						staticChecker = new StaticCheckVisitor();
						bot.accept(staticChecker, undefined);
					} catch (err: any) {
						expect.fail(`Failed to tokenize for ${test.filename}`);
					}
					if (test.isValid) {
						Log.info(staticChecker.errors);
						expect(staticChecker.errors).to.have.lengthOf(0);
					} else {
						expect(staticChecker.errors).to.have.length.greaterThan(0);
					}
				});
			}
		});
	});
});
