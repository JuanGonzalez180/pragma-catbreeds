import { Injectable, signal } from '@angular/core';
import { CatBreed } from '@models/cats/cat.model';

@Injectable({
  providedIn: 'root',
})
export class CatStateService {
  private readonly selectedBreed = signal<CatBreed | null>(null);

  /**
   * Sets the currently selected cat breed
   * @param breed The cat breed to be set as selected
   */
  setSelectedBreed(breed: CatBreed): void {
    this.selectedBreed.set(breed);
  }

  /**
   * Gets the currently selected cat breed
   * @returns The currently selected cat breed or null if none is selected
   */
  getSelectedBreed(): CatBreed | null {
    return this.selectedBreed();
  }

  /**
   * Clears the currently selected cat breed by setting it to null
   */
  clearSelectedBreed(): void {
    this.selectedBreed.set(null);
  }
}
