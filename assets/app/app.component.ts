import {Component} from 'angular2/core';
import {TableListComponent} from './table-list.component'

@Component({
    selector: 'my-app',
    template: `
    <h1>My First Angular 2 Application . . done</h1>
    <hr />
    <table-list></table-list>
    <hr />
    `,
    directives: ['TableListComponent']
})

export class AppComponent {
}
