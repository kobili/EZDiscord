import { ChatInputCommandInteraction } from 'discord.js';

export const reply = async (interaction: ChatInputCommandInteraction, ...args: any) => {
	await interaction.reply(concat(...args));
};

export const concat = (...args: any) => {
	let message = '';
	for (const arg of args) {
		message += `${arg}`;
	}
	return message;
};

// taken from https://stackoverflow.com/a/1527820
export const random = (min: number, max: number) => {
	const newMin = Math.ceil(min);
	const newMax = Math.floor(max);
	return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
};

// Array operators
export const add = (array: any[], value: any) => array.push(value);

export const remove = (array: any[], index: number) => array.splice(index, 1);

export const get = (array: any[], index: number) => array[index];

export const len = (array: any[]) => array.length;

export const find = (array: any[], value: any) => array.indexOf(value);

export const set = (array: any[], index: number, value: any) => (array[index] = value);
