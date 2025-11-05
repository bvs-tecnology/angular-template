import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const regex = /^([A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+ )*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/;

export function nameValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value;
		if (!value) return null;
		return regex.test(value) ? null : { 'invalid-name': true };
	};
}
