import { Component, effect, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { JsonPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	imports: [JsonPipe, RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	public _authService = inject(AuthService);

	constructor() {
		effect(() => {
			console.log('✅ Profile:', this._authService.profile$());
			console.log('✅ Token:', this._authService.tokenParsed$());
		});
	}
}
