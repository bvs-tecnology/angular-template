/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { PushSubscriptionRequest } from '@models/request/push-subscription.request';
import { IPushNotificationService } from '@interfaces/push-notification.service.interface';

@Injectable({
	providedIn: 'root',
})
export class PushNotificationServiceMock implements IPushNotificationService {
	async pushSubscribe(request: PushSubscriptionRequest): Promise<void> {
		return Promise.resolve();
	}
}

export const pushServiceProviderMock = { provide: IPushNotificationService, useExisting: PushNotificationServiceMock };
