import {Injectable} from '@angular/core';

import {DataService} from "../../datastore/decorators/data-service.decorator";
import {AbstractDataService} from "../../datastore/provider/data-service";

import {Admin} from "../model/admin";

@Injectable()
@DataService({
    models: [
        Admin
    ],
    preload: [
        {model: Admin}
    ]
})
export class AdminDataService extends AbstractDataService {

    constructor() {
        super();
        this.preloaded$.first().subscribe(() => {
            //
        });
    }

    get admins(): Admin[] {
        return this.getProvider<Admin>(Admin).repository.values;
    }
}
