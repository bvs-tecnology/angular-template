import { APP_INITIALIZER, inject, Injectable, signal } from '@angular/core';
import Keycloak, { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	private keycloak: Keycloak;
	private profile = signal<KeycloakProfile | undefined>(undefined);
	public profile$ = this.profile.asReadonly();
	private tokenParsed = signal<KeycloakTokenParsed | undefined>(undefined);
	public tokenParsed$ = this.tokenParsed.asReadonly();

	constructor() {
		this.keycloak = new Keycloak({
			url: environment.keycloak.url,
			realm: environment.keycloak.realm,
			clientId: environment.keycloak.clientId,
		});
	}

	public async init(): Promise<boolean> {
		return await this.keycloak.init({
			onLoad: 'login-required',
			checkLoginIframe: false,
			redirectUri: 'http://localhost:4200/',
		}).then(async authenticated => {
			if (authenticated) {
				this.storeTokens();
				this.profile.set(await this.keycloak.loadUserProfile());
				this.tokenParsed.set(this.keycloak.tokenParsed);
			}
			return authenticated;
		});
	}

	private storeTokens(): void {
		localStorage.setItem('kc_token', this.keycloak.token || '');
		localStorage.setItem('kc_refreshToken', this.keycloak.refreshToken || '');
	}

	public getToken(): string | null {
		return this.keycloak.token ?? localStorage.getItem('kc_token');
	}

	public logout(): void {
		localStorage.removeItem('kc_token');
		localStorage.removeItem('kc_refreshToken');
		this.keycloak.logout({ redirectUri: 'http://localhost:4200/' });
	}
}

export async function initializeKeycloak() {
	const authService = inject(AuthService);
	await authService.init();
}
