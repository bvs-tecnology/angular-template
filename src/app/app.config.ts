import { ApplicationConfig, provideAppInitializer, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideCustomAppTitle } from './app.title';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from '@core/security/token.interceptor';
import { initializeKeycloak } from '@services/auth/auth.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideServices } from '@services/service.provider';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideTranslateService } from '@ngx-translate/core';
import { provideServiceWorker } from '@angular/service-worker';
import { initializePwa } from '@services/pwa-config/pwa-config.service';
import { MessageService } from 'primeng/api';
import { provideEnvironmentNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideCustomAppTitle(),
		provideHttpClient(withInterceptors([tokenInterceptor])),
		provideTranslateService({
			loader: provideTranslateHttpLoader(),
			fallbackLang: 'en-US',
			lang: navigator.language,
		}),
		provideAnimationsAsync(),
		providePrimeNG({
			theme: {
				preset: Aura,
				options: {
					darkModeSelector: '.dark-mode',
				},
			},
		}),
		provideEnvironmentNgxMask({
			thousandSeparator: '.',
			decimalMarker: ',',
			allowNegativeNumbers: false,
		}),
		provideServices(),
		provideServiceWorker('ngsw-worker.js', {
			enabled: !isDevMode(),
			registrationStrategy: 'registerWhenStable:30000',
		}),
		provideAppInitializer(initializeKeycloak),
		provideAppInitializer(initializePwa),
		MessageService,
	],
};
