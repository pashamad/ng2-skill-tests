export class Index<T> {

    private _map: Map<any, T[]> = new Map<any, T[]>();


    constructor(private propertyName: string, items: T[] = []) {
        this.build(items);
    }

    push(item: T): void {
        this.get(item[this.propertyName]).push(item);
    }

    remove(item: T): void {
        this._map.forEach((items: T[]) => {
            let i = items.indexOf(item);
            if (i !== -1) {
                items.splice(i, 1);
            }
        });
    }

    has(key: any): boolean {
        return this._map.has(key);
    }

    get(key: any): T[] {
        if (!this._map.has(key)) {
            this._map.set(key, []);
        }
        return this._map.get(key);
    }

    getOne(key: any): T {
        let list = this.get(key);
        if (list.length > 1) {
            throw new Error(`Multiple results in 'Index.getOne' method`);
        }
        return list.length ? list[0] : undefined;
    }

    //noinspection ReservedWordAsName
    in(keys: any[]): T[] {
        let result: T[] = [];
        keys.forEach(key => {
            result = result.concat(this.get(key));
        });
        return result;
    }

    rebuild(items: T[]): void {
        this.clear();
        this.build(items);
    }

    build(items: T[]): void {
        items.forEach(item => this.push(item));
    }

    clear(): void {
        this._map.clear();
    }
}
