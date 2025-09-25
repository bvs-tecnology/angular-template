import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { ActivatedRoute } from '@angular/router';
import { authServiceProviderMock } from '@mocks/services/auth-service-mock.spec';
import { provideTranslateService } from '@ngx-translate/core';

describe('LayoutComponent', () => {
	let component: LayoutComponent;
	let fixture: ComponentFixture<LayoutComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LayoutComponent],
			providers: [
				authServiceProviderMock,
				provideTranslateService(),
				{ provide: ActivatedRoute, useValue: { snapshot: { params: { id: 'id' } } } },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(LayoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('on click to toggle sidebar', () => {
		beforeEach(() => {
			const button = fixture.debugElement.nativeElement.querySelector('[data-test="toggle-sidebar"] > button');
			button.click();
			fixture.detectChanges();
		});
		it('should toggle sidebar', () => expect(component['sidebarOpen']()).toBeFalsy());
		it('should show only icons', () => expect(component['menuItemsClose']().toString()).not.toContain('label'));
	});
});
