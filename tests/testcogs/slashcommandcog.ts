import { SlashCommandBuilder } from 'discord.js';
import { slashCommand, slashCommandExecute } from '../../src/types/CogTemplate';

const execute: slashCommandExecute = async (client, interaction) => {
    await interaction.reply('Hello from a cog!');
};

export const Cog: slashCommand = {
    data: new SlashCommandBuilder().setName('commandcog').setDescription('A cog that does absolutely nothing'),
    cogType: 'slashCommand',
    name: 'slashcommandcog',
    description: 'A cog that has a command',
    execute,
};
