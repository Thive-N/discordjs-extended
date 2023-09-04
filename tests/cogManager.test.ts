import { GatewayIntentBits } from 'discord.js';
import { CogManager } from '../src/cogManager';
import { ExtendedClient } from '../src/types/extendedClient';

describe('cogToPath', () => {
    it('should convert a cog string to a path', () => {
        const c = new ExtendedClient({ intents: [GatewayIntentBits.MessageContent] });
        const cm = new CogManager(c);
        expect(cm.cogToPath('test')).toBe('./test.ts');
        expect(cm.cogToPath('cogs.test')).toBe('./cogs/test.ts');
    });
});
