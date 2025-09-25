/* eslint-disable @typescript-eslint/no-empty-function */
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
		email: 'mocked@email.com',
	});
	public readonly profile$ = this.profile.asReadonly();
	private isAuthenticated = signal<boolean>(true);
	public readonly isAuthenticated$ = this.isAuthenticated.asReadonly();
	private tokenParsed = signal<KeycloakTokenParsed | undefined>({
		token: 'mocked',
	});
	public readonly tokenParsed$ = this.tokenParsed.asReadonly();

	public async init(): Promise<boolean> {
		return Promise.resolve(true);
	}

	public getToken(): string | null {
		return 'mock.token';
	}

	public async logout(): Promise<void> {}

	public async login(): Promise<void> {}
}

export const authServiceProviderMock = { provide: IAuthService, useExisting: AuthServiceMock };
