import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService extends BaseService {
	constructor() {
		super(environment.apiUrl, 'test');
	}

	public async free() {
		return await this.GetAsync<object>('free');
	}

	public async token() {
		return await this.GetAsync<object>('token');
	}

	public async authorize() {
		return await this.GetAsync<object>('authorize');
	}
}
