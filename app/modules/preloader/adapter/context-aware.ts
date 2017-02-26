import {ActivatedRoute} from "@angular/router";

import {HasClassMetadata, ClassMetadataAwareInterface} from "../../../generic/decorators/class-decorator-factory";
import {ResolveContext} from "../resolver/resolve-context";

export class ResolveContextAware extends HasClassMetadata implements ResolveContextAwareInterface {

    private __resolveContext: ResolveContext;

    constructor(route: ActivatedRoute) {
        super();
        this.__resolveContext = route.snapshot.data['preload'];
    }

    getResolveContext(): ResolveContext {
        return this.__resolveContext;
    }

}

export interface ResolveContextAwareInterface extends ClassMetadataAwareInterface {

    getResolveContext(): ResolveContext;
}
