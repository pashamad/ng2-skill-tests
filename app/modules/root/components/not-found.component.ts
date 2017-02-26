import {Component} from '@angular/core';

@Component({
    selector: 'page-not-found',
    template: `
<h1>Page not found</h1>
<a routerLink="/">Home</a>
`
})
export class NotFoundComponent {
    constructor() {
    }
}
