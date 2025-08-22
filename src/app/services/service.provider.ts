import { authServiceProvider } from '@services/auth/auth.service';
import { testServiceProvider } from '@services/template/test.service';

export function provideServices(){
	return [
		authServiceProvider,
		testServiceProvider
	]
}
