import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useMenu } from '../context/MenuContext';
import { Course } from '../types';
import MenuItemCard from '../components/MenuItemCard';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Filter'>;

export default function FilterScreen({ navigation }: Props) {
  const { items } = useMenu();
  const [course, setCourse] = useState<Course>('Starters');

  const filtered = useMemo(() => items.filter(i => i.course === course), [items, course]);

  const handleCourseChange = useCallback((v: Course) => {
    setCourse(v);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Course</Text>
      <View style={styles.pickerWrap}>
        <Picker selectedValue={course} onValueChange={handleCourseChange}>
          <Picker.Item label="Starters" value="Starters" />
          <Picker.Item label="Mains" value="Mains" />
          <Picker.Item label="Dessert" value="Dessert" />
        </Picker>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        renderItem={({ item }) => <MenuItemCard item={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No items in {course} yet.</Text>}
      />

      <View style={styles.navButtons}>
        <Pressable style={styles.navBtn} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navBtnText}>Home</Text>
        </Pressable>
        <Pressable style={styles.navBtn} onPress={() => navigation.navigate('AddItem')}>
          <Text style={styles.navBtnText}>Add Item</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingTop: 12 },
  label: { color: colors.text, fontWeight: '700', marginHorizontal: 16, marginBottom: 6 },
  pickerWrap: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  empty: { textAlign: 'center', marginTop: 24, color: colors.muted },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  navBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
  },
  navBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
});
