import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { 
  IonToolbar,
  IonTitle,
  IonSearchbar
} from '@ionic/angular/standalone';
import { IMoleculeHeaderSearch } from './molecule-header-search.model';

@Component({
  selector: 'app-molecule-header-search',
  templateUrl: './molecule-header-search.component.html',
  styleUrls: ['./molecule-header-search.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonToolbar,
    IonTitle,
    IonSearchbar
  ]
})
export class MoleculeHeaderSearchComponent implements IMoleculeHeaderSearch {
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() title: string = '';
  @Input() placeholder: string = '';
}