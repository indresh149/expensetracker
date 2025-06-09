import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Trash2, RefreshCw } from 'lucide-react-native';
import ExpenseCard from '@/components/ExpenseCard';
import ExpenseSummary from '@/components/ExpenseSummary';
import { ExpenseStorage } from '@/utils/storage';
import { Expense } from '@/types/expense';

export default function ViewExpensesScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadExpenses = async () => {
    try {
      const loadedExpenses = await ExpenseStorage.getExpenses();
      // Sort by date (newest first)
      const sortedExpenses = loadedExpenses.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setExpenses(sortedExpenses);
    } catch (error) {
      Alert.alert('Error', 'Failed to load expenses');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadExpenses();
    setRefreshing(false);
  };

  // Reload expenses when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, [])
  );

  const handleDeleteExpense = (id: string) => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await ExpenseStorage.deleteExpense(id);
              await loadExpenses();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete expense');
            }
          },
        },
      ]
    );
  };

  const handleClearAllExpenses = () => {
    if (expenses.length === 0) return;

    Alert.alert(
      'Clear All Expenses',
      'Are you sure you want to delete all expenses? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await ExpenseStorage.clearAllExpenses();
              await loadExpenses();
            } catch (error) {
              Alert.alert('Error', 'Failed to clear expenses');
            }
          },
        },
      ]
    );
  };

  const renderExpenseItem = ({ item }: { item: Expense }) => (
    <ExpenseCard expense={item} onDelete={handleDeleteExpense} />
  );

  const renderHeader = () => (
    <View>
      <ExpenseSummary expenses={expenses} />
      {expenses.length > 0 && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.clearButton} onPress={handleClearAllExpenses}>
            <Trash2 size={16} color="#FFFFFF" />
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.sectionTitle}>Recent Expenses</Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No expenses yet</Text>
      <Text style={styles.emptySubtitle}>
        Start tracking your expenses by adding your first one!
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Expenses</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
          <RefreshCw size={20} color="#2563EB" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={expenses.length > 0 ? renderHeader : null}
        ListEmptyComponent={!isLoading ? renderEmptyState : null}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#2563EB"
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  refreshButton: {
    padding: 8,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 6,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});