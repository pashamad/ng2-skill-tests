import {Component} from '@angular/core';

import {AdminDataService} from "../services/admin-data.service";
import {Admin} from "../model/admin";

@Component({
    selector: 'admin-list',
    templateUrl: 'app/templates/admin/admin-list.html'
})
export class AdminListComponent {

    constructor(private _data: AdminDataService) {
    }

    get admins(): Admin[] {
        return this._data.admins;
    }
}
