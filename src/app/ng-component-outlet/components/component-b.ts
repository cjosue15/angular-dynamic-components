/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-component-b',
  template: `
    <div class="card">
      <h2>User List</h2>

      <ul>
        @for (user of users(); track user) {
          <li>{{ user }}</li>
        }
      </ul>

      <ng-content />
    </div>
  `,
})
export class ComponentB {
  users = input<string[]>([]);
}
