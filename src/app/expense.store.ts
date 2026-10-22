import { Injectable, signal } from '@angular/core';

export const EXPENSE_CATEGORIES = [
  'Comida',
  'Transporte',
  'Vivienda',
  'Servicios',
  'Salud',
  'Ocio',
  'Otros',
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export const EXPENSE_CATEGORY_ICONS: Readonly<Record<ExpenseCategory, string>> = {
  Comida: 'cafe-outline',
  Transporte: 'bus-outline',
  Vivienda: 'home-outline',
  Servicios: 'flash-outline',
  Salud: 'heart-outline',
  Ocio: 'happy-outline',
  Otros: 'cube-outline',
};

export interface ExpenseRecord {
  description: string;
  category: ExpenseCategory;
  amount: number;
  dateLabel: string;
  notes?: string;
}

@Injectable({ providedIn: 'root' })
export class ExpenseStore {
  readonly monthlyBudget = 6500;
  readonly monthlyTotal = signal(4820);
  readonly categoryTotals = signal<Record<ExpenseCategory, number>>({
    Comida: 1240,
    Transporte: 680,
    Vivienda: 1800,
    Servicios: 550,
    Salud: 210,
    Ocio: 340,
    Otros: 0,
  });
  readonly recentExpenses = signal<ExpenseRecord[]>([
    { description: 'Supermercado La Comer', category: 'Comida', amount: 320, dateLabel: 'Hoy' },
    { description: 'Metro / Camión', category: 'Transporte', amount: 185, dateLabel: 'Hoy' },
    { description: 'Netflix · Disney+', category: 'Ocio', amount: 95, dateLabel: 'Ayer' },
    { description: 'Renta departamento', category: 'Vivienda', amount: 640, dateLabel: '28 Sep' },
    { description: 'Farmacia Guadalajara', category: 'Salud', amount: 210, dateLabel: '27 Sep' },
  ]);

  addExpense(expense: ExpenseRecord): void {
    this.recentExpenses.update((expenses) => [expense, ...expenses]);
    this.monthlyTotal.update((total) => total + expense.amount);
    this.categoryTotals.update((totals) => ({
      ...totals,
      [expense.category]: totals[expense.category] + expense.amount,
    }));
  }
}
