import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, Subject} from "rxjs/Rx";
import {AppSettings} from "../../../app.settings";

export const AuthCheckMode = {
    PAGE: 1,
    MODAL: 2
};

@Injectable()
export class AuthService {

    private _authenticated$ = new BehaviorSubject(false);

    private _authCheck$ = new BehaviorSubject(false);

    constructor(private _router: Router) {
    }

    get authenticated$(): Observable<boolean> {
        return this._authenticated$.asObservable();
    }

    get authenticated(): boolean {
        return this._authenticated$.value;
    }

    get authCheck$(): Observable<boolean> {
        return this._authCheck$;
    }

    login(): void {
        this._authenticated$.next(true);
    }

    /**
     * @todo Implement authentication check by means of `login-modal` component
     *
     * Two possible solutions available with two distinct login modal modes:
     *
     * 1. Static - login modal is hidden directly in template with *ngIf check of `authenticated` boolean value, which is actual value of `authenticated$` subject
     * 2. Manual - login modal is hidden by subscribing to intermediate `authCheck$` observable
     *
     * > * The function of login modal component is to call `AuthService.login()` method upon clicking "Login" button and that must be left intact
     * > * Any or both solutions can be implemented
     * > * Both methods must navigate to passed `redirect` url upon successful login
     */
    authCheck(mode: number, redirect?: string): Observable<boolean> {

        if (this.authenticated) {
            return Observable.of(true);
        }

        switch (mode) {

            case AuthCheckMode.PAGE:
                return this.authCheckWithPage(redirect);

            case AuthCheckMode.MODAL:
                if (AppSettings.LOGIN_MODAL_STATIC) {
                    return this.authCheckWithModalStatic(redirect);
                } else {
                    return this.authCheckWithModalManual(redirect);
                }

            default:
                throw new Error(`Invalid mode ${mode}`);
        }
    }

    authCheckWithPage(redirect: string): Observable<boolean> {

        return this.authenticated$.do(_ => {
            if (_ == false) {
                this._router.navigate(['/login'], {queryParams: {redirect: redirect}, skipLocationChange: true});
            }
        });
    }

    // @todo solution with static modal by means of `*ngIf` on <login-modal/>
    //noinspection JSMethodCanBeStatic
    authCheckWithModalStatic(redirect: string = '/'): Observable<boolean> {
        return Observable.of(false);
    }

    // @todo solution with manual modal opening through intermediate `authCheck$` observable
    //noinspection JSMethodCanBeStatic
    authCheckWithModalManual(redirect: string = '/'): Observable<boolean> {
        return Observable.of(false);
    }
}
