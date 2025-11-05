import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { QueryStringHelper } from '@helpers/query-string.helper';
import { lastValueFrom, Observable } from 'rxjs';
import { ErrorResponse } from '@models/error-response';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
	providedIn: 'root',
})
export abstract class BaseService {
	protected url;
	private readonly http: HttpClient = inject(HttpClient);
	private readonly messageService: MessageService = inject(MessageService);
	private readonly translateService: TranslateService = inject(TranslateService);

	protected constructor(url: string, controller: string) {
		this.url = `${url}/api/${controller}`;
	}

	private async ExecuteAsync<T>(request: Observable<T | ErrorResponse>): Promise<T> {
		try {
			const result = await lastValueFrom(request);
			return result as T;
		} catch (exception: unknown) {
			if (exception instanceof HttpErrorResponse) {
				exception.error.errors.forEach((value: string) => {
					this.messageService.add({
						severity: 'error',
						summary: this.translateService.instant('toast.error'),
						detail: value,
						life: 2000
					});
				});
			}
			throw exception;
		}
	}

	protected async GetAsync<T>(path: string, params?: object, headers?: HttpHeaders): Promise<T> {
		return this.ExecuteAsync<T>(
			this.http.get<T | ErrorResponse>(
				`${this.url}${path ? '/' + path : ''}${params ? '?' + QueryStringHelper.MapParams(params) : ''}`,
				{ headers }
			)
		);
	}

	protected async PostAsync<T>(path: string, params?: object, headers?: HttpHeaders): Promise<T> {
		return this.ExecuteAsync<T>(
			this.http.post<T | ErrorResponse>(`${this.url}${path ? '/' + path : ''}`, params, { headers })
		);
	}

	protected async PutAsync<T>(path: string, params?: object, headers?: HttpHeaders): Promise<T> {
		return this.ExecuteAsync<T>(
			this.http.put<T | ErrorResponse>(`${this.url}${path ? '/' + path : ''}`, params, { headers })
		);
	}

	protected async DeleteAsync<T>(path: string, params?: object, headers?: HttpHeaders): Promise<T> {
		return this.ExecuteAsync<T>(
			this.http.delete<T | ErrorResponse>(
				`${this.url}${path ? '/' + path : ''}${params ? '?' + QueryStringHelper.MapParams(params) : ''}`,
				{ headers }
			)
		);
	}

	protected async PatchAsync<T>(path: string, params?: object, headers?: HttpHeaders): Promise<T | ErrorResponse> {
		return this.ExecuteAsync<T>(
			this.http.patch<T | ErrorResponse>(`${this.url}${path ? '/' + path : ''}`, params, { headers })
		);
	}
}
