import {Injectable} from '@angular/core';

import {AbstractDataService} from "../../datastore/provider/data-service";
import {DataService} from "../../datastore/decorators/data-service.decorator";
import {AppSettings} from "../../../app.settings";

@Injectable()
@DataService({
    models: [
    ]
})
export class SecurityDataService extends AbstractDataService {

    constructor() {
        super();
        setTimeout(() => {
            this._preloaded$.next(true);
        }, AppSettings.DATASTORE_FIXTURES_DELAY);
    }
}
