import { Component, inject } from '@angular/core';
import { ITestService } from '@interfaces/test.service.interface';
import { Button } from 'primeng/button';

@Component({
	selector: 'app-home',
	imports: [Button],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {
	private readonly _testService: ITestService = inject(ITestService);

	protected free() {
		this._testService.free();
	}
	protected token() {
		this._testService.token();
	}
	protected authorize() {
		this._testService.authorize();
	}
}
