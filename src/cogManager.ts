import { ExtendedClient } from './types/extendedClient';

export class CogManager {
    /**
     * @param {ExtendedClient} client
     */
    private client: ExtendedClient;
    constructor(client: ExtendedClient) {
        this.client = client;
    }

    // changes the cog string to a path
    // eg "test" -> "./test.ts"
    // eg "cogs.test" -> "./cogs/test.ts"
    cogToPath(cog: string): string {
        return `./${cog.replace(/\./g, '/')}.ts`;
    }

    loadCog(cog: string): void {
        const path = this.cogToPath(cog);
        const cogModule = require(path);
        if (!cogModule.Cog) {
            throw new Error(`Cog ${cog} does not export a Cog object`);
        }
        const cogObject = cogModule.Cog;
        if (cogObject.cogType === 'command') {
            this.client.commands.set(cogObject.name, cogObject);
        } else if (cogObject.cogType === 'event') {
            this.client.events.set(cogObject.name, cogObject);
        } else if (cogObject.cogType === 'slashCommand') {
            this.client.slashCommands.set(cogObject.name, cogObject);
        } else {
            throw new Error(`Cog ${cog} has an invalid cogType`);
        }
    }
}
