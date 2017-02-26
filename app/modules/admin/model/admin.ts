import {DatastoreModel} from "../../datastore/model/datastore-model";
import {ModelConfig} from "../../datastore/decorators/datastore-model.decorator";

@ModelConfig({
    type: 'Admin'
})
export class Admin extends DatastoreModel {

    name: string;
}
