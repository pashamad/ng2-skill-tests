import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ClientModuleComponent} from "./components/client-module.component";
import {ClientListComponent} from "./components/client-list.component";
import {ClientDetailComponent} from "./components/client-detail.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ClientModuleComponent,
                children: [
                    {
                        path: '',
                        component: ClientListComponent
                    },
                    {
                        path: ':id',
                        component: ClientDetailComponent
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ],
    declarations: [],
    providers: [],
})
export class ClientRoutingModule {
}
