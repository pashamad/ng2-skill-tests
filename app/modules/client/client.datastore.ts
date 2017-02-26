import {AbstractDatastore} from "../datastore/repository/datastore";
import {Datastore} from "../datastore/decorators/datastore.decorator";
import {Client} from "./model/client";
import {ClientDetail} from "./model/client-detail";
import {ClientFixtures} from "./fixtures/client.fixtures";
import {ClientDetailFixtures} from "./fixtures/client-detail.fixtures";

@Datastore({
    models: [
        Client,
        ClientDetail
    ],
    fixtures: {
        [Client.name]: ClientFixtures,
        [ClientDetail.name]: ClientDetailFixtures
    }
})
export class ClientDatastore extends AbstractDatastore {
}
