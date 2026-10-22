import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonMenuButton,
  IonNote,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  busOutline,
  cafeOutline,
  cubeOutline,
  flashOutline,
  heartOutline,
  homeOutline,
} from 'ionicons/icons';
import {
  EXPENSE_CATEGORY_ICONS,
  EXPENSE_CATEGORIES,
  ExpenseCategory,
  ExpenseStore,
} from '../expense.store';

@Component({
  selector: 'app-expense',
  templateUrl: 'expense.page.html',
  styleUrls: ['expense.page.scss'],
  imports: [
    FormsModule,
    RouterLink,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonLabel,
    IonMenuButton,
    IonNote,
    IonTextarea,
    IonTitle,
    IonToolbar,
  ],
})
export class ExpensePage {
  private readonly store = inject(ExpenseStore);
  private readonly router = inject(Router);

  readonly categories = EXPENSE_CATEGORIES.filter((name) => name !== 'Ocio').map(
    (name) => ({
      name,
      icon: EXPENSE_CATEGORY_ICONS[name],
    }),
  );

  amount: string | number = '';
  description = '';
  selectedCategory: ExpenseCategory = 'Comida';
  date = this.today();
  notes = '';
  errorMessage = '';

  constructor() {
    addIcons({
      busOutline,
      cafeOutline,
      cubeOutline,
      flashOutline,
      heartOutline,
      homeOutline,
    });
  }

  saveExpense(): void {
    const parsedAmount = Number(this.amount);
    const description = this.description.trim();

    if (!description || !Number.isFinite(parsedAmount) || parsedAmount <= 0 || !this.date) {
      this.errorMessage = 'Completa la descripción, el monto y la fecha del gasto.';
      return;
    }

    this.store.addExpense({
      description,
      category: this.selectedCategory,
      amount: parsedAmount,
      dateLabel: this.dateLabel(),
      notes: this.notes.trim() || undefined,
    });
    void this.router.navigateByUrl('/home');
  }

  private today(): string {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
  }

  private dateLabel(): string {
    if (this.date === this.today()) {
      return 'Hoy';
    }

    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
    }).format(new Date(`${this.date}T12:00:00`));
  }
}
