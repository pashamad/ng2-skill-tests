import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";

//noinspection JSUnusedGlobalSymbols
@Injectable()
export class RootPreloadResolver implements Resolve<boolean> {

    constructor() {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return Observable.of(true);
    }
}
