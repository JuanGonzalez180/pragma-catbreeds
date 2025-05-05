import { FormGroup } from '@angular/forms';

export interface IMoleculeHeaderSearch {
  formGroup: FormGroup;
  controlName: string;
  title?: string;
  placeholder?: string;
}