import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { AppTitleService } from '@services/app-title/app-title.service';

@Injectable()
export class AppTitle extends TitleStrategy {
	private _title: Title = inject(Title);
	private _titleService: AppTitleService = inject(AppTitleService);

	async updateTitle(snapshot: RouterStateSnapshot): Promise<void> {
		const title = this.buildTitle(snapshot);
		await this._titleService.setTitle(title);
		if (title) this._title.setTitle(this._titleService.title());
	}
}

export const provideCustomAppTitle = () => {
	return {
		provide: TitleStrategy,
		useClass: AppTitle,
	};
};
