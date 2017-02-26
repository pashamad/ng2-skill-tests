import {Component} from '@angular/core';

import {AppSettings} from "./app.settings";
import {AuthService, AuthCheckMode} from "./modules/security/services/auth.service";

@Component({
    selector: 'app-component',
    template: `
<root></root>
<login-modal *ngIf="showLoginModal" [hidden]="!loginModalStatic" [static]="loginModalStatic"></login-modal>
`,
})
export class AppComponent {

    constructor(private _auth: AuthService) {
    }

    get authenticated(): boolean {
        return this._auth.authenticated;
    }

    get showLoginModal(): boolean {
        return AppSettings.LOGIN_MODE == AuthCheckMode.MODAL && !this.authenticated;
    }

    //noinspection JSMethodCanBeStatic
    get loginModalStatic(): boolean {
        return AppSettings.LOGIN_MODAL_STATIC;
    }
}
