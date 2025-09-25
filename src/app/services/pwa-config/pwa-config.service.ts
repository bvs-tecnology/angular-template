import { inject, Injectable } from '@angular/core';
import { SwPush, SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IPushNotificationService } from '@interfaces/push-notification.service.interface';

@Injectable({
	providedIn: 'root',
})
export class PwaConfigService {
	private swPush = inject(SwPush);
	private swUpdate = inject(SwUpdate);
	private pushNotificationService = inject(IPushNotificationService);
	private translate = inject(TranslateService);

	async requestNotificationPermission() {
		try {
			const permission = await Notification.requestPermission();
			if (permission !== 'granted') {
				console.log('Permissão para notificações não foi concedida.');
				return;
			}
			const subscription = await this.swPush.requestSubscription({ serverPublicKey: environment.pushPublicKey });
			const subscriptionJson = subscription.toJSON();
			await this.pushNotificationService.pushSubscribe({
				endpoint: subscriptionJson.endpoint ?? '',
				auth: subscriptionJson.keys!['auth'] ?? '',
				p256dh: subscriptionJson.keys!['p256dh'] ?? '',
			});
		} catch (error) {
			console.error('Falha ao solicitar a inscrição para push notifications:', error);
		}
	}

	async checkForUpdate(): Promise<void> {
		this.swUpdate.versionUpdates
			.pipe(
				filter((event): event is VersionReadyEvent => event.type === 'VERSION_READY'),
				switchMap(() => this.translate.get('confirmation.update-app')),
				takeUntilDestroyed()
			)
			.subscribe(message => {
				if (confirm(message)) window.location.reload();
			});
	}
}

export async function initializePwa() {
	const pwaConfig = inject(PwaConfigService);
	await pwaConfig.checkForUpdate();
	await pwaConfig.requestNotificationPermission();
}
