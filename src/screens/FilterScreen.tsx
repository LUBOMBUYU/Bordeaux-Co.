import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, Pressable, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useMenu } from '../context/MenuContext';
import { Course } from '../types';
import MenuItemCard from '../components/MenuItemCard';
import { styles } from '../styles/FilterScreenStyles';
import FilterButton from '../screens/FilterButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Filter'>;

export default function FilterScreen({ navigation }: Props) {
  const { items } = useMenu();
  const [selectedCourse, setSelectedCourse] = useState<Course | 'All'>('All');

  const courses: (Course | 'All')[] = ['All', 'Starters', 'Mains', 'Side Dishes', 'Desserts', 'Drinks'];

  const filtered = useMemo(() => {
    if (selectedCourse === 'All') return items;
    return items.filter(i => i.course === selectedCourse);
  }, [items, selectedCourse]);

  const courseEmojis = {
    'All': '🍽️',
    'Starters': '🥗',
    'Mains': '🍖',
    'Side Dishes': '🥔',
    'Desserts': '🍰',
    'Drinks': '🥤'
  };

  const courseCounts = useMemo(() => {
    const counts: Record<Course | 'All', number> = {
      'All': items.length,
      'Starters': 0,
      'Mains': 0,
      'Side Dishes': 0,
      'Desserts': 0,
      'Drinks': 0
    };

    items.forEach(item => {
      counts[item.course]++;
    });

    return counts;
  }, [items]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter by Course</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterButtonsContainer}
      >
        {courses.map((course) => (
          <FilterButton
            key={course}
            course={course}
            emoji={courseEmojis[course]}
            count={courseCounts[course]}
            isSelected={selectedCourse === course}
            onPress={() => setSelectedCourse(course)}
          />
        ))}
      </ScrollView>

      <Text style={styles.resultText}>
        {selectedCourse === 'All'
          ? `Showing all ${filtered.length} items`
          : `Showing ${filtered.length} ${selectedCourse.toLowerCase()}`
        }
      </Text>

      <View style={styles.menuContainer}>
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.menuList}
          initialNumToRender={12}
          maxToRenderPerBatch={12}
          windowSize={21}
          removeClippedSubviews={true}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => <MenuItemCard item={item} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.empty}>
                {selectedCourse === 'All'
                  ? 'No menu items available.'
                  : `No items in ${selectedCourse} yet.`
                }
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={true}
        />
      </View>

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
