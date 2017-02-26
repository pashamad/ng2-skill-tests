import {Index} from './index';
import {IndexedCollectionInterface} from "./collection";
import {ReadonlyCollection} from "./readonly-collection";

export class IndexedCollection<T> implements IndexedCollectionInterface<T> {

    private _items: T[] = [];
    private _cursor: number = -1;
    private _indexes = new Map<string, Index<T>>();

    constructor(items?: T[]) {
        if (items) {
            this._items = items;
        }
    }

    push(item: T): number {
        let length = this._items.push(item);
        this._indexes.forEach((index: Index<T>) => {
            index.push(item);
        });
        return length;
    }

    splice(start: number, deleteCount: number): T[] {
        return <T[]> this._items.splice(start, deleteCount);
    }

    remove(item: T): boolean {

        let index = this._items.indexOf(item);
        if (index == -1) {
            return false;
        }

        this._indexes.forEach((index: Index<T>) => {
            index.remove(item);
        });

        let i = this._items.indexOf(item);
        this._items.splice(i, 1);

        return true;
    }

    clear(): void {
        this._items.splice(0);
        this._cursor = -1;
        this._indexes.clear();
    }

    indexOf(searchElement: T): number {
        return this._items.indexOf(searchElement);
    }

    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void {
        this._items.forEach(callbackfn, thisArg ? thisArg : this);
    }

    //noinspection JSUnusedGlobalSymbols
    get items(): T[] {
        return this._items;
    }

    get length(): number {
        return this._items.length;
    }

    //noinspection JSUnusedLocalSymbols
    next(value?: any): IteratorResult<T> {
        return this._cursor < this._items.length
            ? {done: false, value: this._items[this._cursor++]}
            : {done: true, value: undefined};
    }

    index(property: string): Index<T> {
        if (!this._indexes.has(property)) {
            this._indexes.set(property, new Index<T>(property, this._items));
        }
        return this._indexes.get(property);
    }

    reindex(property?: string): void {
        if (property) {
            this.index(property).rebuild(this._items);
        } else {
            this._indexes.forEach(index => {
                index.rebuild(this._items);
            });
        }
    }

    asReadonly(): ReadonlyCollection<T> {
        return new ReadonlyCollection<T>(this);
    }

    // Collection interface implementations

    add(element: T): boolean {
        this.push(element);
        return true;
    }

    get(index: number): T {
        return this._items[index];
    }

    getKeys(): number[] {
        return Array.from(this._items.keys());
    }

    getValues(): T[] {
        return this._items;
    }

    slice(start: number, count?: number): T[] {
        return this._items.slice(start, start + count);
    }
}
