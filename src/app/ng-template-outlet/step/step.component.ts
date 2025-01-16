/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  inject,
  Injector,
  input,
  signal,
  TemplateRef,
} from '@angular/core';

export interface Step {
  id: number;
  text: string;
}

@Component({
  selector: 'app-step',
  template: `
    <div>
      <!-- header -->
      <header>
        <ng-container [ngTemplateOutlet]="headerTemplate() || headerDefault" />
      </header>

      <ng-template #headerDefault>
        <h1>Titulo</h1>
      </ng-template>

      <!-- body -->
      <div>
        @for (step of steps(); track step; let i = $index) {
          @if (this.currentStep() === i) {
            <ng-container
              [ngTemplateOutlet]="bodyTemplate() || body"
              [ngTemplateOutletContext]="{
                $implicit: i,
                step: step,
              }"
            />
          }
        }
      </div>

      <ng-template #body let-index let-item="step">
        <ul>
          <li>{{ item.id }} - index :{{ index }}</li>
          <li>{{ item.text }}</li>
        </ul>
      </ng-template>

      <!-- footer -->
      <footer>
        <ng-container
          [ngTemplateOutlet]="footerTemplate() || footerDefault"
          [ngTemplateOutletInjector]="injector"
        />
      </footer>

      <ng-template #footerDefault>
        <button (click)="previous()">Atras</button>
        <button (click)="next()">Siguiente</button>
      </ng-template>
    </div>
  `,
  imports: [NgTemplateOutlet],
})
export class StepComponent {
  headerTemplate = input<TemplateRef<any>>();

  bodyTemplate = input<TemplateRef<any>>();

  footerTemplate = input<TemplateRef<any>>();

  steps = input.required<Step[]>();

  currentStep = signal(0);

  injector = inject(Injector);

  next() {
    if (this.currentStep() === this.steps().length - 1) return;

    this.currentStep.update((i) => i + 1);
  }

  previous() {
    if (this.currentStep() === 0) return;

    this.currentStep.update((i) => i - 1);
  }
}
