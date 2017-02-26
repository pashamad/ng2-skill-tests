import {Datastore} from "../datastore/decorators/datastore.decorator";
import {AbstractDatastore} from "../datastore/repository/datastore";

import {Admin} from "./model/admin";
import {AdminFixtures} from "./fixtures/admin.fixtures";

@Datastore({
    models: [
        Admin
    ],
    fixtures: {
        [Admin.name]: AdminFixtures
    }
})
export class AdminDatastore extends AbstractDatastore {
}
