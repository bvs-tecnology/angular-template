import { FormControl } from '@angular/forms';
import { EMessageType } from '@models/enums/EMessageType';

export interface IContactForm {
	name: FormControl<string | null>;
	email: FormControl<string | null>;
	phone: FormControl<string | null>;
	messageType: FormControl<EMessageType | null>;
	message: FormControl<string | null>;
}
