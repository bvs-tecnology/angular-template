import { computed, Injectable, signal } from '@angular/core';

export const MAIN_TITLE = 'Template';

@Injectable({
	providedIn: 'root',
})
export class AppTitleService {
	private _title = signal<string>(MAIN_TITLE);
	public title = this._title.asReadonly();
	public resumedTitle = computed(() => this._title().split(' - ')[1] ?? MAIN_TITLE);

	public async setTitle(title: string | undefined) {
		if (title) this._title.set(`${MAIN_TITLE} - ${title}`);
		else this._title.set(MAIN_TITLE);
	}
}
