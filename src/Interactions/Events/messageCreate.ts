import IClientEvent from '../../Models/IClientEvent';
import CommandRegister from '../../Utility/CommandRegister';

const event: IClientEvent = {
    Config: {
        Name: "messageCreate"
    },

    Run: async (client, message) => {
        CommandRegister.HandleTextCommands(client, message);
    }
}

export default event;