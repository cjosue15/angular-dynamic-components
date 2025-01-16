import { Component, signal } from '@angular/core';
import { StepActionsComponent } from './step/step-actions.component';
import { Step, StepComponent } from './step/step.component';

@Component({
  selector: 'app-root',
  template: `
    <app-step
      [steps]="steps()"
      [headerTemplate]="header"
      [bodyTemplate]="body"
      [footerTemplate]="footer"
    />

    <ng-template #header>
      <h2>Custom title</h2>
    </ng-template>

    <ng-template #body let-index let-step="step">
      <span
        >ID: {{ step.id }} - index :{{ index }} - text: {{ step.text }}</span
      >
    </ng-template>

    <ng-template #footer>
      <app-step-actions />
    </ng-template>

    <app-step [steps]="steps()" />
  `,
  imports: [StepComponent, StepActionsComponent],
  styleUrl: '../app.component.css',
})
export class AppComponent {
  steps = signal<Step[]>([
    {
      id: 1,
      text: 'Este es el primer step.',
    },
    {
      id: 2,
      text: 'Este es el segundo step.',
    },
    {
      id: 3,
      text: 'Este es el tercer step.',
    },
  ]);
}
