import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';

import {AuthGuardService} from "../security/services/auth-guard.service";

import {RootContainerComponent} from "./components/root-container.component";
import {NotFoundComponent} from "./components/not-found.component";


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: RootContainerComponent,
                canActivate: [AuthGuardService],
                children: [
                    {
                        path: 'clients',
                        loadChildren: 'app/modules/client/client.module#ClientModule'
                    },
                    {
                        path: 'admins',
                        loadChildren: 'app/modules/admin/admin.module#AdminModule'
                    }
                ]
            },
            {
                path: '**',
                component: NotFoundComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class RootRoutingModule {
}
