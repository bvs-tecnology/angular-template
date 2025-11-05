import { Component } from '@angular/core';
import { DiscordContactComponent } from '@shared/components/discord-contact/discord-contact.component';

@Component({
	selector: 'app-home',
	imports: [DiscordContactComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {}
