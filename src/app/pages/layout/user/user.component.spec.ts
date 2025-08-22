import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { authServiceProviderMock } from '../../../mocks/services/auth-service-mock.spec';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
			providers: [authServiceProviderMock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

	fdescribe('When start', () => {
		it('should load user data', () => {
			expect(fixture.debugElement.nativeElement.querySelector('[data-test="user-image"]')).not.toBeNull();
			expect(fixture.debugElement.nativeElement.querySelector('[data-test="user-name"]')).not.toBeNull();
			expect(fixture.debugElement.nativeElement.querySelector('[data-test="user-email"]')).not.toBeNull();
		});
	});
});
