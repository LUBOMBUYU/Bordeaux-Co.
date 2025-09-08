import React, { useRef, useState, memo } from 'react';
import { View, Text, Pressable, Animated, LayoutAnimation, Platform, UIManager, Image } from 'react-native';
import { MenuItem } from '../types';
import { colors } from '../theme/colors';
import { formatZAR } from '../utils/currency';
import { styles } from '../styles/MenuItemCardStyles';
import { useUser } from '../context/UserContext';
import { useBasket } from '../context/BasketContext';

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
  const { canRemoveItem } = useUser();
  const { addToBasket } = useBasket();

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

  const handleAddToBasket = () => {
    addToBasket(item, 1);
  };

  if (!visible) return null;

  return (
    <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
      {item.imageUrl && (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.price}>{formatZAR(item.price)}</Text>
        </View>

        <Text style={styles.meta}>{item.course}</Text>
        <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>

        <Pressable
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 6,
            alignItems: 'center',
            marginTop: 10,
          }}
          onPress={handleAddToBasket}
        >
          <Text style={{ color: colors.white, fontWeight: '600' }}>Add to Basket</Text>
        </Pressable>

        {onRemove && canRemoveItem() ? (
          <Pressable
            style={({ pressed }) => [styles.removeBtn, pressed && { opacity: 0.8 }]}
            onPressIn={() => animate(0.98)}
            onPressOut={() => animate(1)}
            onPress={handleRemove}
          >
            <Text style={styles.removeText}>Remove</Text>
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
};

const MenuItemCard = memo(MenuItemCardComponent);

export default MenuItemCard;
