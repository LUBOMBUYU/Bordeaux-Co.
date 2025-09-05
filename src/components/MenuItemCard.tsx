import React, { useRef, useState, memo } from 'react';
import { View, Text, Pressable, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { MenuItem } from '../types';
import { colors } from '../theme/colors';
import { formatZAR } from '../utils/currency';
import { styles } from '../styles/MenuItemCardStyles';
import { useUser } from '../context/UserContext';

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
    </Animated.View>
  );
};

const MenuItemCard = memo(MenuItemCardComponent);

export default MenuItemCard;
