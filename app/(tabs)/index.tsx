import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { DollarSign, FileText } from 'lucide-react-native';
import CategoryPicker from '@/components/CategoryPicker';
import DatePicker from '@/components/DatePicker';
import { ExpenseStorage } from '@/utils/storage';
import { Expense } from '@/types/expense';

export default function AddExpenseScreen() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!amount.trim() || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!category) {
      newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddExpense = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const newExpense: Expense = {
        id: Date.now().toString(),
        amount: parseFloat(amount),
        category,
        date: date.toISOString(),
        description: description.trim() || undefined,
        createdAt: new Date().toISOString(),
      };

      await ExpenseStorage.saveExpense(newExpense);

      // Reset form
      setAmount('');
      setCategory('');
      setDate(new Date());
      setDescription('');
      setErrors({});

      Alert.alert('Success', 'Expense added successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add expense. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Add New Expense</Text>
            <Text style={styles.subtitle}>Track your spending easily</Text>
          </View>

          <View style={styles.form}>
            {/* Amount Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Amount</Text>
              <View style={[styles.inputWrapper, errors.amount && styles.inputError]}>
                <DollarSign size={20} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0.00"
                  keyboardType="numeric"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}
            </View>

            {/* Category Picker */}
            <View style={[styles.categoryContainer, errors.category && styles.categoryError]}>
              <CategoryPicker
                selectedCategory={category}
                onCategoryChange={setCategory}
              />
              {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
            </View>

            {/* Date Picker */}
            <DatePicker date={date} onDateChange={setDate} />

            {/* Description Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description (Optional)</Text>
              <View style={styles.inputWrapper}>
                <FileText size={20} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="What did you spend on?"
                  placeholderTextColor="#9CA3AF"
                  multiline
                />
              </View>
            </View>

            {/* Add Button */}
            <TouchableOpacity
              style={[styles.addButton, isLoading && styles.addButtonDisabled]}
              onPress={handleAddExpense}
              disabled={isLoading}
            >
              <Text style={styles.addButtonText}>
                {isLoading ? 'Adding...' : 'Add Expense'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryError: {
    borderColor: '#EF4444',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});