import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Injector, Type} from "@angular/core";

import {PreloadResolveConfig} from "../decorators/preload-resolve.decorator";
import {AbstractDataService} from "../../datastore/provider/data-service";
import {ResolverResult, ResolvedData} from "./resolver-result";

export class ResolveContext {

    private _services: AbstractDataService[] = [];

    private _result: ResolverResult = {};

    constructor(private _consumer: Type<any>,
                private _config: PreloadResolveConfig,
                private _injector?: Injector,
                private _route?: ActivatedRouteSnapshot,
                private _state?: RouterStateSnapshot) {

        if (this._config == undefined) {
            this._config = {
                providers: []
            };
        }
    }

    //noinspection JSUnusedGlobalSymbols
    get consumer(): Type<any> {
        return this._consumer;
    }

    get services(): AbstractDataService[] {
        return this._services;
    }

    get config(): PreloadResolveConfig {
        return this._config;
    }

    get route(): ActivatedRouteSnapshot {
        return this._route;
    }

    get state(): RouterStateSnapshot {
        return this._state;
    }

    get injector(): Injector {
        return this._injector;
    }

    get result(): ResolverResult {
        return this._result;
    }

    setServices(services: AbstractDataService[]): ResolveContext {
        this._services = services;
        return this;
    }

    setInjector(injector: Injector): ResolveContext {
        this._injector = injector;
        return this;
    }

    setSnapshot(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ResolveContext {
        this._route = route;
        this._state = state;
        return this;
    }

    setResultData(key: string, data: ResolvedData): void {
        this._result[key] = data;
    }
}
