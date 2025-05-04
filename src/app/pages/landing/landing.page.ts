import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonImg,
  IonSearchbar, 
  IonSpinner,
  IonText,
  IonTitle, 
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';

import { CatService } from '@models/cats/cat.service';
import { CatStateService } from '@models/cats/cat-state.service';
import { CatBreed, CatSearchParams } from '@models/cats/cat.model';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonImg,
    IonSearchbar, 
    IonSpinner,
    IonText,
    IonTitle, 
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LandingPage implements OnInit {
  breeds: CatBreed[] = [];
  searchTerm: string = '';
  loading: boolean = true;
  error: string = '';

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

    this.search();
  }

  search() {
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

  ngOnInit() {
    this.loadBreeds();
  }

  loadBreeds() {
    this.loading = true;
    this.catService.getAllBreeds().subscribe({
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

  loadQueryBreeds(query: string) {
    const params: CatSearchParams = { query };

    this.loading = true;
    this.catService.searchBreeds(params).subscribe({
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

  goToDetail(breed: CatBreed) {
    this.catStateService.setSelectedBreed(breed);
    this.router.navigate(['/detail', breed.id]);
  }

}
