import { Component, computed, inject, input, Signal, viewChild } from '@angular/core';
import { IAuthService } from '@interfaces/auth.service.interface';
import { Avatar } from 'primeng/avatar';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-user',
	imports: [Avatar, Menu, TranslatePipe],
	templateUrl: './user.component.html',
	styleUrl: './user.component.scss',
	host: {
		class: 'user-card',
		'[class.user-card__show-all]': 'showAll()',
		'[class.user-card__open-actions]': 'actions()?.visible',
		'(click)': 'toggleActions($event)',
	},
})
export class UserComponent {
	protected readonly _authService: IAuthService = inject(IAuthService);
	protected readonly _translateService = inject(TranslateService);

	public showAll = input.required<boolean>();

	protected actions = viewChild<Menu>('actions');
	protected actionItems: Signal<MenuItem[] | undefined> = computed(() => {

		return this._authService.isAuthenticated$()
			? [
					{
						label: 'layout.actions.logout',
						icon: 'pi pi-sign-out',
						command: () => this._authService.logout(),
					},
				]
			: [];
	});

	protected user = this._authService.profile$;
	protected userLabel = computed(() => {
		if (!this.user()) return this._translateService.instant("layout.gu");
		const label = `${this.user()?.firstName?.substring(0, 1)}${this.user()?.lastName?.substring(0, 1)}`;
		return label.toUpperCase();
	});

	toggleActions(event: MouseEvent) {
		if (this._authService.isAuthenticated$())	this.actions()?.toggle(event);
		else this._authService.login();
	}
}
