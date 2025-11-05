import { Injectable } from '@angular/core';
import { BaseService } from '@services/base.service';
import { IMessagesService } from '@interfaces/messages.service.interface';
import { DiscordMessageRequest } from '@models/request/discord-message.request';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class MessagesService extends BaseService implements IMessagesService {

	constructor() {
		super(environment.apiUrl, 'messages');
	}

	async DiscordMessage(request: DiscordMessageRequest): Promise<void> {
		return await this.PostAsync<void>('discord-message', request);
	}

}

export const messagesServiceProvider = { provide: IMessagesService, useExisting: MessagesService };
