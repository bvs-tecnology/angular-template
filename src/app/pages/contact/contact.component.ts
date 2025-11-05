import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DiscordContactComponent } from '@shared/components/discord-contact/discord-contact.component';
import { ContactActionsComponent } from '@shared/components/contact-actions/contact-actions.component';

@Component({
	selector: 'app-contact',
	imports: [ReactiveFormsModule, DiscordContactComponent, ContactActionsComponent],
	templateUrl: './contact.component.html',
	styleUrl: './contact.component.scss',
})
export class ContactComponent {}
