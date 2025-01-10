import { Component, inject } from '@angular/core';
import { StepComponent } from './step.component';

@Component({
  selector: 'app-step-actions',
  template: ` <button (click)="next()">Next</button> `,
})
export class StepActionsComponent {
  parentComponent = inject(StepComponent);

  next() {
    this.parentComponent.next();
  }
}
