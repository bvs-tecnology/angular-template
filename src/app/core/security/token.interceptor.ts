import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
	const _authService = inject(AuthService);
	const token = _authService.getToken();

	if (token) {
		req = req.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`
			},
		});
	}
  return next(req);
};
