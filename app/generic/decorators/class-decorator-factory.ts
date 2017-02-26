import {Type} from "@angular/core";

/**
 * ClassDecoratorFactory
 */
export class ClassDecoratorFactory {

    public static decorator(decoratorClass: typeof AbstractClassDecorator): (config?: any) => any {
        return function (config?: any): any {
            return function (target: any): void {
                ClassDecoratorFactory.decorate(target, config, decoratorClass);
            }
        }
    }

    public static decorate(target: any, config: any, decoratorClass: typeof AbstractClassDecorator): void {
        new decoratorClass(target, config, decoratorClass.CONFIG_METADATA_KEY);
    }
}

export class AbstractClassDecorator<T extends ClassMetadataAwareInterface, C> {

    static readonly CONFIG_METADATA_KEY: string = 'DefaultClassMetadata';

    constructor(protected _target: Type<T>, protected _config: C, protected _metadataKey: string) {
        this._decorate();
    }

    protected _decorate(): void {
        Reflect.defineMetadata(this._metadataKey, this._config, this._target);
    }
}

export interface ClassMetadataAwareInterface {
    getClassMetadata(key: string): any;
}

export class HasClassMetadata implements ClassMetadataAwareInterface {

    getClassMetadata(key: string): any {
        return Reflect.getMetadata(key, this.constructor);
    }
}
