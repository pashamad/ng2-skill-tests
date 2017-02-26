import {DatastoreModel} from "../model/datastore-model";
import {IndexedCollection} from "../collection/indexed-collection";

import {PartialObserver} from "rxjs/Observer";
import {Subscription, BehaviorSubject} from "rxjs/Rx";

import {ReadonlyCollection} from "../collection/readonly-collection";

export class Repository<T extends DatastoreModel> {

    private _collection = new IndexedCollection<T>();

    private _stream$: BehaviorSubject<any> = new BehaviorSubject([]);

    get collection(): ReadonlyCollection<T> {
        return this._collection.asReadonly();
    }

    get values(): T[] {
        return this._collection.getValues();
    }

    subscribe(observer: PartialObserver<T[]>): Subscription {
        return this._stream$.subscribe(observer);
    }

    add(resource: T): void {
        this._collection.add(resource);
        this._stream$.next(this._collection.getValues());
    }
}
