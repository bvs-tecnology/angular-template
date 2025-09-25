import { TestBed } from '@angular/core/testing';

import { PushNotificationService } from './push-notification.service';
import { BaseServiceTest } from '@services/base.service.spec';
import { MessageService } from 'primeng/api';

describe('PushNotificationService', () => {
	let baseServiceTest: BaseServiceTest;
	let service: PushNotificationService;

	beforeEach(() => {
		baseServiceTest = new BaseServiceTest();
		baseServiceTest.setup([MessageService]);
		service = TestBed.inject(PushNotificationService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('pushSubscribe', () => {
		it('on success', async () => {
			baseServiceTest.mockHttpSuccess();
			await service
				.pushSubscribe({ endpoint: '', auth: '', p256dh: '' })
				.then(result => expect(result).toBeNull())
				.catch(() => fail('Promise should be resolved'));
		});
		it('on error', async () => {
			baseServiceTest.mockHttpError();
			await service
				.pushSubscribe({ endpoint: '', auth: '', p256dh: '' })
				.then(() => fail('Promise should be rejected'))
				.catch(result => {
					expect(result).toBeDefined();
					expect(result.status).toBe(500);
					expect(result.statusText).toBe('Internal Server Error');
					expect(result.error.errors).toEqual(['mocked error']);
				});
		});
	});
});
