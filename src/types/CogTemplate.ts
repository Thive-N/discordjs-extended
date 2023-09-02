import { Message } from 'discord.js';
import { ExtendedClient } from './extendedClient';

export type commandExecute = (client: ExtendedClient, message: Message, args: string[]) => Promise<void>;

export interface command {
    name: string; // Name of the command
    description: string; // Description of the command
    aliases?: string[]; // Aliases for the command
    cooldown?: number; // Cooldown in seconds
    execute: commandExecute; // Function to execute when the command is called
}

export type slashCommandExecute = (client: ExtendedClient, message: Message, args: string[]) => Promise<void>;

export interface slashCommand {
    name: string; // Name of the command
    description: string; // Description of the command
    aliases?: string[]; // Aliases for the command
    cooldown?: number; // Cooldown in seconds
    execute: slashCommandExecute; // Function to execute when the command is called
}

export type eventExecute = (client: ExtendedClient, ...args: any[]) => Promise<void>;

export interface event {
    name: string; // Name of the event
    once: boolean; // Whether the event should only be called once
    execute: eventExecute; // Function to execute when the event is called
}
