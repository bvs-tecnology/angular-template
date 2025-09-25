import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { authServiceProviderMock } from '../../../mocks/services/auth-service-mock.spec';
import { provideTranslateService } from '@ngx-translate/core';
import { IAuthService } from '@interfaces/auth.service.interface';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('UserComponent', () => {
	let component: UserComponent;
	let fixture: ComponentFixture<UserComponent>;

	let authService: IAuthService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UserComponent],
			providers: [authServiceProviderMock, provideTranslateService(), provideAnimationsAsync()],
		}).compileComponents();

		fixture = TestBed.createComponent(UserComponent);
		component = fixture.componentInstance;
		authService = TestBed.inject(IAuthService);
		fixture.componentRef.setInput('showAll', true);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('When start', () => {
		it('should load user data', () => {
			expect(fixture.debugElement.nativeElement.querySelector('[data-test="user-image"]')).not.toBeNull();
			expect(fixture.debugElement.nativeElement.querySelector('[data-test="user-name"]')).not.toBeNull();
			expect(fixture.debugElement.nativeElement.querySelector('[data-test="user-email"]')).not.toBeNull();
		});
	});

	describe('When click on logout', () => {
		let logoutSpy: jasmine.Spy;
		beforeEach(() => {
			logoutSpy = spyOn(authService, 'logout');
			fixture.debugElement.nativeElement.click();
			fixture.detectChanges();
			fixture.debugElement.nativeElement.querySelector('[data-test="action-item"]').click();
			fixture.detectChanges();
		});

		it('should logout', () => expect(logoutSpy).toHaveBeenCalled());
	});
});
