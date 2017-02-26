import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {ResolvedData} from "../resolver/resolver-result";

export interface PreloadResolver extends Resolve<ResolvedData> {

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedData>;
}
