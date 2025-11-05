import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { DiscordContactComponent } from '@shared/components/discord-contact/discord-contact.component';
import { ContactActionsComponent } from '@shared/components/contact-actions/contact-actions.component';

@Component({
	selector: 'app-contact',
	imports: [ReactiveFormsModule, TranslatePipe, Button, DiscordContactComponent, ContactActionsComponent],
	templateUrl: './contact.component.html',
	styleUrl: './contact.component.scss',
})
export class ContactComponent {}
