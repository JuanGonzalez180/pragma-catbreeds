import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-atom-expand-button',
  template: `
    <ion-button class="atom-expand__button" fill="clear" (click)="onClick()">
      <ion-icon class="atom-expand__icon" name="expand-outline"></ion-icon>
    </ion-button>
  `,
  styleUrls: ['./atom-expand-button.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButton, IonIcon]
})
export class AtomExpandButtonComponent {
  /**
   * Event emitter that fires when the expand button is clicked
   */
  @Output() expand = new EventEmitter<void>();

  /**
   * Handles the click event on the expand button
   * Emits an event to notify parent components
   */
  onClick(): void {
    this.expand.emit();
  }
}