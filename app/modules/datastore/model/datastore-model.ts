import {DatastoreModelConfig, DatastoreModelDecorator} from "../decorators/datastore-model.decorator";

export abstract class DatastoreModel {

    private __type: string;

    protected __config: DatastoreModelConfig;

    protected _id: string;

    static getModelType(model: typeof DatastoreModel): string {

        let config: DatastoreModelConfig = Reflect.getMetadata(DatastoreModelDecorator.CONFIG_METADATA_KEY, model);

        return config.type;
    }

    protected constructor() {

        this.__config = Reflect.getMetadata(DatastoreModelDecorator.CONFIG_METADATA_KEY, this.constructor);
        this.__type = this.__config.type;
    }

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        if (this._id) {
            console.error(`Resource ${this.__type} already has id ${this._id}, and it can't be overwritten`);
            return;
        }
        this._id = id;
    }

    getModel(): typeof DatastoreModel {
        return <typeof DatastoreModel> this.constructor;
    }

    getModelType(): string {
        return this.__type;
    }
}

export interface DatastoreModelFactoryType extends DatastoreModel {

    new (): DatastoreModelFactoryType;
}
