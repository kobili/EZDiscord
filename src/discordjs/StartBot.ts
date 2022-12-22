import * as dotenv from 'dotenv';
import path from 'node:path';
import { Client, Collection, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';

import { DiscordBotSlashCommand } from './DiscordJsTypes';

dotenv.config({ path: path.resolve('out/.env') });

const startBot = (slashCommandsList: DiscordBotSlashCommand[]) => {
	const slashCommands = new Collection<string, DiscordBotSlashCommand>();
	for (const command of slashCommandsList) {
		slashCommands.set(command.data.name, command);
	}

	const token = process.env.TOKEN;
	const guildIds = process.env.GUILD_ID?.split(' ');
	const clientId = process.env.CLIENT_ID;

	const client = new Client({ intents: [GatewayIntentBits.Guilds] });

	// Notify when bot has started
	client.once('ready', () => console.log('Bot running...'));

	// handle slash commands
	client.on('interactionCreate', async (interaction) => {
		if (!interaction.isChatInputCommand()) return;

		const command = slashCommands.get(interaction.commandName);
		if (!command) return;

		try {
			await command.respond(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command...', ephemeral: true });
		}
	});

	// sync commands
	if (token && guildIds && clientId) {
		const rest = new REST({ version: '10' }).setToken(token);
		guildIds.map((guildId) => {
			rest
				.put(Routes.applicationGuildCommands(clientId, guildId), {
					body: slashCommands.map((command) => command.data.toJSON()),
				})
				.then((data: any) =>
					console.log(`Successfully registered ${data.length} application commands on guild: ${guildId}`)
				)
				.catch(console.error);
		});
	} else {
		throw Error('Could not find environment variable(s)');
	}

	// Login to discord with client's token
	client.login(token);
};

export default startBot;
