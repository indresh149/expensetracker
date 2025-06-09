import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Calendar } from 'lucide-react-native';

interface DatePickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

export default function DatePicker({ date, onDateChange }: DatePickerProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDatePress = () => {
    // For web, we'll use a simple prompt to change date
    // In a real app, you'd use a proper date picker component
    if (Platform.OS === 'web') {
      const dateString = prompt('Enter date (YYYY-MM-DD):', date.toISOString().split('T')[0]);
      if (dateString) {
        const newDate = new Date(dateString);
        if (!isNaN(newDate.getTime())) {
          onDateChange(newDate);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date</Text>
      <TouchableOpacity style={styles.dateButton} onPress={handleDatePress}>
        <Calendar size={20} color="#6B7280" />
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </TouchableOpacity>
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
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  dateText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
});