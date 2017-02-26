import {Observable, BehaviorSubject} from "rxjs/Rx";

export class AsyncObservableQueue {

    private _queue: Observable<any>[] = [];

    private _completed$ = new BehaviorSubject<boolean>(false);

    private _completed: number = 0;

    static from(items: Observable<any>[]): AsyncObservableQueue {
        return new AsyncObservableQueue(items);
    }

    constructor(queue: Observable<any>[] = []) {
        queue.map(_ => this.add(_));
    }

    get completed$(): Observable<boolean> {
        return this._completed$.filter(_ => _ == true);
    }

    get completed(): boolean {
        return this._completed$.value;
    }

    get empty(): boolean {
        return this._queue.length == 0;
    }

    add(item: Observable<any>): AsyncObservableQueue {

        if (this.completed) {
            throw new Error(`Cannot add item to completed queue`);
        }

        this._queue.push(item);

        setTimeout(() => {

            item.subscribe(() => {
                    this._completed++;
                    if (this._completed == this._queue.length) {
                        this._clear();
                        this.complete();
                    }
                },
                (error) => {
                    this._clear();
                    this.error(error);
                });
        });

        return this;
    }

    run(): AsyncObservableQueue {

        if (this.empty) {
            this.complete();
        }

        return this;
    }

    error(error?: string): Observable<boolean> {
        this._completed$.error(error);
        return this.completed$;
    }

    complete(): void {
        this._completed$.next(true);
        this._completed$.complete();
    }

    private _clear(): void {
        this._queue.forEach(() => {
            // @todo check subscriptions
        });
        this._queue = [];
        this._completed = 0;
    }
}
