import { Message, SlashCommandBuilder } from 'discord.js';
import { ExtendedClient } from './extendedClient';

// The three types of cogs that can be loaded
export type commandCogType = 'command' | 'event' | 'slashCommand';

// type for the execute function of a command
export type commandExecute = (client: ExtendedClient, message: Message, args: string[]) => Promise<void>;

//type for the command cog
export interface command {
    cogType: commandCogType; // Type of cog
    name: string; // Name of the command
    description: string; // Description of the command
    aliases?: string[]; // Aliases for the command
    cooldown?: number; // Cooldown in seconds
    execute: commandExecute; // Function to execute when the command is called
}

// type for the execute function of a slash command
export type slashCommandExecute = (client: ExtendedClient, message: Message, args: string[]) => Promise<void>;

// type for the slash command cog
export interface slashCommand {
    cogType: commandCogType; // Type of cog
    data: SlashCommandBuilder; // Data for the slash command
    name: string; // Name of the command
    description: string; // Description of the command
    aliases?: string[]; // Aliases for the command
    cooldown?: number; // Cooldown in seconds
    execute: slashCommandExecute; // Function to execute when the command is called
}

// type for the execute function of an event
export type eventExecute = (client: ExtendedClient, ...args: any[]) => Promise<void>;

// type for the event cog
export interface event {
    cogType: commandCogType; // Type of cog
    name: string; // Name of the event
    once: boolean; // Whether the event should only be called once
    execute: eventExecute; // Function to execute when the event is called
}
