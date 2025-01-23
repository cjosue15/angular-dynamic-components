import { NgComponentOutlet } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  inject,
  TemplateRef,
  Type,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CardComponent } from './dynamic-components/components/card.component';
import { ComponentA } from './ng-component-outlet/components/component-a';
import { ComponentB } from './ng-component-outlet/components/component-b';
import { ComponentC } from './ng-component-outlet/components/component-c';

interface DynamicComponent {
  id: string;
  inputs: Record<string, unknown>;
  content: string;
}

@Component({
  selector: 'app-root',
  template: `
    <main>
      @for (component of components(); track component) {
        <ng-container
          [ngComponentOutlet]="component.id"
          [ngComponentOutletInputs]="component.inputs"
          [ngComponentOutletContent]="getNodes(component.content)"
        />
      }

      <ng-template #template1>
        <p>Hi i'm the template 1</p>
      </ng-template>

      <ng-template #template2>
        <p>Hi i'm the template 2</p>
      </ng-template>
    </main>
  `,
  styleUrl: './app.component.css',
  imports: [NgComponentOutlet],
})
export class AppComponent {
  viewContainerRef = inject(ViewContainerRef);

  template1 = viewChild.required<TemplateRef<unknown>>('template1');
  template2 = viewChild.required<TemplateRef<unknown>>('template2');

  private http = inject(HttpClient);

  componentsMap: Record<string, Type<unknown>> = {
    ComponentA: ComponentA,
    ComponentB: ComponentB,
    ComponentC: ComponentC,
  };

  components = toSignal(
    this.http.get<DynamicComponent[]>('./components.json').pipe(
      map((components) =>
        components.map((c) => {
          return {
            ...c,
            id: this.componentsMap[c.id] ?? CardComponent,
          };
        }),
      ),
    ),
  );

  getNodes(content: string) {
    if (!content) return [];

    const templates: Record<string, TemplateRef<unknown> | undefined> = {
      'template-1': this.template1(),
      'template-2': this.template2(),
    };

    const template = this.viewContainerRef.createEmbeddedView(
      templates[content]!,
    );

    template.destroy();

    return [template.rootNodes];
  }
}
