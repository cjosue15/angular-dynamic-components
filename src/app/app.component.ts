import {
  Component,
  ComponentRef,
  inject,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { CardComponent } from './dynamic-components/components/card.component';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <button (click)="createComponent()">Create component</button>
      <button (click)="removeComponent()" class="secondary">
        Remove component
      </button>
    </header>

    <main>
      <!-- <app-card /> -->

      <!-- <app-card>  </app-card> -->
      <ng-container #container />

      <ng-template #content>
        <p>Hi i'm the content</p>
      </ng-template>
    </main>
  `,
  styleUrl: './app.component.css',
  imports: [CardComponent],
})
export class AppComponent {
  ref = inject(ViewContainerRef);

  container = viewChild.required('container', { read: ViewContainerRef });

  content = viewChild.required<TemplateRef<unknown>>('content');

  componentRef!: ComponentRef<CardComponent>;

  createComponent() {
    const template = this.container().createEmbeddedView(this.content());

    this.componentRef = this.container().createComponent(CardComponent, {
      projectableNodes: [template.rootNodes],
    });

    this.componentRef.setInput('title', 'New title');

    this.componentRef.instance.remove.subscribe(() => {
      this.componentRef.destroy();
    });

    // setTimeout(() => {
    //   this.componentRef.destroy();
    // }, 2000);
  }

  removeComponent() {
    this.container().remove(1);
  }
}
