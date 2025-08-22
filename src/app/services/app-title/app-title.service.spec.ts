import { TestBed } from '@angular/core/testing';

import { AppTitleService, MAIN_TITLE } from './app-title.service';

describe('AppTitleService', () => {
	let service: AppTitleService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AppTitleService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('on defined title', () => {
		const title = 'Test Title';
		beforeEach(() => service.setTitle(title));

		it('should return the title', () => expect(service.title()).toBe(`${MAIN_TITLE} - ${title}`));
		it('should return the resumed title', () => expect(service.resumedTitle()).toBe(title));
	});

	describe('on undefined title', () => {
		beforeEach(() => service.setTitle(undefined));

		it('should return the main title', () => expect(service.title()).toBe(MAIN_TITLE));
		it('should return the resumed title', () => expect(service.resumedTitle()).toBe(MAIN_TITLE));
	});
});
