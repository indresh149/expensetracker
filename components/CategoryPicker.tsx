import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { EXPENSE_CATEGORIES } from '@/types/expense';

interface CategoryPickerProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryPicker({ selectedCategory, onCategoryChange }: CategoryPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.categoriesContainer}>
          {EXPENSE_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.value}
              style={[
                styles.categoryItem,
                { backgroundColor: category.color + '20' },
                selectedCategory === category.value && {
                  backgroundColor: category.color,
                  borderColor: category.color,
                }
              ]}
              onPress={() => onCategoryChange(category.value)}
            >
              <View style={[styles.colorDot, { backgroundColor: category.color }]} />
              <Text style={[
                styles.categoryText,
                selectedCategory === category.value && styles.selectedCategoryText
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  scrollView: {
    flexGrow: 0,
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    minWidth: 100,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
});