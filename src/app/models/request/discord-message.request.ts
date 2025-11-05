import { EMessageType } from '@models/enums/EMessageType';

export interface DiscordMessageRequest {
	name: string;
	email: string;
	phone: string;
	messageType: EMessageType;
	message: string;
}
