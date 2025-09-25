import { SwUpdate, VersionEvent, VersionReadyEvent } from '@angular/service-worker';
import { Observable, of, Subject } from 'rxjs';

export class SwUpdateMock {
	available = new Subject<{ current: object; available: object }>();
	activated = new Subject<{ previous: object; current: object }>();

	checkForUpdate(): Promise<void> {
		return Promise.resolve();
	}

	activateUpdate(): Promise<void> {
		return Promise.resolve();
	}

	versionUpdates: Observable<VersionEvent> = of({ type: 'VERSION_READY' } as VersionReadyEvent);
}

export const swUpdateProviderMock = { provide: SwUpdate, useClass: SwUpdateMock };
