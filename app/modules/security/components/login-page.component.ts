import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'login-page',
    templateUrl: 'app/templates/security/login-page.html'
})
export class LoginPageComponent {

    private _redirect: string;

    constructor(private _auth: AuthService,
                private _route: ActivatedRoute,
                private _router: Router) {

        this._redirect = this._route.snapshot.queryParams['redirect'];
        if (!this._redirect) {
            this._redirect = '/';
        }
    }

    login(): void {
        this._auth.login();
        this._router.navigateByUrl(this._redirect);
    }
}
