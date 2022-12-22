import path from 'node:path';
import { Project, SourceFile, VariableDeclarationKind } from 'ts-morph';
import { PrintWriter } from '../../util/PrintWriter';
import { Bot, ClientId, Command, Config, GuildId, Token, Variable } from '../nodes';
import { ASTBaseVisitor } from './ASTBaseVisitor';
import { GlobalStatementWriter } from '../../util/GlobalStatementWriter';
import { config } from '../../config';

/**
 * Visitor that evaluates AST and generates TS files for the discord bot
 */
export class EvaluateVisitor extends ASTBaseVisitor<void, void> {
	private readonly fileWriter: PrintWriter;
	private readonly project: Project;
	private readonly outputFile: SourceFile;

	constructor() {
		super();
		this.fileWriter = new PrintWriter(path.resolve('./out/.env'));
		this.project = new Project();
		this.project.addSourceFilesAtPaths('./out/*.ts');
		this.outputFile = this.project.createSourceFile(`./${config.outputFile}`, '', { overwrite: true });
		this.setUpOutputFile(this.outputFile);
	}

	visitBot(bot: Bot, params: void): void {
		this.visitConfig(bot.config);
		for (const statement of bot.statements) {
			statement.accept(this, params);
		}
	}

	visitVariable<Y>(variable: Variable<Y>, params: void) {
		GlobalStatementWriter.writeGlobalVariable(variable, this.outputFile);
		this.project.saveSync();
	}

	visitCommand(command: Command, params: void): void {
		GlobalStatementWriter.writeCommand(command, this.outputFile);
		this.project.saveSync();
	}

	visitConfig(config: Config, params: void): void {
		config.token.accept(this, params);
		config.clientId.accept(this, params);
		config.guildId.accept(this, params);
	}

	visitToken(token: Token, params: void): void {
		this.fileWriter.println(`TOKEN=${token.value}`);
	}

	visitClientId(clientId: ClientId, params: void): void {
		this.fileWriter.println(`CLIENT_ID=${clientId.value}`);
	}

	visitGuildId(guildId: GuildId, params: void): void {
		const guildIds = guildId.values
			.reduce((guildIdList, guildId) => {
				return (guildIdList += guildId + ' ');
			}, '')
			.trimEnd();
		this.fileWriter.println(`GUILD_ID=${guildIds}`);
	}

	private setUpOutputFile(outputFile: SourceFile) {
		// include imports of required modules
		outputFile.addImportDeclarations([
			{
				// discord js
				moduleSpecifier: 'discord.js',
				namedImports: ['SlashCommandBuilder', 'ChatInputCommandInteraction'],
			},
			{
				moduleSpecifier: '../src/discordjs/DiscordJsTypes',
				namedImports: ['DiscordBotSlashCommand'],
			},
			{
				// functions built into our language
				moduleSpecifier: '../src/discordjs/BuiltInFunctions',
				namedImports: ['reply', 'random', 'add', 'remove', 'get', 'len', 'find', 'set', 'concat'],
			},
		]);
		// setup a default export of a list of the slash commands to be sent to the bot runner
		const exportedVariableName = 'slashCommands';
		outputFile.addVariableStatement({
			isExported: false,
			declarationKind: VariableDeclarationKind.Const,
			declarations: [
				{
					name: exportedVariableName,
					initializer: '[]',
					type: 'DiscordBotSlashCommand[]',
				},
			],
		});
		outputFile.addStatements([(writer) => writer.writeLine(`export default ${exportedVariableName}`)]);
	}
}
