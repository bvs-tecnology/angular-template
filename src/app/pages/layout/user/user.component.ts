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
	private readonly _authService: IAuthService = inject(IAuthService);
	private readonly _translate: TranslateService = inject(TranslateService);

	public showAll = input.required<boolean>();

	protected actions = viewChild<Menu>('actions');
	protected actionItems: Signal<MenuItem[] | undefined> = computed(() => {
		return [
			{
				label: 'layout.actions.logout',
				icon: 'pi pi-sign-out',
				command: () => this._authService.logout(),
			},
		];
	});

	protected user = this._authService.profile$;
	protected userLabel = computed(() => {
		if (!this.user()) return '';
		const label = `${this.user()?.firstName?.substring(0, 1)}${this.user()?.lastName?.substring(0, 1)}`;
		return label.toUpperCase();
	});

	constructor() {
		console.log(this.user());
	}

	toggleActions(event: MouseEvent) {
		this.actions()?.toggle(event);
	}
}
