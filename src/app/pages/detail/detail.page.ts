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
  IonSpinner,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonIcon, 
  IonModal,
  IonButton, 
  IonToolbar
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { CatBreed } from '@models/cats/cat.model';
import { ActivatedRoute } from '@angular/router';
import { CatService } from '@models/cats/cat.service';
import { CatStateService } from '@models/cats/cat-state.service';

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
    IonSpinner,
    IonImg,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonModal,
    IonButton,
    CommonModule, 
    FormsModule,
  ]
})
export class DetailPage implements OnInit {
  breedId: string = '';
  breed: CatBreed | null = null;
  loading: boolean = true;
  error: string = '';
  image: string = '';
  @ViewChild('modal') modal!: IonModal;
  
  constructor(
    private readonly route: ActivatedRoute,
    private readonly catService: CatService,
    private readonly catStateService: CatStateService,
    private readonly navCtrl: NavController
  ) { }

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

  loadBreedDetails() {
    this.loading = true;
    this.catService.getBreedById(this.breedId).subscribe({
      next: (data) => {
        this.breed = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching breed details:', err);
        this.error = 'No se pudieron cargar los detalles de la raza. Intente de nuevo más tarde.';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  getNumberToArray(level: number | undefined): number[] {
    return Array(level).fill(0);
  }

  async openImageModal() {
    await this.modal.present();
  }
}
