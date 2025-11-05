import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { ContactComponent } from '@pages/contact/contact.component';
import { BusinessComponent } from '@pages/business/business.component';
import { SupportComponent } from '@pages/support/support.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent, title: 'title.home' },
	{ path: 'contact', component: ContactComponent, title: 'title.contact' },
	{ path: 'business', component: BusinessComponent, title: 'title.business' },
	{ path: 'support', component: SupportComponent, title: 'title.support' },
	{ path: '**', redirectTo: '' },
];
