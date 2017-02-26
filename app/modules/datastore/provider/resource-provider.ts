import {Subject} from "rxjs/Rx";

import {DatastoreModel} from "../model/datastore-model";
import {Repository} from "../repository/repository";
import {AbstractDatastore} from "../repository/datastore";
import {DatastoreRegistry} from "../repository/datastore-registry";

export class ResourceProvider<T extends DatastoreModel> implements ResourceProviderInterface<T> {

    private static _instances = new Map<typeof DatastoreModel, ResourceProvider<DatastoreModel>>();

    private _readCache = new Map<string, T[]>();

    private _loadQueue = new Map<string, Subject<void>>();

    private constructor(private _model: typeof DatastoreModel, private _datastore: AbstractDatastore) {

        //noinspection JSUnusedLocalSymbols
        this.repository.subscribe({
            next: (data: T[]) => {
                // console.log(`Repository data updated: %o`, data);
            }
        });
    }

    static createInstance(model: typeof DatastoreModel): ResourceProvider<any> {

        if (ResourceProvider._instances.has(model)) {
            throw new Error(`Provider instance for model ${model.constructor.name} already created`);
        }

        let registry = DatastoreRegistry.getInstance();

        if (!registry.hasModel(model)) {
            throw new Error(`Cannot create resource provider for model ${model.name}: model datastore is not registered`);
        }

        let provider = new ResourceProvider<any>(model, registry.getModelDatastore(model));

        ResourceProvider._instances.set(model, provider);
        return provider;
    }

    static getInstance(model: typeof DatastoreModel): ResourceProvider<any> {

        if (ResourceProvider._instances.has(model)) {
            return ResourceProvider._instances.get(model);
        }

        return ResourceProvider.createInstance(model);
    }

    get model(): typeof DatastoreModel {
        return this._model;
    }

    get repository(): Repository<T> {
        return this._datastore.getRepository<T>(this.model);
    }

    create(resource: T): Promise<T> {
        return undefined;
    }

    read(params: {}): Promise<T[]> {

        return new Promise<T[]>((resolve, reject) => {

            let key: string = params ? JSON.stringify(params) : '{}';

            if (this._readCache.has(key)) {

                resolve(this._readCache.get(key));

            } else if (this._loadQueue.has(key)) {

                this._loadQueue.get(key).subscribe(() => {
                }, (_) => {
                    reject(_);
                }, () => {
                    resolve(this._readCache.get(key));
                });

            } else {

                this._loadQueue.set(key, new Subject<void>());

                this._datastore.query<T>(this._model, params)
                    .then((result) => {

                        this._readCache.set(key, result);

                        resolve(result);

                        this._loadQueue.get(key).complete();
                        this._loadQueue.delete(key);
                    })
                    .catch(reason => reject(reason));
            }
        })
    }

    update(resource: T): Promise<T> {
        return undefined;
    }

    //noinspection ReservedWordAsName
    delete(resource: T): Promise<void> {
        return undefined;
    }
}

//noinspection ReservedWordAsName
export interface ResourceProviderInterface<T> {

    create(resource: T): Promise<T>;
    read(params: {[key: string]: any}): Promise<T[]>;
    update(resource: T): Promise<T>;
    delete(resource: T): Promise<void>;
}
