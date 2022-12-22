import type { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export interface DiscordBotSlashCommand {
	data: SlashCommandBuilder;
	respond: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
