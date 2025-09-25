import { PushSubscriptionRequest } from '@models/request/push-subscription.request';

export abstract class IPushNotificationService {
	abstract pushSubscribe(request: PushSubscriptionRequest): Promise<void>;
}
