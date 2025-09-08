import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from '../styles/FilterScreenStyles';

interface FilterButtonProps {
  course: string;
  emoji: string;
  count: number;
  isSelected: boolean;
  onPress: () => void;
}

export default function FilterButton({ course, emoji, count, isSelected, onPress }: FilterButtonProps) {
  return (
    <Pressable
      style={[styles.filterBtn, isSelected && styles.filterBtnActive]}
      onPress={onPress}
    >
      <Text style={[styles.filterBtnEmoji, isSelected && styles.filterBtnEmojiActive]}>
        {emoji}
      </Text>
      <Text style={[styles.filterBtnText, isSelected && styles.filterBtnTextActive]}>
        {course}
      </Text>
      <Text style={[styles.filterBtnCount, isSelected && styles.filterBtnCountActive]}>
        ({count})
      </Text>
    </Pressable>
  );
}
