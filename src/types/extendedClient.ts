import { Client, REST, Routes } from 'discord.js';
import { CogManager } from '../cogManager';
import { command, commandCogType } from './CogTemplate';

class ExtendedClient extends Client {
    /**
     * @param {any} options
     * @inheritdoc Client
     */
    private botToken: string;
    public commands: Map<string, any>;
    public slashCommands: Map<string, any>;
    public events: Map<string, any>;
    public slashCommandsRaw: string[];
    public slashCommandCooldowns: Map<string, Map<string, number>>;
    public commandCooldowns: Map<string, Map<string, number>>;
    public cogManager: CogManager;

    constructor(token: string, options: any) {
        super(options);
        this.botToken = token;
        this.slashCommandsRaw = [];
        this.slashCommands = new Map();
        this.events = new Map();
        this.commands = new Map();
        this.commandCooldowns = new Map();
        this.slashCommandCooldowns = new Map();
        this.cogManager = new CogManager(this);
        this.loadListeners();
    }

    private async commandOnCooldown(commandName: string, userId: string, isSlashCommand?: string): Promise<boolean> {
        let cooldowns:Map<string, Map<string, number>> = null;
        if (isSlashCommand) {
            if (!this.slashCommandCooldowns.has(commandName)) {
                this.slashCommandCooldowns.set(commandName, new Map());
                return false;
            }
            cooldowns = this.slashCommandCooldowns;
        } else {
            if (!this.commandCooldowns.has(commandName)) {
                this.commandCooldowns.set(commandName, new Map());
                return false;
            }
            cooldowns = this.commandCooldowns;
        }

        const now = Date.now();
        const timestamps = cooldowns.get(commandName);
        const commandCooldown = this.commands.get(commandName).cooldown;
        if (!timestamps) return false;
        if (!commandCooldown) return false;

        if (timestamps.has(userId)) {
            const expirationTime = timestamps.get(userId) + commandCooldown;
            if (now < expirationTime) {
                return true;
            }
        }
        timestamps.set(userId, now);
    }

    private async loadListeners(): Promise<void> {
        this.on('ready', async () => {
            // create a new REST client and set the token to the bot token
            const rest = new REST().setToken(this.botToken);

            // if the client user is null, return
            if (this.user === null) {
                return;
            }
            // send a request to the discord api to refresh the slash commands
            // the commands are generated in src/index.ts
            await rest.put(Routes.applicationCommands(this.user.id), { body: this.slashCommandsRaw });
        });

        this.on('interactionCreate', async interaction => {
            if (!interaction.isCommand()) return;
            // if the creator of the interaction is a bot, return
            if (interaction.user.bot) return;

            // if the interaction is not a command, return
            if (!interaction.isCommand()) return;

            // if the command does not exist, return
            if (!this.slashCommands.has(interaction.commandName)) return;

            // if the command is on cooldown, return
            if (await this.commandOnCooldown(interaction.commandName, interaction.user.id)) {
                await interaction.reply({
                    content: 'You are on cooldown!',
                    ephemeral: true,
                });
                return;
            }

            // if here all checks have passed, execute the command
            this.slashCommands.get(interaction.commandName).execute(this, interaction);
        });

        this.on('messageCreate', async message => {
            if (message.author.bot) return;
            // if (!message.content.startsWith(this.PREFIX)) return;
            // const args = message.content.slice(this.PREFIX.length).trim().split(/ +/);
            const args = message.content.trim().split(/ +/);
            const commandName = args.shift()?.toLowerCase();
            if (!commandName) return;
            const command: command = this.commands.get(commandName);
            if (!command) return;

            command.execute(this, message, args);
        });
    }

    /** logs in the client
     * @returns {Promise<string>}
     * @memberof ExtendedClient
     * @example client.login();
     */
    public login(): Promise<string> {
        return super.login(this.botToken);
    }
}

export { ExtendedClient };
