import { cogToPath } from '../src/cogManager';

describe('cogToPath', () => {
    it('should convert a cog string to a path', () => {
        expect(cogToPath('test')).toBe('./test.ts');
        expect(cogToPath('cogs.test')).toBe('./cogs/test.ts');
    });
});
