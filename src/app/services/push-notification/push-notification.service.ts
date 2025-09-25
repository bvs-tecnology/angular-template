import { Injectable } from '@angular/core';
import { BaseService } from '@services/base.service';
import { environment } from '../../../environments/environment';
import { PushSubscriptionRequest } from '@models/request/push-subscription.request';
import { IPushNotificationService } from '@interfaces/push-notification.service.interface';

@Injectable({
	providedIn: 'root',
})
export class PushNotificationService extends BaseService implements IPushNotificationService {
	constructor() {
		super(environment.apiUrl, 'Push');
	}

	async pushSubscribe(request: PushSubscriptionRequest): Promise<void> {
		return await this.PostAsync<void>('subscription', request);
	}
}

export const pushServiceProvider = { provide: IPushNotificationService, useExisting: PushNotificationService };
