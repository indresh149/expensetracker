import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { Expense, EXPENSE_CATEGORIES } from '@/types/expense';

interface ExpenseCardProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

export default function ExpenseCard({ expense, onDelete }: ExpenseCardProps) {
  const category = EXPENSE_CATEGORIES.find(cat => cat.value === expense.category);
  const categoryColor = category?.color || '#6B7280';
  const categoryLabel = category?.label || 'Other';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <View style={[styles.categoryDot, { backgroundColor: categoryColor }]} />
        <View style={styles.expenseInfo}>
          <Text style={styles.categoryText}>{categoryLabel}</Text>
          <Text style={styles.dateText}>{formatDate(expense.date)}</Text>
          {expense.description && (
            <Text style={styles.descriptionText}>{expense.description}</Text>
          )}
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.amountText}>{formatAmount(expense.amount)}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(expense.id)}
        >
          <Trash2 size={16} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  expenseInfo: {
    flex: 1,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  descriptionText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#EF4444',
    marginBottom: 4,
  },
  deleteButton: {
    padding: 4,
  },
});