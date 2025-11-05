import { authServiceProvider } from '@services/auth/auth.service';
import { pushServiceProvider } from '@services/push-notification/push-notification.service';
import { messagesServiceProvider } from '@services/messages/messages.service';

export function provideServices() {
	return [authServiceProvider, pushServiceProvider, messagesServiceProvider];
}
