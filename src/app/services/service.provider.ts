import { authServiceProvider } from '@services/auth/auth.service';

export function provideServices(){
	return [authServiceProvider]
}
