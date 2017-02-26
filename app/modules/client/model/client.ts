import {DatastoreModel} from "../../datastore/model/datastore-model";
import {ModelConfig} from "../../datastore/decorators/datastore-model.decorator";
import {ClientDetail} from "./client-detail";

@ModelConfig({
    type: 'Client'
})
export class Client extends DatastoreModel {

    name: string;

    detail: ClientDetail;
}
