import {Component, Input, Output, EventEmitter} from '@angular/core';
declare var module: { id: string; }  

@Component({
  moduleId: module.id,
  selector: 'rating',
  template: `
    <span tabindex="0">
      <template ngFor let-item [ngForOf]="range" let-index="index">
        <span class="sr-only">({{ index < rate ? '*' : ' ' }})</span>
        <i class="glyphicon" (click)="update(index + 1)"
           [ngClass]="index < rate ? 'glyphicon-star' : 'glyphicon-star-empty'"></i>
      </template>
    </span>
  `,
  inputs: ['rate', 'readOnly'],
  outputs: ['updateRate: rateChange']
})

export class Rating {

    private updateRate = new EventEmitter();
    private range:Array<number> = [1,2,3,4,5];
    private readOnly: Boolean = false;

    private rate:number;

  update(value) {

    if(!this.readOnly) { 
        this.rate = value;
        this.updateRate.next(value);
    }

  }
} 