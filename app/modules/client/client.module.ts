import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {ClientRoutingModule} from "./client.routing";

import {ClientDatastore} from "./client.datastore";
import {ClientDataService} from "./services/client-data.service";

import {ClientDetailResolver} from "./resolvers/client-detail.resolver";

import {ClientModuleComponent} from "./components/client-module.component";
import {ClientListComponent} from "./components/client-list.component";
import {ClientDetailComponent} from "./components/client-detail.component";


@NgModule({
    imports: [
        CommonModule,
        ClientRoutingModule
    ],
    exports: [
        ClientModuleComponent
    ],
    declarations: [
        ClientModuleComponent,
        ClientListComponent,
        ClientDetailComponent
    ],
    providers: [
        ClientDatastore,
        ClientDataService,
        ClientDetailResolver
    ]
})
export class ClientModule {
}
