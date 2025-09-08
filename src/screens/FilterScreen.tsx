import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useMenu } from '../context/MenuContext';
import { Course } from '../types';
import MenuItemCard from '../components/MenuItemCard';
import { colors } from '../theme/colors';
import { styles } from '../styles/FilterScreenStyles';

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
      <Text style={styles.label}>Select Course Category</Text>
      <View style={styles.pickerWrap}>
        <Picker
          selectedValue={course}
          onValueChange={handleCourseChange}
          style={{ color: colors.text }}
        >
          <Picker.Item label="🍽️ Starters" value="Starters" />
          <Picker.Item label="🍖 Mains" value="Mains" />
          <Picker.Item label="🍰 Dessert" value="Dessert" />
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
          <Text style={styles.navBtnText}>Back to Home</Text>
        </Pressable>
        <Pressable style={styles.navBtn} onPress={() => navigation.navigate('AddItem')}>
          <Text style={styles.navBtnText}>Add New Item</Text>
        </Pressable>
      </View>
    </View>
  );
}
