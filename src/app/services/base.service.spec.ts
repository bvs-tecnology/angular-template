import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { BaseResponse } from '@models/base.response';

export class BaseServiceTest {
	setup(_providers: unknown[] = []) {
		TestBed.configureTestingModule({
			providers: [HttpClient, HttpHandler, ..._providers],
		});
	}

	mockHttpSuccess<T>(result: T | null = null) {
		const httpClient: HttpClient = TestBed.inject(HttpClient);
		const successResponse: BaseResponse<unknown> = { success: true, errors: [], result: result };
		spyOn(httpClient, 'get').and.returnValue(of(successResponse));
		spyOn(httpClient, 'post').and.returnValue(of(successResponse));
		spyOn(httpClient, 'put').and.returnValue(of(successResponse));
		spyOn(httpClient, 'patch').and.returnValue(of(successResponse));
		spyOn(httpClient, 'delete').and.returnValue(of(successResponse));
	}

	mockHttpError() {
		const httpClient: HttpClient = TestBed.inject(HttpClient);
		const errorResponse: BaseResponse<unknown> = { success: false, errors: ['mock error'], result: null };
		const error = { status: 500, statusText: 'Internal Server Error', error: errorResponse };
		spyOn(httpClient, 'get').and.returnValue(throwError(() => error));
		spyOn(httpClient, 'post').and.returnValue(throwError(() => error));
		spyOn(httpClient, 'put').and.returnValue(throwError(() => error));
		spyOn(httpClient, 'patch').and.returnValue(throwError(() => error));
		spyOn(httpClient, 'delete').and.returnValue(throwError(() => error));
	}
}
