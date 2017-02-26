import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AdminModuleComponent} from "./components/admin-module.component";
import {AdminListComponent} from "./components/admin-list.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AdminModuleComponent,
                children: [
                    {
                        path: '',
                        component: AdminListComponent
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
export class AdminRoutingModule {
}
