import { computed, inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';

export const MAIN_TITLE = 'Template';

@Injectable({
	providedIn: 'root',
})
export class AppTitleService {
	private readonly _translate: TranslateService = inject(TranslateService);
	private _title = signal<string>(MAIN_TITLE);
	public title = this._title.asReadonly();
	public resumedTitle = computed(() => this._title().split(' - ')[1] ?? MAIN_TITLE);

	public async setTitle(title: string | undefined) {
		if (title) {
			const translated = await lastValueFrom(this._translate.get(title));
			this._title.set(`${MAIN_TITLE} - ${translated}`);
		} else this._title.set(MAIN_TITLE);
	}
}
