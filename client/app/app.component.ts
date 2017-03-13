import { Component } from '@angular/core';
declare var module: { id: string; }

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent { }
