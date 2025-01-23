/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-component-a',
  template: `
    <div class="card">
      <h2>{{ title() }} - {{ description() }}</h2>

      <ng-content />
    </div>
  `,
})
export class ComponentA {
  title = input<string>('title');
  description = input<string>('description');
}
