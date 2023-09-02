import { ExtendedClient } from './types/extendedClient';

// changes the cog string to a path
// eg "test" -> "./test.ts"
// eg "cogs.test" -> "./cogs/test.ts"
export function cogToPath(cog: string): string {
    return `./${cog.replace(/\./g, '/')}.ts`;
}
