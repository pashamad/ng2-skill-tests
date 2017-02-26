import {Component} from '@angular/core';

import {AdminDataService} from "../services/admin-data.service";

// @todo Implement `PreloadResolve` decorator
/*
import {PreloadResolve} from "../../preloader/decorators/preload-resolve.decorator";

@PreloadResolve({
    providers: [
        AdminDataService
    ]
})
*/
@Component({
    selector: 'admin-module',
    template: `
<section>
    <h3>Admin Module</h3>
    <router-outlet></router-outlet>
</section>
`
})
export class AdminModuleComponent {
}
