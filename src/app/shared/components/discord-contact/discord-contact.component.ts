import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ContactForm } from '@pages/contact/contact.form';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IContactForm } from '@models/forms/contact-form';
import { SelectModel } from '@models/primeng/select-model';
import { EMessageType } from '@models/enums/EMessageType';
import { MessageService } from 'primeng/api';
import { IMessagesService } from '@interfaces/messages.service.interface';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
	selector: 'app-discord-contact',
	imports: [TranslatePipe, FloatLabel, InputText, ReactiveFormsModule, Select, Button, NgxMaskDirective],
	templateUrl: './discord-contact.component.html',
	styleUrl: './discord-contact.component.scss',
})
export class DiscordContactComponent implements OnInit {
	private readonly translateService: TranslateService = inject(TranslateService);
	private readonly messageService: MessageService = inject(MessageService);
	private readonly messagesService = inject(IMessagesService);
	private readonly _form = new ContactForm();
	protected form: FormGroup<IContactForm> = this._form;
	messageTypes: SelectModel[] | undefined;

	ngOnInit(): void {
		this.messageTypes = [
			{ label: 'Other', value: EMessageType.Other },
			{ label: 'Automation', value: EMessageType.Automation },
			{ label: 'WordPress', value: EMessageType.WordPress },
		];
	}

	async sendMessage() {
		await this.messagesService.DiscordMessage(this._form.GetValue()).then(() =>
			this.messageService.add({
				severity: 'success',
				summary: this.translateService.instant('toast.success'),
				detail: this.translateService.instant('contact.success-message'),
				life: 2000,
			})
		);
	}
}
