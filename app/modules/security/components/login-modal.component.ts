import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'login-modal',
    templateUrl: 'app/templates/security/login-modal.html'
})
export class LoginModalComponent implements OnInit {

    private _hidden: boolean = true;

    private _static: boolean = false;

    constructor(private _auth: AuthService) {
    }

    get hidden(): boolean {
        return this._hidden;
    }

    @Input()
    set hidden(value: boolean) {
        this._hidden = value;
    }

    //noinspection ReservedWordAsName
    @Input()
    set static(value: boolean) {
        this._static = value;
    }

    ngOnInit(): void {
        if (!this._static) {
            this._auth.authCheck$.subscribe(_ => this.toggle(_));
        }
    }

    login(): void {
        this._auth.login();
        this.close();
    }

    toggle(state: boolean = true): void {
        if (state) {
            this.open();
        } else {
            this.close();
        }
    }

    open(): void {
        this._hidden = false;
    }

    close(): void {
        this._hidden = true;
    }
}
