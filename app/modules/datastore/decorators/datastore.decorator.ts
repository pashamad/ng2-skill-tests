import {AbstractClassDecorator, ClassDecoratorFactory} from "../../../generic/decorators/class-decorator-factory";

import {DatastoreModel} from "../model/datastore-model";
import {AbstractDatastore} from "../repository/datastore";
import {DatastoreRegistry} from "../repository/datastore-registry";
import {DataFixtures, DataFixture} from "../fixtures/data-fixtures";

export class DatastoreDecorator extends AbstractClassDecorator<AbstractDatastore, DatastoreConfig> {

    static readonly CONFIG_METADATA_KEY = 'DatastoreMetadata';

    protected _decorate(): void {

        super._decorate();

        let registry = DatastoreRegistry.getInstance();

        registry.registerDatastore(<typeof AbstractDatastore> this._target);
    }
}

export interface DatastoreDecoratorInterface {
    (config: DatastoreConfig): any;
}

export const Datastore: DatastoreDecoratorInterface = ClassDecoratorFactory.decorator(DatastoreDecorator);

export interface DatastoreConfig {
    models: Array<typeof DatastoreModel>;
    fixtures?: {[key: string]: DataFixtures<DataFixture>}
}
