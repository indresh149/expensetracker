import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Expense, EXPENSE_CATEGORIES } from '@/types/expense';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export default function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getCategoryLabel = (categoryValue: string) => {
    return EXPENSE_CATEGORIES.find(cat => cat.value === categoryValue)?.label || 'Other';
  };

  const getCategoryColor = (categoryValue: string) => {
    return EXPENSE_CATEGORIES.find(cat => cat.value === categoryValue)?.color || '#6B7280';
  };

  return (
    <View style={styles.container}>
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total Expenses</Text>
        <Text style={styles.totalAmount}>{formatAmount(totalAmount)}</Text>
        <Text style={styles.expenseCount}>{expenses.length} expenses</Text>
      </View>
      
      {topCategories.length > 0 && (
        <View style={styles.categoriesCard}>
          <Text style={styles.categoriesTitle}>Top Categories</Text>
          {topCategories.map(([category, amount]) => (
            <View key={category} style={styles.categoryRow}>
              <View style={styles.categoryInfo}>
                <View style={[
                  styles.categoryDot,
                  { backgroundColor: getCategoryColor(category) }
                ]} />
                <Text style={styles.categoryName}>{getCategoryLabel(category)}</Text>
              </View>
              <Text style={styles.categoryAmount}>{formatAmount(amount)}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  totalCard: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: '#BFDBFE',
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  expenseCount: {
    fontSize: 14,
    color: '#BFDBFE',
  },
  categoriesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  categoriesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#6B7280',
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
});