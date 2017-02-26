import {NgModule} from '@angular/core';

import {PreloadResolve} from "./services/preload-resolve.service";
import {PreloadWorker} from "./resolver/preload-worker";

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        PreloadResolve,
        PreloadWorker
    ],
})
export class PreloaderModule {
}
