import {Injectable} from '@angular/core';

import {AbstractDataService} from "../../datastore/provider/data-service";
import {DataService} from "../../datastore/decorators/data-service.decorator";
import {Client} from "../model/client";
import {ClientDetail} from "../model/client-detail";

@Injectable()
@DataService({
    models: [
        Client,
        ClientDetail
    ],
    preload: [
        {model: Client}
    ]
})
export class ClientDataService extends AbstractDataService {

    constructor() {
        // @todo research injector creating new instance each time router changes a module
        // console.debug(`Creating new client-data service`);
        super();
        this.preloaded$.first().subscribe(() => {
            //
        });
    }

    get clients(): Client[] {
        return this.getProvider<Client>(Client).repository.values;
    }
}
