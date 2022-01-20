import IClientEvent from '../../models/IClientEvent';
import CommandRegister from '../../utility/CommandRegister';

const event: IClientEvent = {
    Config: {
        Name: "messageCreate"
    },

    Run: async (client, message) => {
        CommandRegister.HandleTextCommands(client, message);
    }
}

export default event;