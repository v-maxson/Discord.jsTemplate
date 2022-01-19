// This is your configuration file. It contains all of the configuration objects necessary for this application.

import IUserConfig from "./Models/IUserConfig";

export const UserConfig: IUserConfig = {
    DebugMode: true, // Disable this to remove warnings about the file missing.
    General: {
        Token: '', // Place your token here.
        TextCommandPrefix: '!', // This is the prefix for text commands.
        Admins: [], // This is the list of admins for your application, they will have access to potentially dangerous commands (including eval).
    }
}