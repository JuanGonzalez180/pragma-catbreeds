import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonImg
} from '@ionic/angular/standalone';
import { CatBreed } from '@models/cats/cat.model';
import { AtomExpandButtonComponent } from '@shared/atoms/atom-expand-button/atom-expand-button.component';

@Component({
  selector: 'app-molecule-card-cat',
  templateUrl: './molecule-card-cat.component.html',
  styleUrls: ['./molecule-card-cat.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonImg,
    AtomExpandButtonComponent,
  ]
})
export class MoleculeCardCatComponent {
  @Input() isExpanded: boolean = false;
  @Input() breed!: CatBreed;
  @Output() cardClick = new EventEmitter<CatBreed>();
  @Output() cardImageClick = new EventEmitter<CatBreed>();

  onCardClick(): void {
    this.cardClick.emit(this.breed);
  }
  
  onCardImageClick(): void {
    this.cardImageClick.emit(this.breed);
  }
}