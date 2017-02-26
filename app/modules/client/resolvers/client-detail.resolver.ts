import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable, Subject} from "rxjs/Rx";

import {PreloadResolver} from "../../preloader/services/preload-resolver";
import {ResolvedData} from "../../preloader/resolver/resolver-result";
import {ClientDataService} from "../services/client-data.service";

import {Client} from "../model/client";
import {ClientDetail} from "../model/client-detail";

@Injectable()
export class ClientDetailResolver implements PreloadResolver {

    constructor(private _data: ClientDataService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedData> {

        let id: string = route.params['id'];

        let client = this._data.getProvider<Client>(Client).repository.collection.index('id').getOne(id);

        let subject = new Subject<ResolvedData>();

        this._data.getProvider<ClientDetail>(ClientDetail).read({client_id: id})
            .then((data) => {

                if (!data.length) {
                    throw new Error(`Client detail resource for client ${id} not found`);
                } else if (data.length > 1) {
                    throw new Error(`Ambiguous client detail result for client ${id}`);
                }

                client.detail = data[0];

                setTimeout(() => {
                    subject.next({client: client});
                });
            });

        return subject.first();
    }
}
