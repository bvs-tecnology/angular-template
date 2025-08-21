import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from '@pages/layout/user/user.component';

@Component({
	selector: 'app-layout',
	imports: [RouterOutlet, UserComponent],
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.scss',
	host: {
		class: 'main-layout',
	},
})
export class LayoutComponent {}
