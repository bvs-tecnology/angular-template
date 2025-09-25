import { TestBed } from '@angular/core/testing';

import { PwaConfigService } from './pwa-config.service';
import { swPushProviderMock } from '@mocks/services/sw-push.mock.spec';
import { swUpdateProviderMock } from '@mocks/services/sw-update.mock.spec';
import { pushServiceProviderMock } from '@mocks/services/push-notification-service-mock.spec';
import { provideTranslateService } from '@ngx-translate/core';
import { SwPush } from '@angular/service-worker';

describe('PwaConfigService', () => {
	let service: PwaConfigService;

	let swPush: SwPush;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [swPushProviderMock, swUpdateProviderMock, pushServiceProviderMock, provideTranslateService()],
		});
		service = TestBed.inject(PwaConfigService);
		swPush = TestBed.inject(SwPush);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('requestNotificationPermission', () => {
		let notificationSpy: jasmine.Spy;
		let requestSubscriptionSpy: jasmine.Spy;

		describe('when permission is granted', () => {
			describe('and subscription is successful', () => {
				beforeEach(async () => {
					notificationSpy = spyOn(Notification, 'requestPermission').and.returnValue(Promise.resolve('granted'));
					requestSubscriptionSpy = spyOn(swPush, 'requestSubscription').and.returnValue(
						Promise.resolve({
							toJSON: () => ({ endpoint: undefined, keys: { auth: undefined, p256dh: undefined } }),
						} as unknown as PushSubscription)
					);
					await service.requestNotificationPermission();
				});
				it('should request permission', () => expect(notificationSpy).toHaveBeenCalled());
				it('should request subscription', () => expect(requestSubscriptionSpy).toHaveBeenCalled());
			});
			describe('and subscription fails', () => {
				beforeEach(async () => {
					notificationSpy = spyOn(Notification, 'requestPermission').and.returnValue(Promise.resolve('granted'));
					requestSubscriptionSpy = spyOn(swPush, 'requestSubscription').and.returnValue(Promise.reject('failed'));
					await service.requestNotificationPermission();
				});
				it('should request permission', () => expect(notificationSpy).toHaveBeenCalled());
				it('should not request subscription', () => expect(requestSubscriptionSpy).toHaveBeenCalled());
			});
		});
		describe('when permission is denied', () => {
			beforeEach(async () => {
				notificationSpy = spyOn(Notification, 'requestPermission').and.returnValue(Promise.resolve('denied'));
				await service.requestNotificationPermission();
			});
			it('should request permission', () => expect(notificationSpy).toHaveBeenCalled());
		});
	});
});
