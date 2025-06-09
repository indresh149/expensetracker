export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
  createdAt: string;
}

export const EXPENSE_CATEGORIES = [
  { label: 'Food & Dining', value: 'food', color: '#EF4444' },
  { label: 'Transportation', value: 'transport', color: '#3B82F6' },
  { label: 'Shopping', value: 'shopping', color: '#8B5CF6' },
  { label: 'Entertainment', value: 'entertainment', color: '#EC4899' },
  { label: 'Bills & Utilities', value: 'bills', color: '#F59E0B' },
  { label: 'Healthcare', value: 'healthcare', color: '#10B981' },
  { label: 'Education', value: 'education', color: '#06B6D4' },
  { label: 'Other', value: 'other', color: '#6B7280' },
];