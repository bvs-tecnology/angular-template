import { computed, inject, Injectable, signal } from '@angular/core';
import Keycloak, { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';
import { environment } from '../../../environments/environment';
import { IAuthService } from '@interfaces/auth.service.interface';

@Injectable({
	providedIn: 'root',
})
export class AuthService implements IAuthService {
	private keycloak: Keycloak;
	private profile = signal<KeycloakProfile | undefined>(undefined);
	public profile$ = this.profile.asReadonly();
	private tokenParsed = signal<KeycloakTokenParsed | undefined>(undefined);
	public tokenParsed$ = this.tokenParsed.asReadonly();
	public isAuthenticated$ = computed(() => !!this.profile$());

	private refreshToken = signal<string | undefined>(undefined);
	public refreshToken$ = this.refreshToken.asReadonly();
	private token = signal<string | undefined>(undefined);
	public token$ = this.token.asReadonly();
	private idToken = signal<string | undefined>(undefined);
	public idToken$ = this.idToken.asReadonly();

	constructor() {
		this.keycloak = new Keycloak({
			url: environment.keycloak.url,
			realm: environment.keycloak.realm,
			clientId: environment.keycloak.clientId,
		});

		window.addEventListener('storage', event => {
			if (event.key === 'kc_token') {
				window.location.reload();
			}
		});
	}

	public async init(): Promise<void> {
		await this.keycloak
			.init({
				onLoad: 'login-required',
				silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
				redirectUri: 'http://localhost:4200/',
				token: this.token$(),
				refreshToken: this.refreshToken$(),
				idToken: this.idToken$()
			})
			.then(async authenticated => {
				if (authenticated) await this.setAuthData();
			});
	}

	private async setAuthData() {
		this.storeTokens();
		this.profile.set(await this.keycloak.loadUserProfile());
		this.tokenParsed.set(this.keycloak.tokenParsed);
		this.token.set(this.keycloak.token);
		this.refreshToken.set(this.keycloak.refreshToken);
		this.idToken.set(this.keycloak.idToken);
	}

	private storeTokens(): void {
		localStorage.setItem('kc_token', this.keycloak.token || '');
		localStorage.setItem('kc_refreshToken', this.keycloak.refreshToken || '');
	}

	public getToken(): string | null {
		return this.keycloak.token ?? localStorage.getItem('kc_token');
	}

	public async login(): Promise<void> {
		await this.keycloak.login();
	}

	public async logout(): Promise<void> {
		localStorage.removeItem('kc_token');
		localStorage.removeItem('kc_refreshToken');
		await this.keycloak.logout({ redirectUri: 'http://localhost:4200/' });
	}
}

export async function initializeKeycloak() {
  const authService = inject(AuthService);
  await authService.init();
}

export const authServiceProvider = { provide: IAuthService, useExisting: AuthService };
