import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent, title: 'title.home' },
	{ path: 'test', component: HomeComponent, title: 'title.test' },
	{ path: '**', redirectTo: '' },
];
