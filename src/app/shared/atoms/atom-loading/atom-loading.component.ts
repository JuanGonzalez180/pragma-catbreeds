import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonSpinner } from '@ionic/angular/standalone';

/**
 * Component that displays a loading spinner with an optional message
 */
@Component({
  selector: 'app-atom-loading',
  template: `
    <div class="ion-padding ion-text-center">
      <ion-spinner></ion-spinner>
      <p>{{ message }}</p>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, IonSpinner]
})
export class AtomLoadingComponent {
  /**
   * Message to display below the spinner
   * @default 'Loading...'
   */
  @Input() message: string = 'Loading...';
}