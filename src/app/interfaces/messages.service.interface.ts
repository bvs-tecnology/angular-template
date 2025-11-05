import { DiscordMessageRequest } from '@models/request/discord-message.request';

export abstract class IMessagesService {
	abstract DiscordMessage(request: DiscordMessageRequest): Promise<void>;
}
