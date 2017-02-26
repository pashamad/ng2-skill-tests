import {Type} from "@angular/core";
import {Observable} from "rxjs/Rx";

import {AppSettings} from "../../../app.settings";
import {PreloadResolveConfig} from "../decorators/preload-resolve.decorator";
import {ResolveContext} from "../resolver/resolve-context";
import {ResolveContextAwareInterface} from "../adapter/context-aware";

import {PreloadWorker} from "../resolver/preload-worker";

import {AbstractDataService} from "../../datastore/provider/data-service";

export class PreloaderRegistry {

    private static _instance: PreloaderRegistry;

    private _services: AbstractDataService[] = [];

    private _consumers = new Map<Type<any>, PreloadResolveConfig>();

    private constructor() {
    }

    static getInstance(): PreloaderRegistry {

        if (PreloaderRegistry._instance == undefined) {
            PreloaderRegistry._instance = new PreloaderRegistry();
        }

        return PreloaderRegistry._instance;
    }

    // @todo implement preloader service interface
    registerGlobal(service: AbstractDataService): void {

        if (this._services.indexOf(service) != -1) {
            throw new Error(`Global preload service ${service.constructor.name} already registered`);
        }

        this._services.push(service);
    }

    registerConsumer(consumer: Type<ResolveContextAwareInterface>, config: PreloadResolveConfig): void {

        if (this._consumers.has(consumer)) {
            throw new Error(`Consumer of type ${consumer.name} already registered in preload registry`);
        }

        this._consumers.set(consumer, config);
    }

    getContext(consumer: Type<ResolveContextAwareInterface>, autoregister: boolean = AppSettings.PRELOADER_AUTO_CONSUMERS): ResolveContext {

        if (consumer != undefined && !this._consumers.has(consumer)) {
            if (autoregister) {
                this._consumers.set(consumer, {});
            } else {
                throw new Error(`Consumer of type ${consumer.name} not registered. \
You can enable PRELOADER_AUTO_CONSUMERS option in app config to auto-register requested consumers.`);
            }
        }

        return (new ResolveContext(consumer, this._consumers.get(consumer)))
            .setServices(this._services);
    }

    resolveConsumer(context: ResolveContext): Observable<ResolveContext> {
        return this._getWorker(context).resolve(context);
    }

    //noinspection JSMethodCanBeStatic
    private _getWorker(context: ResolveContext): PreloadWorker {
        return context.injector.get(PreloadWorker);
    }
}
