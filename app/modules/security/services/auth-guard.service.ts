import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";

import {AppSettings} from "../../../app.settings";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private _auth: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._auth.authCheck(AppSettings.LOGIN_MODE, state.url);
    }
}
