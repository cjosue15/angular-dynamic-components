import { Component, Input, input, OnDestroy, output } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="title">
      <h2>{{ title() }}</h2>

      <button (click)="deleteCard()">Remove</button>
    </div>
    <p>{{ description }}</p>

    <ng-content />
  `,
})
export class CardComponent implements OnDestroy {
  title = input<string>('View Component');

  @Input() description = 'This is the view component';

  remove = output();

  deleteCard() {
    this.remove.emit();
  }

  ngOnDestroy() {
    console.log('destroy');
  }
}
