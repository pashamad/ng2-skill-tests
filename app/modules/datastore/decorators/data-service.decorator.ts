import {AbstractClassDecorator, ClassDecoratorFactory} from "../../../generic/decorators/class-decorator-factory";

import {AbstractDataService} from "../provider/data-service";
import {DatastoreModel} from "../model/datastore-model";

export class DataServiceDecorator extends AbstractClassDecorator<AbstractDataService, DataServiceConfig> {

    static readonly CONFIG_METADATA_KEY = 'DataServiceMetadata';
}

export interface DataServiceDecoratorInterface {
    (config: DataServiceConfig): any;
}

export const DataService: DataServiceDecoratorInterface = ClassDecoratorFactory.decorator(DataServiceDecorator);

export interface DataServiceConfig {
    models: Array<typeof DatastoreModel>;
    preload?: Array<{model: typeof DatastoreModel, params?: {[key: string]: any}}>
}
