import { Routes } from '@angular/router';
import { LayoutColumnComponent } from '@pages/layout-column/layout-column.component';

export const routes: Routes = [
	{
		path: '',
		component: LayoutColumnComponent,
		// component: LayoutComponent,
		// canMatch: [() => inject(IAuthService).isAuthenticated$()],
		loadChildren: () => import('./pages/pages.routes').then(m => m.routes),
	},
];
