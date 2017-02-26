import {NgModule, Injector}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from "./app.routing";

import {PreloaderModule} from "./modules/preloader/preloader.module";
import {SecurityModule} from "./modules/security/security.module";
import {RootModule} from "./modules/root/root.module";

import {ServiceContainer} from "./generic/framework/service-container";
import {PreloaderRegistry} from "./modules/preloader/services/preloader-registry";
import {SecurityDataService} from "./modules/security/services/security-data.service";

import {AppComponent} from "./app.component";

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        PreloaderModule,
        SecurityModule,
        RootModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor(injector: Injector) {

        ServiceContainer.initialize(injector);

        let securityData: SecurityDataService = injector.get(SecurityDataService);
        PreloaderRegistry.getInstance().registerGlobal(securityData);
    }
}
