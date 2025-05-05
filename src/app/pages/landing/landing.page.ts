import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, Observable } from 'rxjs';
import { 
  IonContent, 
  IonHeader, 
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonButton, 
  IonIcon,
} from '@ionic/angular/standalone';

import { CatService } from '@models/cats/cat.service';
import { CatStateService } from '@models/cats/cat-state.service';
import { CatBreed, CatSearchParams } from '@models/cats/cat.model';
import { MoleculeCardCatComponent } from '@shared/molecules/molecule-card-cat/molecule-card-cat.component';
import { MoleculeHeaderSearchComponent } from '@shared/molecules/molecule-header-search/molecule-header-search.component';
import { AtomLoadingComponent } from '@shared/atoms/atom-loading/atom-loading.component';
import { MoleculeImageModalComponent } from '@shared/molecules/molecule-image-modal/molecule-image-modal.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    AtomLoadingComponent,
    MoleculeCardCatComponent,
    MoleculeHeaderSearchComponent,
    MoleculeImageModalComponent,
  ]
})
export class LandingPage implements OnInit {
  breeds: CatBreed[] = [];
  searchTerm: string = '';
  loading: boolean = true;
  error: string = '';

  isExpandedView: boolean = true;
  breed: CatBreed | null = null;
  image: string = '';
  @ViewChild('imageModal') imageModal!: MoleculeImageModalComponent;

  formSearch!: FormGroup;

  constructor(
    private readonly catService: CatService,
    private readonly catStateService: CatStateService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {
    this.formSearch = this.formBuilder.group({
      searchTerm: [''],
    });

    this.initSearch();
  }

  /**
   * Initializes the search functionality by subscribing to form value changes
   * Triggers breed search after 300ms debounce when search term changes
   */
  initSearch() {
    this.formSearch.valueChanges
    .pipe(
      debounceTime(300),
    )
    .subscribe((value) => {
      if(value.searchTerm) {
        this.loadQueryBreeds(value.searchTerm);
      }else{
        this.loadBreeds();
      }
    });
  }

  /**
   * Lifecycle hook that loads all breeds when component initializes
   */
  ngOnInit() {
    this.loadBreeds();
  }

  /**
   * Handles the response from breed-related API calls
   * Sets loading state and manages error handling
   * @param observable - Observable that returns an array of cat breeds
   * @returns Subscription to the breeds observable
   */
  private handleBreedsResponse(observable: Observable<CatBreed[]>) {
    this.loading = true;
    this.error = '';
    
    return observable.subscribe({
      next: (data) => {
        this.breeds = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching cat breeds:', err);
        this.error = 'No se pudieron cargar las razas de gatos. Intente de nuevo más tarde.';
        this.loading = false;
      }
    });
  }

  /**
   * Loads all available cat breeds
   */
  loadBreeds() {
    this.handleBreedsResponse(this.catService.getAllBreeds());
  }

  /**
   * Loads cat breeds that match the search query
   * @param query - Search term to filter breeds
   */
  loadQueryBreeds(query: string) {
    const params: CatSearchParams = { query };
    this.handleBreedsResponse(this.catService.searchBreeds(params));
  }

  /**
   * Navigates to the detail page for a specific breed
   * @param breed - Cat breed to show details for
   */
  goToDetail(breed: CatBreed) {
    this.catStateService.setSelectedBreed(breed);
    this.router.navigate(['/detail', breed.id]);
  }

  /**
   * Opens the image modal for a specific breed
   * @param breed - Cat breed whose image should be displayed
   */
  openImage(breed: CatBreed){
    this.breed = breed;
    this.image = breed.image?.url ?? '';
    this.imageModal.openModal();
  }
}
