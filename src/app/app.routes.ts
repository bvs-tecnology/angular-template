import { Routes } from '@angular/router';
import { LayoutComponent } from '@pages/layout/layout.component';
import { inject } from '@angular/core';
import { IAuthService } from '@interfaces/auth.service.interface';
import { LayoutColumnComponent } from '@pages/layout-column/layout-column.component';

export const routes: Routes = [
	{
		path: '',
		component: LayoutColumnComponent,
		loadChildren: () => import('./pages/pages.routes').then(m => m.routes),
	},
];
