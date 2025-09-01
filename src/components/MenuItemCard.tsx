import React, { useRef, useState, memo } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { MenuItem } from '../types';
import { colors } from '../theme/colors';
import { formatZAR } from '../utils/currency';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  item: MenuItem;
  onRemove?: (id: string) => void;
};

const MenuItemCardComponent: React.FC<Props> = ({ item, onRemove }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const [visible, setVisible] = useState(true);

  const animate = (to: number) => {
    Animated.spring(scale, { toValue: to, useNativeDriver: true, friction: 3 }).start();
  };

  const handleRemove = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setVisible(false);
    if (onRemove) {
      setTimeout(() => onRemove(item.id), 300);
    }
  };

  if (!visible) return null;

  return (
    <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
      <View style={styles.row}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>{formatZAR(item.price)}</Text>
      </View>
      <Text style={styles.meta}>{item.course}</Text>
      <Text style={styles.desc}>{item.description}</Text>

      {onRemove ? (
        <Pressable
          style={({ pressed }) => [styles.removeBtn, pressed && { opacity: 0.8 }]}
          onPressIn={() => animate(0.98)}
          onPressOut={() => animate(1)}
          onPress={handleRemove}
        >
          <Text style={styles.removeText}>Remove</Text>
        </Pressable>
      ) : null}
    </Animated.View>
  );
};

const MenuItemCard = memo(MenuItemCardComponent);

export default MenuItemCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '700', color: colors.text },
  price: { fontSize: 16, fontWeight: '600', color: colors.primary },
  meta: { marginTop: 8, color: colors.muted, fontWeight: '500' },
  desc: { marginTop: 6, color: colors.text, lineHeight: 20 },
  removeBtn: {
    alignSelf: 'flex-start',
    marginTop: 12,
    backgroundColor: colors.danger,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  removeText: { color: colors.white, fontWeight: '600' },
});
