import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {RootRoutingModule} from "./root.routing";
import {AdminModule} from "../admin/admin.module";
import {ClientModule} from "../client/client.module";

import {PreloadResolve} from "../preloader/services/preload-resolve.service";
import {PreloadWorker} from "../preloader/resolver/preload-worker";

import {RootComponent} from "./components/root.component";
import {RootContainerComponent} from "./components/root-container.component";
import {NotFoundComponent} from "./components/not-found.component";

@NgModule({
    imports: [
        CommonModule,
        RootRoutingModule,
        AdminModule,
        ClientModule
    ],
    exports: [
        RootComponent
    ],
    declarations: [
        RootComponent,
        RootContainerComponent,
        NotFoundComponent
    ],
    providers: [
        PreloadResolve,
        PreloadWorker
    ],
})
export class RootModule {
}
