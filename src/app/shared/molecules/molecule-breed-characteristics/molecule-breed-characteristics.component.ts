import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonText
} from '@ionic/angular/standalone';
import { IMoleculeBreedCharacteristics, IBreedCharacteristic } from './molecule-breed-characteristics.model';

@Component({
  selector: 'app-molecule-breed-characteristics',
  templateUrl: './molecule-breed-characteristics.component.html',
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonText
  ]
})
export class MoleculeBreedCharacteristicsComponent implements IMoleculeBreedCharacteristics {
  @Input() title: string = '';
  @Input() characteristics: IBreedCharacteristic[] = [];

  /**
   * Converts a number into an array of that length filled with zeros
   * @param level - The number to convert into array length
   * @returns An array of zeros with the specified length
   */
  getNumberToArray(level: number | undefined): number[] {
    return Array(level).fill(0);
  }
}