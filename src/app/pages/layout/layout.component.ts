import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserComponent } from '@pages/layout/user/user.component';
import { Divider } from 'primeng/divider';
import { Button } from 'primeng/button';
import { PanelMenu } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
	selector: 'app-layout',
	imports: [RouterOutlet, UserComponent, Divider, Button, PanelMenu, TranslatePipe],
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.scss',
	host: {
		class: 'main-layout',
	},
})
export class LayoutComponent {
	private router = inject(Router);
	protected sidebarOpen = signal(false);
	protected menuItems: MenuItem[] = [
		{
			label: 'layout.menu.home',
			icon: 'pi pi-home',
			command: () => this.goToPage(['']),
		},
		{
			label: 'layout.menu.contact',
			icon: 'pi pi-user',
			command: () => this.goToPage(['contact']),
		},
		{
			label: 'layout.menu.business',
			icon: 'pi pi-building',
			command: () => this.goToPage(['business']),
		},
		{
			label: 'layout.menu.support',
			icon: 'pi pi-whatsapp',
			command: () => this.goToPage(['support']),
		},
	];
	protected menuItemsClose = computed(() => {
		return this.menuItems.map(menu => {
			return { icon: menu.icon, command: menu.command };
		});
	});

	toggleSidebar() {
		this.sidebarOpen.update(x => !x);
	}

	setSidebar(value: boolean) {
		this.sidebarOpen.set(value);
	}

	private goToPage(path: string[]) {
		this.router.navigate(path).finally(() => this.setSidebar(false));
	}
}
