import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonModal,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonImg
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-molecule-image-modal',
  templateUrl: './molecule-image-modal.component.html',
  styleUrls: ['./molecule-image-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonModal,
    IonContent,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonImg
  ]
})
export class MoleculeImageModalComponent {
  @ViewChild('modal') modal!: IonModal;
  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() imageAlt: string = '';

  isModalOpen = false;

  /**
   * Opens the modal by setting isModalOpen flag to true
   */
  async openModal() {
    this.isModalOpen = true;
  }

  /**
   * Dismisses the modal by calling the modal's dismiss method
   * and setting isModalOpen flag to false
   */
  dismiss() {
    this.modal.dismiss();
    this.isModalOpen = false;
  }
}