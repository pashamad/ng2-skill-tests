import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";

import {ResolveContext} from "./resolve-context";
import {AsyncObservableQueue} from "../../../generic/observable/async-queue";
import {AbstractDataService} from "../../datastore/provider/data-service";
import {PreloadResolver} from "../services/preload-resolver";

@Injectable()
export class PreloadWorker {

    resolve(context: ResolveContext): Observable<ResolveContext> {

        let queue = new AsyncObservableQueue();

        context.services.forEach((service: AbstractDataService) => {
            queue.add(service.preloaded$);
        });

        if (context.config.providers) {
            context.config.providers.forEach((_: typeof AbstractDataService) => {
                let provider: AbstractDataService = context.injector.get(_);
                queue.add(provider.preloaded$);
            });
        }

        if (context.config.resolvers) {

            for (let key in context.config.resolvers) {
                let resolver: PreloadResolver = context.injector.get(context.config.resolvers[key]);
                queue.add(resolver.resolve(context.route, context.state).do((data) => {
                    context.setResultData(key, data);
                }));
            }
        }

        let subject = new Subject<ResolveContext>();

        queue.run().completed$.delay(0).subscribe({
            next: () => {
                subject.next(context);
            }
        });

        return subject.first();
    }
}
