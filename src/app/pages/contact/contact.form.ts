import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IContactForm } from '@models/forms/contact-form';
import { EMessageType } from '@models/enums/EMessageType';
import { DiscordMessageRequest } from '@models/request/discord-message.request';
import { CustomValidators } from '@validators/custom-validators';

export class ContactForm extends FormGroup<IContactForm> {
	constructor() {
		super({
			name: new FormControl<string>('', [Validators.required, CustomValidators.nameValidator]),
			email: new FormControl<string>('', [Validators.required, CustomValidators.emailValidator]),
			phone: new FormControl<string>('', [Validators.required, CustomValidators.phoneValidator]),
			messageType: new FormControl<EMessageType>(EMessageType.Other, [Validators.required]),
			message: new FormControl<string>('', [Validators.required, Validators.maxLength(500)])
		});
	}

	public GetValue(): DiscordMessageRequest {
		return {
			name: this.controls.name.value!,
			email: this.controls.email.value!,
			phone: this.controls.phone.value!,
			messageType: this.controls.messageType.value!,
			message: this.controls.message.value!,
		};
	}
}
