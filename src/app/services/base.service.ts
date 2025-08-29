import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { QueryStringHelper } from '@helpers/query-string.helper';
import { BaseResponse } from '@models/base.response';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService {
  protected url;
  private readonly http: HttpClient = inject(HttpClient);

  protected constructor(url: string, controller: string) {
    this.url = `${url}/api/${controller}`;
  }

  private async ExecuteAsync<T>(request: Observable<T>): Promise<T> {
    return lastValueFrom(request);
  }

  protected async GetAsync<T>(path: string, params?: object, headers?: HttpHeaders): Promise<BaseResponse<T>> {
    return this.ExecuteAsync(
      this.http.get<BaseResponse<T>>(
        `${this.url}${path ? '/' + path : ''}${params ? '?' + QueryStringHelper.MapParams(params) : ''}`,
				{ headers }
      ),
    );
  }

  protected async PostAsync<T>(path: string, params?: object, headers?: HttpHeaders): Promise<BaseResponse<T>> {
    return this.ExecuteAsync(this.http.post<BaseResponse<T>>(`${this.url}${path ? '/' + path : ''}`, params, { headers }));
  }

	protected async ExternalPostAsync<T>(path: string, params?: object, headers?: HttpHeaders): Promise<T> {
		return this.ExecuteAsync(this.http.post<T>(`${this.url}${path ? '/' + path : ''}`, params, { headers }));
	}

  protected async PutAsync<T>(path: string, params?: object, headers?: HttpHeaders): Promise<BaseResponse<T>> {
    return this.ExecuteAsync(this.http.put<BaseResponse<T>>(`${this.url}${path ? '/' + path : ''}`, params, { headers }));
  }

  protected async DeleteAsync<T>(path: string, params?: object, headers?: HttpHeaders): Promise<BaseResponse<T>> {
    return this.ExecuteAsync(
      this.http.delete<BaseResponse<T>>(
        `${this.url}${path ? '/' + path : ''}${params ? '?' + QueryStringHelper.MapParams(params) : ''}`,
				{ headers }
      ),
    );
  }

  protected async PatchAsync<T>(path: string, params?: object, headers?: HttpHeaders): Promise<BaseResponse<T>> {
    return this.ExecuteAsync(this.http.patch<BaseResponse<T>>(`${this.url}${path ? '/' + path : ''}`, params));
  }
}
