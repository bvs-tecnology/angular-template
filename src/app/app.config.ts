import { ApplicationConfig, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideCustomAppTitle } from './app.title';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from '@core/security/token.interceptor';
import { initializeKeycloak } from '@core/core-services/auth.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideCustomAppTitle(),
		provideHttpClient(
			withInterceptors([tokenInterceptor])
		),
		provideAppInitializer(initializeKeycloak),
		provideAnimationsAsync(),
		providePrimeNG({
			theme: { preset: Aura }
		})
	],
};
