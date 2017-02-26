import {AbstractDatastore, DatastoreFactoryType} from "./datastore";
import {DatastoreModel} from "../model/datastore-model";
import {ResourceProvider} from "../provider/resource-provider";

export class DatastoreRegistry {

    private static _instance: DatastoreRegistry;

    /**
     * Registry of datastore instances by datastore name
     *
     * @type {Map<string, AbstractDatastore>}
     * @private
     */
    private _registry = new Map<string, AbstractDatastore>();

    /**
     * Map of models to containing datastore instances
     *
     * @type {Map<DatastoreModel, AbstractDatastore>}
     * @private
     */
    private _modelMap = new Map<typeof DatastoreModel, AbstractDatastore>();

    /**
     * Registry of resource provider instances
     *
     * @type {Map<DatastoreModel, ResourceProvider>}
     * @private
     */
    private _providers = new Map<typeof DatastoreModel, ResourceProvider<any>>();

    private _typeModels = new Map<string, typeof DatastoreModel>();

    private _modelTypes = new Map<typeof DatastoreModel, string>();

    static getInstance(): DatastoreRegistry {

        if (DatastoreRegistry._instance == undefined) {
            DatastoreRegistry._instance = new DatastoreRegistry();
        }

        return DatastoreRegistry._instance;
    }

    private constructor() {
    }

    registerDatastore(type: typeof AbstractDatastore): void {


        let name: string = type.name;

        if (this._registry.has(name)) {
            throw new Error(`Datastore with name ${name} already registered`);
        }

        let datastore = new (<DatastoreFactoryType> type);

        this._registry.set(name, datastore);

        datastore.models.forEach((model) => {

            if (this._modelMap.has(model)) {
                throw new Error(`Model ${model.name} already registered with datastore ${this._modelMap.get(model).constructor.name}`);
            }

            this._modelMap.set(model, datastore);

            let type: string = DatastoreModel.getModelType(model);
            this._typeModels.set(type, model);
            this._modelTypes.set(model, type);
        })
    }

    //noinspection JSUnusedGlobalSymbols
    hasModel(model: typeof DatastoreModel): boolean {
        return this._modelMap.has(model);
    }

    //noinspection JSUnusedGlobalSymbols
    hasModelType(type: string): boolean {
        return this._typeModels.has(type);
    }

    getModelType(model: typeof DatastoreModel): string {
        return this._modelTypes.get(model);
    }

    getTypeModel(type: string): typeof DatastoreModel {
        return this._typeModels.get(type);
    }

    getModelDatastore(model: typeof DatastoreModel): AbstractDatastore {
        return this._modelMap.get(model);
    }

    getTypeDatastore(type: string): AbstractDatastore {
        return this.getModelDatastore(this.getTypeModel(type));
    }

    getModelProvider<T extends DatastoreModel>(model: typeof DatastoreModel): ResourceProvider<T> {

        if (!this.hasModel(model)) {
            throw new Error(`Model ${this.getModelType(model)} not registered`);
        }

        if (!this._providers.has(model)) {
            this._providers.set(model, ResourceProvider.getInstance(model));
        }

        return this._providers.get(model);
    }

    //noinspection JSUnusedGlobalSymbols
    getTypeProvider<T extends DatastoreModel>(type: string): ResourceProvider<T> {
        return this.getModelProvider<T>(this.getTypeModel(type));
    }
}
