import { Injectable, signal } from '@angular/core';
import { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';
import { IAuthService } from '@interfaces/auth.service.interface';

@Injectable({
	providedIn: 'root',
})
export class AuthServiceMock implements IAuthService {
	private profile = signal<KeycloakProfile | undefined>({
		username: 'mock',
		firstName: 'mocked',
		lastName: 'user',
		email: 'mocked@email.com'
	});
	public profile$ = this.profile.asReadonly();
	private tokenParsed = signal<KeycloakTokenParsed | undefined>({
		token: 'mocked'
	});
	public tokenParsed$ = this.tokenParsed.asReadonly();

	public async init(): Promise<boolean> {
		return Promise.resolve(true);
	}

	public getToken(): string | null {
		return 'mock.token';
	}

	public logout(): void {}
}

export const authServiceProviderMock = { provide: IAuthService, useExisting: AuthServiceMock };
