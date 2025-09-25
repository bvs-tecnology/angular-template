import { authServiceProvider } from '@services/auth/auth.service';
import { pushServiceProvider } from '@services/push-notification/push-notification.service';

export function provideServices() {
	return [authServiceProvider, pushServiceProvider];
}
