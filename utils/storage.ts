import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense } from '@/types/expense';

const EXPENSES_KEY = 'expenses';

export const ExpenseStorage = {
  async getExpenses(): Promise<Expense[]> {
    try {
      const expenses = await AsyncStorage.getItem(EXPENSES_KEY);
      return expenses ? JSON.parse(expenses) : [];
    } catch (error) {
      console.error('Error loading expenses:', error);
      return [];
    }
  },

  async saveExpense(expense: Expense): Promise<void> {
    try {
      const expenses = await this.getExpenses();
      expenses.push(expense);
      await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving expense:', error);
      throw error;
    }
  },

  async deleteExpense(id: string): Promise<void> {
    try {
      const expenses = await this.getExpenses();
      const filteredExpenses = expenses.filter(expense => expense.id !== id);
      await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(filteredExpenses));
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  },

  async clearAllExpenses(): Promise<void> {
    try {
      await AsyncStorage.removeItem(EXPENSES_KEY);
    } catch (error) {
      console.error('Error clearing expenses:', error);
      throw error;
    }
  }
};