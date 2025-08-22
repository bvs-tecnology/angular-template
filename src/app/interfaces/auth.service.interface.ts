import { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';
import { Signal } from '@angular/core';

export abstract class IAuthService {
	abstract readonly profile$: Signal<KeycloakProfile | undefined>;
	abstract readonly tokenParsed$: Signal<KeycloakTokenParsed | undefined>;

	abstract getToken(): string | null;
	abstract logout(): void
}
