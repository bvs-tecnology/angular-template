import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { AppTitleService } from '@core/core-services/app-title.service';

@Injectable()
export class AppTitle extends TitleStrategy {
	constructor(
		private _title: Title,
		private _titleService: AppTitleService
	) {
		super();
	}

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
