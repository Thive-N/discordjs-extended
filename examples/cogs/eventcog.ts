import { SlashCommandBuilder } from 'discord.js';
import { eventExecute, event } from '../../src/types/CogTemplate';

const execute: eventExecute = async client => {
    await client.user?.setActivity('with cogs');
};

export const Cog: event = {
    cogType: 'event',
    name: 'eventcog',
    once: false,
    execute,
};
