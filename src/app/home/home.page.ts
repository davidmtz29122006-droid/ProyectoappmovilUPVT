import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  add,
  busOutline,
  cafeOutline,
  happyOutline,
  heartOutline,
  homeOutline,
} from 'ionicons/icons';
import {
  EXPENSE_CATEGORY_ICONS,
  ExpenseCategory,
  ExpenseStore,
} from '../expense.store';

const CATEGORY_ORDER: ReadonlyArray<{
  name: ExpenseCategory;
  icon: string;
}> = [
  { name: 'Comida', icon: 'cafe-outline' },
  { name: 'Transporte', icon: 'bus-outline' },
  { name: 'Vivienda', icon: 'home-outline' },
  { name: 'Ocio', icon: 'happy-outline' },
];

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CurrencyPipe,
    IonButtons,
    IonCard,
    IonCardContent,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonProgressBar,
    IonTitle,
    IonToolbar,
  ],
})
export class HomePage {
  readonly store = inject(ExpenseStore);
  readonly monthlyTotal = this.store.monthlyTotal;
  readonly recentExpenses = computed(() => this.store.recentExpenses().slice(0, 5));
  readonly remainingBudget = computed(() =>
    Math.max(0, this.store.monthlyBudget - this.monthlyTotal()),
  );
  readonly budgetProgress = computed(() =>
    Math.min(1, this.monthlyTotal() / this.store.monthlyBudget),
  );
  readonly categories = computed(() =>
    CATEGORY_ORDER.map((category) => {
      const amount = this.store.categoryTotals()[category.name];
      return { ...category, amount, progress: amount / 1800 };
    }),
  );
  readonly monthLabel = new Intl.DateTimeFormat('es-MX', {
    month: 'long',
    year: 'numeric',
  })
    .format(new Date())
    .replace(/^./u, (letter) => letter.toLocaleUpperCase('es-MX'));

  constructor() {
    addIcons({
      add,
      busOutline,
      cafeOutline,
      happyOutline,
      heartOutline,
      homeOutline,
    });
  }

  categoryIcon(category: ExpenseCategory): string {
    return EXPENSE_CATEGORY_ICONS[category];
  }
}
