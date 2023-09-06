import { command, commandExecute } from '../../src/types/CogTemplate';

const execute: commandExecute = async (client, message) => {
    await message.channel.send('Hello from a cog!');
};

export const Cog: command = {
    cogType: 'command',
    name: 'commandcog',
    description: 'A cog that has a command',
    execute,
};
