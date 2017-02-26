import {Type} from "@angular/core";

import {
    AbstractClassDecorator,
    ClassDecoratorFactory
} from "../../../generic/decorators/class-decorator-factory";

import {PreloaderRegistry} from "../services/preloader-registry";
import {PreloadResolver} from "../services/preload-resolver";
import {AbstractDataService} from "../../datastore/provider/data-service";
import {ResolveContextAwareInterface} from "../adapter/context-aware";

/**
 * @todo Implement `PreloadResolve` decorator
 *
 * Intended decorator usage:
 *
 * ``` javascript
 *
 * @PreloadResolve({
 *     providers: [
 *         ClientDataService
 *     ],
 *     resolvers: {
 *         detail: ClientDetailResolver
 *     }
 * })
 *
 * ```
 *
 * Decorator must register decorated component in `PreloaderRegistry` by passing target class and config metadata object to `registerConsumer` method.
 * Config metadata object must be of type `PreloadResolveConfig`.
 * Also, `PreloadResolve` resolve guard must be added to corresponding route in Angular module configuration.
 * Successful result will force preload of client detail entity before creating `ClientDetailComponent` at {/clients/1}.
 */

export interface PreloadResolveConfig {
    providers?: Array<typeof AbstractDataService>;
    resolvers?: {[key: string]: Type<PreloadResolver>};
}
