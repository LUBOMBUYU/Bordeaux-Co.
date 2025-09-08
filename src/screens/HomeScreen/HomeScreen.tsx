
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
import { View, Text, FlatList, Pressable, SafeAreaView, Image, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useMenu } from '../../context/MenuContext';
import { useUser } from '../../context/UserContext/UserContext';
import MenuItemCard from '../../components/MenuItemCard';
import { colors } from '../../theme/colors';
import SearchBar from '../../components/SearchBar';
import { styles } from '../../styles/HomeScreenStyles';
import { MenuItem } from '../../types';

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
  const { currentUser, logout, canAddItem, canRemoveItem } = useUser();

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

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => {
          console.log('Logout button pressed'); // Debugging
          logout();
          navigation.replace('Login');
        }},
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerArea}>
        <Image source={require('../../../assets/Bordeaux_and_Co.jpeg')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Christoffel’s Menu</Text>
        <Text style={styles.subtitle}>Total Items: {totalItems}</Text>
        {currentUser && (
          <Text style={{ color: colors.muted, fontSize: 14, marginTop: 4 }}>
            Logged in as: {currentUser.name} ({currentUser.type})
          </Text>
        )}
        <View style={styles.badgeRow}>{averagesRow}</View>
      </View>

      <SearchBar value={searchTerm} onChangeText={setSearchTerm} placeholder="Search menu items..." />

      <View style={styles.navButtons}>
        {canAddItem() && (
          <Pressable
            style={styles.navBtn}
            onPress={() => navigation.navigate('AddItem')}
          >
            <Text style={styles.navBtnText}>Add New Item</Text>
          </Pressable>
        )}
        <Pressable
          style={styles.navBtn}
          onPress={() => navigation.navigate('Filter')}
        >
          <Text style={styles.navBtnText}>Filter by Course</Text>
        </Pressable>
        <Pressable
          style={[styles.navBtn, { backgroundColor: colors.secondary }]}
          onPress={() => navigation.navigate('Basket')}
        >
          <Text style={styles.navBtnText}>View Basket</Text>
        </Pressable>
        <Pressable
          style={[styles.navBtn, { backgroundColor: colors.danger }]}
          onPress={handleLogout}
        >
          <Text style={styles.navBtnText}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.sortOptions}>
        <Pressable
          style={[styles.sortBtn, sortOption === 'name' && styles.sortBtnActive]}
          onPress={() => setSortOption('name')}
        >
          <Text style={[styles.sortBtnText, sortOption === 'name' && styles.sortBtnTextActive]}>Sort by Name</Text>
        </Pressable>
        <Pressable
          style={[styles.sortBtn, sortOption === 'priceAsc' && styles.sortBtnActive]}
          onPress={() => setSortOption('priceAsc')}
        >
          <Text style={[styles.sortBtnText, sortOption === 'priceAsc' && styles.sortBtnTextActive]}>Sort by Price ↑</Text>
        </Pressable>
        <Pressable
          style={[styles.sortBtn, sortOption === 'priceDesc' && styles.sortBtnActive]}
          onPress={() => setSortOption('priceDesc')}
        >
          <Text style={[styles.sortBtnText, sortOption === 'priceDesc' && styles.sortBtnTextActive]}>Sort by Price ↓</Text>
        </Pressable>
      </View>

      <View style={styles.menuContainer}>
        <FlatList
          data={filteredItems}
          keyExtractor={(item: MenuItem) => item.id}
          contentContainerStyle={styles.menuList}
          initialNumToRender={12}
          maxToRenderPerBatch={12}
          windowSize={21}
          removeClippedSubviews={true}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }: { item: MenuItem }) => (
            <MenuItemCard item={item} onRemove={handleRemoveItem} />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.empty}>No items found.</Text>
            </View>
          }
          showsVerticalScrollIndicator={true}
        />
      </View>
    </SafeAreaView>
  );
}
