import {Component} from '@angular/core';

import {ClientDataService} from "../services/client-data.service";
import {Client} from "../model/client";

@Component({
    selector: 'client-list',
    templateUrl: 'app/templates/client/client-list.html'
})
export class ClientListComponent {

    constructor(private _data: ClientDataService) {
    }

    get clients(): Client[] {
        return this._data.clients;
    }
}
