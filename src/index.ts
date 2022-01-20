import * as Discord from 'discord.js-light';
import * as Config from './config';
import IUserConfig from './models/IUserConfig';
import EventRegister from './utility/EventRegister';
import CommandRegister from './utility/CommandRegister';
import Logger from './utility/Logger';
import ICollectionData from './models/ICollectionData';

export default class Client {
    public static DiscordClient: Discord.Client; // Your Discord client.
    public static UserConfig: IUserConfig = Config.UserConfig; // Your User config.
    public static PackageVersion: number; // Your package version.

    // Collections for commands.
    public static Collections: ICollectionData = {
        TextCommands: new Discord.Collection(),
        TextCommandAliases: new Discord.Collection()
    }
}

// Use main function for async/await syntax.
async function main() {
    const pack = require('../package.json');
    Client.PackageVersion = pack.version;

    Logger.Info(`Discord.jsTemplate v${Client.PackageVersion}`);

    // Instantiate Client Properties.

    // Check for DebugMode
    if (Client.UserConfig.DebugMode) {
        try {
            // @ts-ignore // Required due to TypeScript warning about the file not existing.
            Client.UserConfig = (await import('./debug_config')).UserConfig;
        } catch (err) {
            Logger.Warning('Could not load debug_config, DebugMode will not work!');
        }
    }

    // Create a new Discord Client instance.
    Logger.Info('Instantiating Client...');
    Client.DiscordClient = new Discord.Client({
        // Only use intents that are strictly required. This will free up memory.
        intents: [
            // 'DIRECT_MESSAGES',
            // 'DIRECT_MESSAGE_REACTIONS',
            // 'DIRECT_MESSAGE_TYPING',
            'GUILDS',
            // 'GUILD_BANS',
            // 'GUILD_EMOJIS_AND_STICKERS',
            // 'GUILD_INTEGRATIONS',
            // 'GUILD_INVITES',
            // 'GUILD_MEMBERS',
            'GUILD_MESSAGES',
            // 'GUILD_MESSAGE_REACTIONS',
            // 'GUILD_MESSAGE_TYPING',
            // 'GUILD_PRESENCES',
            // 'GUILD_SCHEDULED_EVENTS',
            // 'GUILD_VOICE_STATES',
            // 'GUILD_WEBHOOKS'
        ],

        // Limit the number of items to be cahced.
        // Change these values as required.
        makeCache: Discord.Options.cacheWithLimits({
            ApplicationCommandManager: 0,
            BaseGuildEmojiManager: 0,
            ChannelManager: 0,
            GuildChannelManager: 0,
            GuildBanManager: 0,
            GuildInviteManager: 0,
            GuildManager: 0,
            GuildMemberManager: 0,
            GuildStickerManager: 0,
            GuildScheduledEventManager: 0,
            MessageManager: 0,
            PermissionOverwriteManager: 0,
            PresenceManager: 0,
            ReactionManager: 0,
            ReactionUserManager: 0,
            RoleManager: 0,
            StageInstanceManager: 0,
            ThreadManager: 0,
            ThreadMemberManager: 0,
            UserManager: 0,
            VoiceStateManager: 0
        })
    });

    // Register Events.
    Logger.Info('Registering Events...');
    await EventRegister.RegisterEvents('./interactions/events/', Client.DiscordClient);

    Logger.Info('Registering Commands...');
    await CommandRegister.RegisterTextCommands('./interactions/text_commands');

    // Connect to Discord.
    Logger.Info('Connecting...');
    await Client.DiscordClient.login(Client.UserConfig.General.Token).catch(err => {
        if (err.code == 'TOKEN_INVALID') Logger.Critical('Invalid Token Provided...', err);
        else Logger.Critical('An unknown error occured...', err);
    });
}

main();