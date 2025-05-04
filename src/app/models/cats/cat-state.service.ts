import { Injectable, signal } from '@angular/core';
import { CatBreed } from '@models/cats/cat.model';

@Injectable({
  providedIn: 'root'
})
export class CatStateService {
  private readonly selectedBreed = signal<CatBreed | null>(null);
  
  setSelectedBreed(breed: CatBreed): void {
    this.selectedBreed.set(breed);
  }
  
  getSelectedBreed(): CatBreed | null {
    return this.selectedBreed();
  }
  
  clearSelectedBreed(): void {
    this.selectedBreed.set(null);
  }
}