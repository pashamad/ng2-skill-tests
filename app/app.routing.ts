import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';

import {LoginPageComponent} from "./modules/security/components/login-page.component";


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'login',
                component: LoginPageComponent
            },
            {
                path: '',
                loadChildren: 'app/modules/root/root.module#RootModule'
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
