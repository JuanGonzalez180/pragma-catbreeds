import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonButtons,
  IonBackButton,
  IonText,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { CatBreed } from '@models/cats/cat.model';
import { ActivatedRoute } from '@angular/router';
import { CatService } from '@models/cats/cat.service';
import { CatStateService } from '@models/cats/cat-state.service';
import { AtomLoadingComponent } from '@shared/atoms/atom-loading/atom-loading.component';
import { MoleculeImageModalComponent } from '@shared/molecules/molecule-image-modal/molecule-image-modal.component';
import { IBreedCharacteristic } from '@shared/molecules/molecule-breed-characteristics/molecule-breed-characteristics.model';
import { MoleculeBreedCharacteristicsComponent } from '@shared/molecules/molecule-breed-characteristics/molecule-breed-characteristics.component';
import { AtomExpandButtonComponent } from '@shared/atoms/atom-expand-button/atom-expand-button.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons,
    IonBackButton,
    IonText,
    IonImg,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    CommonModule, 
    FormsModule,
    AtomLoadingComponent,
    AtomExpandButtonComponent,
    MoleculeImageModalComponent,
    MoleculeBreedCharacteristicsComponent,
  ]
})
export class DetailPage implements OnInit {
  breedId: string = '';
  breed: CatBreed | null = null;
  loading: boolean = true;
  error: string = '';
  image: string = '';
  breedCharacteristics: IBreedCharacteristic[] = [];
  
  @ViewChild('imageModal') imageModal!: MoleculeImageModalComponent;
  
  constructor(
    private readonly route: ActivatedRoute,
    private readonly catService: CatService,
    private readonly catStateService: CatStateService,
    private readonly navCtrl: NavController
  ) { }

  /**
   * Initializes the component by getting the breed ID from route params
   * and loading the breed details if a valid ID is present
   */
  ngOnInit() {
    this.breedId = this.route.snapshot.paramMap.get('id') ?? '';
    const selectedBreed = this.catStateService.getSelectedBreed();

    if (selectedBreed && selectedBreed.id === this.breedId) {
      this.image = selectedBreed.image?.url ?? '';
    }
    
    if (this.breedId) {
      this.loadBreedDetails();
    } else {
      this.error = 'ID de raza no válido';
      this.loading = false;
    }
  }

  /**
   * Loads the breed details from the cat service using the breed ID
   * Updates the component state with the fetched data
   */
  loadBreedDetails() {
    this.loading = true;
    this.catService.getBreedById(this.breedId).subscribe({
      next: (data) => {
        this.breed = data;
        this.loading = false;
        this.loadingCharacteristics();
      },
      error: (err) => {
        console.error('Error fetching breed details:', err);
        this.error = 'No se pudieron cargar los detalles de la raza. Intente de nuevo más tarde.';
        this.loading = false;
      }
    });
  }

  /**
   * Navigates back to the previous page
   */
  goBack() {
    this.navCtrl.back();
  }

  /**
   * Converts a number to an array of that length
   * Used for displaying rating stars/icons
   * @param level - The number to convert to array
   * @returns An array filled with zeros of the specified length
   */
  getNumberToArray(level: number | undefined): number[] {
    return Array(level).fill(0);
  }

  /**
   * Opens the image modal to display the breed image in full size
   */
  async openImageModal() {
    this.imageModal.openModal();
  }

  /**
   * Loads the breed characteristics into the component state
   * Creates an array of characteristic objects with labels and values
   */
  loadingCharacteristics(){
    this.breedCharacteristics = [];
    if (!this.breed) return;

    this.breedCharacteristics = [
      {
        label: 'País de origen',
        value: this.breed.origin,
        type: 'text'
      },
      {
        label: 'Temperamento',
        value: this.breed.temperament,
        type: 'text'
      },
      {
        label: 'Tiempo de vida',
        value: `${this.breed.life_span} años`,
        type: 'text'
      },
      {
        label: 'Adaptabilidad',
        valueNumber: this.breed.adaptability ?? 0,
        type: 'stars',
        maxValue: 5
      },
      {
        label: 'Inteligencia',
        valueNumber: this.breed.intelligence,
        type: 'bulbs',
        maxValue: 5
      }
    ]
  }
}
