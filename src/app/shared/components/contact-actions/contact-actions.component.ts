import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';

@Component({
	selector: 'app-contact-actions',
	imports: [TranslatePipe, Button],
	templateUrl: './contact-actions.component.html',
	styleUrl: './contact-actions.component.scss',
})
export class ContactActionsComponent {}
