import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useMenu } from '../context/MenuContext';
import MenuItemCard from '../components/MenuItemCard';
import { colors } from '../theme/colors';
import SearchBar from '../components/SearchBar';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { items, removeItem, averagesByCourse } = useMenu();

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<'name' | 'priceAsc' | 'priceDesc'>('name');

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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  headerArea: { paddingTop: 12, paddingHorizontal: 16, paddingBottom: 8 },
  title: { fontSize: 22, fontWeight: '800', color: colors.primary },
  subtitle: { marginTop: 4, color: colors.text, fontWeight: '600' },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  badge: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  badgeText: { fontWeight: '600', color: colors.muted },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 12,
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
  sortOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  sortBtn: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sortBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sortBtnText: {
    color: colors.text,
    fontWeight: '600',
  },
  sortBtnTextActive: {
    color: colors.white,
  },
  empty: { textAlign: 'center', marginTop: 24, color: colors.muted },
});
