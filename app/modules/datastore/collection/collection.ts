import {Index} from "./index";

export interface Collection<T> {

    add(element: T): boolean;

    clear(): void;

    remove(element: T): boolean;

    get(index: number): T;

    getKeys(): number[];

    getValues(): T[];

    slice(start: number, count?: number): T[];
}

export interface IndexedCollectionInterface<T> extends Collection<T> {

    index(property: string): Index<T>;
}
