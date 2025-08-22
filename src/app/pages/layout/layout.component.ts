import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
	protected sidebarOpen = signal(true);
	protected menuItems: MenuItem[] = [
		{
			label: 'layout.menu.create',
			icon: 'pi pi-pen-to-square',
		},
		{
			label: 'layout.menu.search',
			icon: 'pi pi-search',
		},
		{
			label: 'layout.menu.gallery',
			icon: 'pi pi-images',
		},
	];
	protected menuItemsClose = computed(() => {
		return this.menuItems.map(menu => {
			return { icon: menu.icon };
		});
	});

	toggleSidebar() {
		this.sidebarOpen.update(x => !x);
	}
}
