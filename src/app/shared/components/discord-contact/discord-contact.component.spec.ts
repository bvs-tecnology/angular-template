import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscordContactComponent } from './discord-contact.component';

describe('DiscordContactComponent', () => {
	let component: DiscordContactComponent;
	let fixture: ComponentFixture<DiscordContactComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DiscordContactComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DiscordContactComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
