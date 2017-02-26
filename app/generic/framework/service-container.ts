import {Injector} from "@angular/core";

export class ServiceContainer {

    private static _instance: ServiceContainer;

    static initialize(injector: Injector): void {
        if (ServiceContainer._instance != undefined) {
            throw new Error(`Service container already initialized`);
        }

        ServiceContainer._instance = new ServiceContainer(injector);
    }

    static get<T>(token: any): T {

        if (ServiceContainer._instance == undefined) {
            throw new Error(`Service container must be initialized`);
        }

        return ServiceContainer._instance.get<T>(token);
    }

    private constructor(private _injector: Injector) {
    }

    get<T>(token: any): T {
        return this._injector.get(token);
    }
}
