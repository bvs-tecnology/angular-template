import { Component, effect, inject } from '@angular/core';
import { AuthService } from '@core/core-services/auth.service';
import { JsonPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TestService } from './services/template/test.service';

@Component({
	selector: 'app-root',
	imports: [JsonPipe, RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	public _authService = inject(AuthService);
	private _testService = inject(TestService);

	constructor() {
		effect(() => {
			console.log('✅ Profile:', this._authService.profile$());
			console.log('✅ Token:', this._authService.tokenParsed$());
		});
	}

	public async free() {
		await this._testService.free().then(console.log);
	}
	public async token() {
		await this._testService.token().then(console.log);
	}
	public async authorize() {
		await this._testService.authorize().then(console.log);
	}
	public logout() {
		this._authService.logout();
	}
}
