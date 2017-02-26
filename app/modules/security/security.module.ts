import {NgModule} from '@angular/core';

import {AuthGuardService} from "./services/auth-guard.service";
import {AuthService} from "./services/auth.service";
import {SecurityDataService} from "./services/security-data.service";

import {LoginPageComponent} from "./components/login-page.component";
import {LoginModalComponent} from "./components/login-modal.component";

@NgModule({
    imports: [],
    exports: [
        LoginPageComponent,
        LoginModalComponent
    ],
    declarations: [
        LoginPageComponent,
        LoginModalComponent
    ],
    providers: [
        AuthService,
        AuthGuardService,
        SecurityDataService
    ],
})
export class SecurityModule {
}
