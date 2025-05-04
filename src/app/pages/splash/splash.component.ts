import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonImg, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  imports: [IonContent, IonImg , CommonModule]
})
export class SplashComponent  implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit() {
    // Redirect to the landing page after 3 seconds
    setTimeout(() => {
      this.router.navigateByUrl('/landing');
    }, 3000);
  }

}
