import { Component, inject, OnInit } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { InputText } from 'primeng/inputtext';
import { Router, RouterOutlet } from '@angular/router';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-layout-column',
	imports: [Menubar, InputText, RouterOutlet, Button, Divider],
	templateUrl: './layout-column.component.html',
	styleUrl: './layout-column.component.scss',
})
export class LayoutColumnComponent implements OnInit {
	private router = inject(Router);
	private translateService: TranslateService = inject(TranslateService);
	protected date = new Date();
	items: MenuItem[] | undefined;

	ngOnInit(): void {
		this.items = [
			{
				label: this.translateService.instant('layout.menu.home'),
				icon: 'pi pi-home',
				command: () => this.goToPage(['']),
			},
			{
				label: this.translateService.instant('layout.menu.contact'),
				icon: 'pi pi-user',
				command: () => this.goToPage(['contact']),
			},
			{
				label: this.translateService.instant('layout.menu.business'),
				icon: 'pi pi-building',
				items: [
					{
						label: 'Sobre nós',
						icon: 'pi pi-bolt',
					},
					{
						label: 'Serviços',
						icon: 'pi pi-pen-to-square',
						items: [
							{
								label: 'Automações',
								icon: 'pi pi-sitemap',
							},
							{
								label: 'Inteligência Artificial',
								icon: 'pi pi-sparkles',
							},
						],
					},
				],
			},
			{
				label: this.translateService.instant('layout.menu.support'),
				icon: 'pi pi-phone',
			},
		];
	}

	private goToPage(path: string[]) {
		this.router.navigate(path);
	}
}
