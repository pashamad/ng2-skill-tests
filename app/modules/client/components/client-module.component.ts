import {Component} from '@angular/core';

import {ClientDataService} from "../services/client-data.service";

// @todo Implement `PreloadResolve` decorator
/*
import {PreloadResolve} from "../../preloader/decorators/preload-resolve.decorator";

@PreloadResolve({
    providers: [
        ClientDataService
    ]
})
*/
@Component({
    selector: 'client-module',
    template: `
<section>
    <h3>Client Module</h3>
    <router-outlet></router-outlet>
</section>
`
})
export class ClientModuleComponent {
}
