import {DatastoreModel} from "../../datastore/model/datastore-model";
import {ModelConfig} from "../../datastore/decorators/datastore-model.decorator";

@ModelConfig({
    type: 'ClientDetail'
})
export class ClientDetail extends DatastoreModel {

    //noinspection JSUnusedGlobalSymbols
    age: number;
}
