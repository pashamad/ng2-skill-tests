import {AbstractClassDecorator, ClassDecoratorFactory} from "../../../generic/decorators/class-decorator-factory";

import {AbstractDataService} from "../provider/data-service";

export class DatastoreModelDecorator extends AbstractClassDecorator<AbstractDataService, DatastoreModelConfig> {

    static readonly CONFIG_METADATA_KEY = 'DatastoreModelMetadata';
}

export interface DatastoreModelDecoratorInterface {
    (config: DatastoreModelConfig): any;
}

export const ModelConfig: DatastoreModelDecoratorInterface = ClassDecoratorFactory.decorator(DatastoreModelDecorator);

export interface DatastoreModelConfig {
    type: string;
    path?: string;
}
