import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export function emailValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value;
		if (!value) return null;
		return regex.test(value) ? null : { 'invalid-email': true };
	};
}
