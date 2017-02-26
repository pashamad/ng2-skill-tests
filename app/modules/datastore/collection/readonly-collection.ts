import {IndexedCollectionInterface} from "./collection";
import {Index} from "./index";

export class ReadonlyCollection<T> implements IndexedCollectionInterface<T> {

    constructor(private _source: IndexedCollectionInterface<T>) {
    }

    index(property: string): Index<T> {
        return this._source.index(property);
    }

    add(element: T): boolean {
        throw new Error(`Cannot update readonly collection`);
    }

    clear(): void {
        throw new Error(`Cannot update readonly collection`);
    }

    remove(element: T): boolean {
        throw new Error(`Cannot update readonly collection`);
    }

    get(index: number): T {
        return this._source.get(index);
    }

    getKeys(): number[] {
        return this._source.getKeys();
    }

    getValues(): T[] {
        return this._source.getValues();
    }

    slice(start: number, count?: number): T[] {
        return this._source.slice(start, count);
    }
}
