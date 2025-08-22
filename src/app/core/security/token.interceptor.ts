import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { IAuthService } from '@interfaces/auth.service.interface';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
	const _authService = inject(IAuthService);
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
