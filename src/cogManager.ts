import { ExtendedClient } from './types/extendedClient';

export class CogManager {
    /**
     * @param {ExtendedClient} client
     */
    private client: ExtendedClient;
    constructor(client: ExtendedClient) {
        this.client = client;
    }

    /** converts a cog string to a path
     * @param {string} cog
     * @returns {string}
     * @memberof CogManager
     * @example cogManager.cogToPath('test'); // returns './test.ts'
     */
    cogToPath(cog: string): string {
        return `./${cog.replace(/\.\./g, ',').replace(/\./g, '/').replace(/\,/g, '../')}.ts`;
    }

    /**  loads a cog from a cog string (see cogToPath)
     * sets the command/event/slashCommand in the client depending on the cogType
     * @param {string} cog
     * @returns {void}
     * @memberof CogManager
     * @example cogManager.loadCog('test'); // loads the cog from ./test.ts
     */
    loadCog(cog: string): void {
        const path = this.cogToPath(cog);
        const cogModule = require.main?.require(path);
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
            this.client.slashCommandsRaw.push(cogObject.data);
        } else {
            throw new Error(`Cog ${cog} has an invalid cogType`);
        }
    }

    /** loads multiple cogs from an array of cog strings (see cogToPath)
     * @param {string[]} cogs
     * @returns {void}
     * @memberof CogManager
     * @example cogManager.loadCogs(['test', 'cogs.test']); // loads the cogs from ./test.ts and ./cogs/test.ts
     */
    loadCogs(cogs: string[]): void {
        cogs.forEach(cog => {
            this.loadCog(cog);
        });
    }
}
