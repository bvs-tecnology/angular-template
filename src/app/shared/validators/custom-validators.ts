import { emailValidator } from './email.validator';
import { nameValidator } from './name.validator';
import { phoneValidator } from './phone.validator';

export class CustomValidators {
	public static emailValidator = emailValidator();
	public static nameValidator = nameValidator();
	public static phoneValidator = phoneValidator();
}
