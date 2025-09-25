/* eslint-disable @typescript-eslint/no-unused-vars */
import { SwPush } from '@angular/service-worker';
import { Subject } from 'rxjs';

export class SwPushMock {
	messages = new Subject<object>();
	notificationClicks = new Subject<{ action: string; notification: object }>();

	requestSubscription(options: { serverPublicKey: string }): Promise<PushSubscription> {
		return Promise.resolve({} as PushSubscription);
	}

	unsubscribe(): Promise<void> {
		return Promise.resolve();
	}
}

export const swPushProviderMock = { provide: SwPush, useClass: SwPushMock };
