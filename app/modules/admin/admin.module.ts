import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {AdminRoutingModule} from "./admin.routing";

import {AdminDatastore} from "./admin.datastore";
import {AdminDataService} from "./services/admin-data.service";

import {AdminModuleComponent} from "./components/admin-module.component";
import {AdminListComponent} from "./components/admin-list.component";

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule
    ],
    exports: [
    ],
    declarations: [
        AdminModuleComponent,
        AdminListComponent
    ],
    providers: [
        AdminDatastore,
        AdminDataService
    ]
})
export class AdminModule {
}
