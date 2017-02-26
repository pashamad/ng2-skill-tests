import {Injector} from "@angular/core";

export abstract class BaseModule {

    constructor(protected _injector: Injector) {
    }
}
