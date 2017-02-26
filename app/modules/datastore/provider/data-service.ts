import {BehaviorSubject, Observable} from "rxjs/Rx";

import {DataServiceConfig, DataServiceDecorator} from "../decorators/data-service.decorator";

import {HasClassMetadata} from "../../../generic/decorators/class-decorator-factory";
import {ResourceProvider} from "./resource-provider";
import {DatastoreModel} from "../model/datastore-model";

export abstract class AbstractDataService extends HasClassMetadata {

    protected _providers = new Map<typeof DatastoreModel, ResourceProvider<any>>();

    protected _preloaded$ = new BehaviorSubject<boolean>(false);

    private __config: DataServiceConfig;

    constructor(autoload: boolean = true) {

        super();

        this.__config = this.getClassMetadata(DataServiceDecorator.CONFIG_METADATA_KEY);

        if (this.__config == undefined) {
            throw new Error(`Data service must be decorated with @DataService decorator`);
        }

        this.__config.models.forEach((model) => {
            let provider = ResourceProvider.getInstance(model);
            this._providers.set(model, provider);
        });

        if (autoload) {
            this.preload();
        }
    }

    get preloaded$(): Observable<boolean> {
        return this._preloaded$.filter(_  => _ == true);
    }

    //noinspection JSUnusedGlobalSymbols
    get preloaded(): boolean {
        return this._preloaded$.getValue();
    }

    getProvider<T extends DatastoreModel>(model: typeof DatastoreModel): ResourceProvider<T> {
        if (!this._providers.has(model)) {
            console.warn(`Provider for model %o not found in %o`, model, this);
            return;
        }
        return this._providers.get(model);
    }

    read<T extends DatastoreModel>(model: typeof DatastoreModel, params?: {[key: string]: any}): Promise<T[]> {
        return this.getProvider(model).read(params);
    }

    protected preload(preload?: Array<{model: typeof DatastoreModel, params?: {[key: string]: any}}>): Promise<void>
    {
        if (!this.__config.preload) {
            this.__config.preload = [];
        }

        if (preload) {
            preload.forEach(_ => this.__config.preload.push(_));
        }

        return new Promise<void>((resolve, reject) => {

            if (this.__config.preload.length) {

                let preloaded = 0;

                this.__config.preload.forEach((_) => {
                    this.read(_.model, _.params)
                        .then(() => {
                            preloaded++;
                            if (this.__config.preload.length == preloaded) {
                                resolve();
                                setTimeout(() => this._preloaded$.next(true));
                            }
                        })
                        .catch(reason => reject(reason));
                });

            } else {

                resolve();
                setTimeout(() => this._preloaded$.next(true));
            }
        });
    }
}
