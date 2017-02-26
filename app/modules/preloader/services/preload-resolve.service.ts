import {Injectable, Injector, Type} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";

import {PreloaderRegistry} from "./preloader-registry";
import {ResolveContext} from "../resolver/resolve-context";

@Injectable()
export class PreloadResolve implements Resolve<any> {

    private _registry: PreloaderRegistry;

    constructor(private _injector: Injector) {
        this._registry = PreloaderRegistry.getInstance();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolveContext> {

        let context = this._registry.getContext(<Type<any>> route.component)
            .setInjector(this._injector)
            .setSnapshot(route, state);

        return this._registry.resolveConsumer(context);
    }
}
