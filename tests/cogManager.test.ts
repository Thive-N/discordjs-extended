import { GatewayIntentBits } from 'discord.js';
import { ExtendedClient } from '../src/types/extendedClient';

const c = new ExtendedClient('invalid token', {
    intents: [GatewayIntentBits.MessageContent],
});

describe('cogToPath', () => {
    it('should convert a cog string to a path', () => {
        expect(c.cogManager.cogToPath('test')).toBe('./test.ts');
        expect(c.cogManager.cogToPath('cogs.test')).toBe('./cogs/test.ts');
        expect(c.cogManager.cogToPath('examples.cogs.commandcog')).toBe('./examples/cogs/commandcog.ts');
        expect(c.cogManager.cogToPath('commandcog')).toBe('./commandcog.ts');
        expect(c.cogManager.cogToPath('..')).toBe('./../.ts');
        expect(c.cogManager.cogToPath('..test')).toBe('./../test.ts');
    });
});

describe('loadCog', () => {
    it('should load a command cog', () => {
        /**
         * @todo line below has a lot of .'s
         * this is due to the require stack being in node_modules/jasmine/bin
         * need to find a way to get the require stack to be in the root of the project
         */
        c.cogManager.loadCog('......tests.commandcog');
        expect(c.commands.has('commandcog')).toBe(true);
    });

    it('should load a slash command cog', () => {
        c.cogManager.loadCog('......tests.slashcommandcog');
        expect(c.slashCommands.has('slashcommandcog')).toBe(true);
        expect(c.slashCommandsRaw.length).toBe(1);
    });
});
