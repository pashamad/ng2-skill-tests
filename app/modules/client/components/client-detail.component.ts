import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {ResolveContextAware} from "../../preloader/adapter/context-aware";
import {ClientDetailResolver} from "../resolvers/client-detail.resolver";

import {ClientDataService} from "../services/client-data.service";

import {Client} from "../model/client";

// @todo Implement `PreloadResolve` decorator
/*
import {PreloadResolve} from "../../preloader/decorators/preload-resolve.decorator";

@PreloadResolve({
    providers: [
        ClientDataService
    ],
    resolvers: {
        detail: ClientDetailResolver
    }
})
*/
@Component({
    selector: 'client-detail',
    templateUrl: 'app/templates/client/client-detail.html'
})
export class ClientDetailComponent extends ResolveContextAware {

    private _client: Client;

    constructor(route: ActivatedRoute) {
        super(route);
        // @todo This line will throw error without pre-loaded data
        this._client = this.getResolveContext().result['detail']['client'];
    }

    get client(): Client {
        return  this._client;
    }
}
