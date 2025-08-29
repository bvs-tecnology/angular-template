import { Routes } from '@angular/router';
import { LayoutComponent } from '@pages/layout/layout.component';
import { inject } from '@angular/core';
import { IAuthService } from '@interfaces/auth.service.interface';

export const routes: Routes = [
  {
    path: '',
    canMatch: [() => inject(IAuthService).isAuthenticated$()],
    component: LayoutComponent,
    loadChildren: () => import('./pages/pages.routes').then(m => m.routes),
  }
];
