/**
 * Home Screen Component
 *
 * This is the main screen of the Christoffel's Menu app, displaying:
 * - Restaurant logo and branding
 * - Menu items in a scrollable list
 * - Search functionality with debounced input
 * - Sorting options (name, price ascending/descending)
 * - Course average price badges
 * - Navigation buttons to add items and filter
 *
 * Performance optimizations:
 * - Debounced search (300ms delay)
 * - Memoized filtering and sorting
 * - Callback memoization for event handlers
 * - FlatList virtualization for large lists
 */

import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, Pressable, SafeAreaView, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useMenu } from '../context/MenuContext';
import MenuItemCard from '../components/MenuItemCard';
import { colors } from '../theme/colors';
import SearchBar from '../components/SearchBar';
import { styles } from '../styles/HomeScreens';

/**
 * Navigation props type for the Home screen
 * Provides access to navigation object for screen transitions
 */
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

/**
 * HomeScreen Component
 *
 * State management:
 * - searchTerm: Current search input value
 * - debouncedSearchTerm: Debounced search term for performance
 * - sortOption: Current sorting preference
 *
 * Data flow:
 * 1. Get menu items and functions from MenuContext
 * 2. Apply search filtering with debouncing
 * 3. Apply sorting based on user selection
 * 4. Render filtered and sorted items
 */
export default function HomeScreen({ navigation }: Props) {
  // Extract menu data and functions from context
  const { items, removeItem, averagesByCourse } = useMenu();

  // Local state for search and sorting functionality
  const [searchTerm, setSearchTerm] = useState('');                    // Current search input
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');  // Debounced search term
  const [sortOption, setSortOption] = useState<'name' | 'priceAsc' | 'priceDesc'>('name'); // Current sort option

  // Debounce search term to reduce filtering frequency
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Memoize removeItem callback to prevent unnecessary re-renders of MenuItemCard
  const handleRemoveItem = useCallback((id: string) => {
    removeItem(id);
  }, [removeItem]);

  const filteredItems = useMemo(() => {
    const lowerSearch = debouncedSearchTerm.toLowerCase();
    let filtered = items.filter(
      item =>
        item.name.toLowerCase().includes(lowerSearch) ||
        item.description.toLowerCase().includes(lowerSearch)
    );

    switch (sortOption) {
      case 'name':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'priceAsc':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
    }
    return filtered;
  }, [items, debouncedSearchTerm, sortOption]);

  const totalItems = filteredItems.length;

  // Render averages badge row (Final POE requirement)
  const averagesRow = useMemo(() => {
    const entries = Object.entries(averagesByCourse) as [keyof typeof averagesByCourse, number | null][];
    return entries.map(([course, avg]) => (
      <View key={course} style={styles.badge}>
        <Text style={styles.badgeText}>
          {course}: {avg === null ? '—' : `R${avg.toFixed(2)}`}
        </Text>
      </View>
    ));
  }, [averagesByCourse]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerArea}>
        <Image source={require('../../assets/Bordeaux & Co..jpeg')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Christoffel’s Menu</Text>
        <Text style={styles.subtitle}>Items: {totalItems}</Text>
        <View style={styles.badgeRow}>{averagesRow}</View>
      </View>

      <SearchBar value={searchTerm} onChangeText={setSearchTerm} placeholder="Search menu items..." />

      <View style={styles.navButtons}>
        <Pressable
          style={styles.navBtn}
          onPress={() => navigation.navigate('AddItem')}
        >
          <Text style={styles.navBtnText}>Add Item</Text>
        </Pressable>
        <Pressable
          style={styles.navBtn}
          onPress={() => navigation.navigate('Filter')}
        >
          <Text style={styles.navBtnText}>Filter</Text>
        </Pressable>
      </View>

      <View style={styles.sortOptions}>
        <Pressable
          style={[styles.sortBtn, sortOption === 'name' && styles.sortBtnActive]}
          onPress={() => setSortOption('name')}
        >
          <Text style={[styles.sortBtnText, sortOption === 'name' && styles.sortBtnTextActive]}>Name</Text>
        </Pressable>
        <Pressable
          style={[styles.sortBtn, sortOption === 'priceAsc' && styles.sortBtnActive]}
          onPress={() => setSortOption('priceAsc')}
        >
          <Text style={[styles.sortBtnText, sortOption === 'priceAsc' && styles.sortBtnTextActive]}>Price ↑</Text>
        </Pressable>
        <Pressable
          style={[styles.sortBtn, sortOption === 'priceDesc' && styles.sortBtnActive]}
          onPress={() => setSortOption('priceDesc')}
        >
          <Text style={[styles.sortBtnText, sortOption === 'priceDesc' && styles.sortBtnTextActive]}>Price ↓</Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={21}
        removeClippedSubviews={true}
        renderItem={({ item }) => (
          <MenuItemCard item={item} onRemove={handleRemoveItem} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No items found.</Text>
        }
      />
    </SafeAreaView>
  );
}
