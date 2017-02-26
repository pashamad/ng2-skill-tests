import {Repository} from "./repository";
import {DatastoreModel, DatastoreModelFactoryType} from "../model/datastore-model";
import {DatastoreRegistry} from "./datastore-registry";
import {DatastoreConfig, DatastoreDecorator} from "../decorators/datastore.decorator";
import {HasClassMetadata} from "../../../generic/decorators/class-decorator-factory";
import {AppSettings} from "../../../app.settings";

export abstract class AbstractDatastore extends HasClassMetadata {

    protected __config: DatastoreConfig;

    protected _store = new Map<typeof DatastoreModel, Repository<any>>();

    protected _registry: DatastoreRegistry;

    constructor() {

        super();

        this._registry = DatastoreRegistry.getInstance();

        this.__config = this.getClassMetadata(DatastoreDecorator.CONFIG_METADATA_KEY);

        if (this.__config == undefined) {
            throw new Error(`Data service must be decorated with @DataService decorator`);
        }

        this.__config.models.forEach((model) => {
            this._store.set(model, new Repository<DatastoreModel>());
        });
    }

    get models(): (typeof DatastoreModel)[] {
        return Array.from(this._store.keys());
    }

    getRepository<T extends DatastoreModel>(model: typeof DatastoreModel): Repository<T> {

        if (this._store.has(model)) {

            return this._store.get(model);

        } else if (this._registry.hasModel(model)) {

            return this._registry.getModelDatastore(model).getRepository<T>(model);

        } else {

            throw new Error(`Model "${model.name}" not found in registry`);
        }
    }

    query<T extends DatastoreModel>(model: typeof DatastoreModel, params: any = {}): Promise<T[]> {

        let result: DatastoreModel[] = [];

        if (this.__config.fixtures && this.__config.fixtures[model.name]) {

            let fixtures = this.__config.fixtures[model.name];

            fixtures.data.forEach((data) => {

                if (params) {
                    for (let prop in params) {
                        //noinspection JSUnfilteredForInLoop
                        if (data[prop] != params[prop]) {
                            return;
                        }
                    }
                }

                let resource = new (<DatastoreModelFactoryType> model)();
                for (let key in data) {
                    resource[key] = data[key];
                }

                result.push(resource);
                this.attach(resource);
            });
        }

        return new Promise((resolve) => {

            setTimeout(() => {
                resolve(result);
            }, AppSettings.DATASTORE_FIXTURES_DELAY);
        });
    }

    attach(resource: DatastoreModel): void {

        if (!resource.id) {
            console.error(`Resource of type ${resource.getModelType()} can't be attached to repository as it doesn't have id`);
            return;
        }

        this.getRepository<DatastoreModel>(resource.getModel()).add(resource);
    }
}

export interface DatastoreFactoryType extends AbstractDatastore {

    new (): DatastoreFactoryType;
}