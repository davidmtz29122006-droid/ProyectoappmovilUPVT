import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { walletOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  imports: [
    FormsModule,
    RouterLink,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonMenuButton,
    IonTitle,
    IonToolbar,
  ],
})
export class LoginPage {
  private readonly router = inject(Router);

  email = '';
  password = '';

  constructor() {
    addIcons({ walletOutline });
  }

  openDashboard(): void {
    void this.router.navigateByUrl('/home');
  }
}
