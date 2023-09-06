import { Client } from 'discord.js';

class ExtendedClient extends Client {
    /**
     * @param {any} options
     * @inheritdoc Client
     */
    public commands: any;
    public slashCommands: any;
    public events: any;
    public slashCommandsRaw: any[];
    public cooldowns: any;

    constructor(options: any) {
        super(options);
        this.slashCommandsRaw = [];
        this.slashCommands = new Map();
        this.events = new Map();
        this.commands = new Map();
        this.cooldowns = new Map();
    }
}

export { ExtendedClient };
