Angular 2, ES6 and RxJS skill tests 
===================================

## Requirements

* node 4.2.6
* npm 4.0.5

## Installation

    $ git clone git@github.com:pashamad/ng2-skill-tests.git
    $ cd ng2-skill-tests
    $ cp app/app.settings.ts.dist app/app.settings.ts
    $ ln -s .htaccess.dev .htaccess
    $ npm i
    $ npm start

## Tasks

#### 1. Implement authentication check by means of `login-modal` component

Location: `app/modules/security/services/auth.service#AuthService`

Two possible solutions available with two distinct login modal modes:

1. Static - login modal is hidden directly in template with *ngIf check of `authenticated` boolean value, which is actual value of `authenticated$` subject

2. Manual - login modal is hidden by subscribing to intermediate `authCheck$` observable

Notes:

> * The function of login modal component is to call `AuthService.login()` method upon clicking "Login" button and that must left intact
> * Any or both solutions can be implemented
> * Both methods must navigate to passed `redirect` url upon successful login


#### 2. Implement `PreloadResolve` decorator

Location: `app/modules/preloader/decorators/preload-resolve-decorator`

Intended decorator usage:

``` javascript

@PreloadResolve({
    providers: [
        ClientDataService
    ],
    resolvers: {
        detail: ClientDetailResolver
    }
})

```

Notes:

> * To achieve successful result, component `app/modules/client/components/client-detail.component#ClientDetailComponent` must be decorated with implemented `PreloadResolve` decorator
> * Decorator must register decorated component in `PreloaderRegistry` by passing target component class and config metadata object to `registerConsumer` method.
> * Config metadata object must be of type `PreloadResolveConfig`
> * Also, `PreloadResolve` resolve guard must be added to corresponding route in Angular module configuration
> * Successful result will force preload of client detail entity from datastore before creating `ClientDetailComponent` at [/clients/1]

