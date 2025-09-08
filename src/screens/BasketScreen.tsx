import React from 'react';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useBasket } from '../context/BasketContext';
import { colors } from '../theme/colors';
import { formatZAR } from '../utils/currency';

type Props = NativeStackScreenProps<RootStackParamList, 'Basket'>;

export default function BasketScreen({ navigation }: Props) {
  const { basketItems, removeFromBasket, updateQuantity, clearBasket, getTotal } = useBasket();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      Alert.alert(
        'Remove Item',
        'Remove this item from basket?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Remove', onPress: () => removeFromBasket(id) },
        ]
      );
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    Alert.alert(
      'Checkout',
      `Total: ${formatZAR(getTotal())}\n\nProceed with payment?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Pay Now',
          onPress: () => {
            Alert.alert('Success', 'Payment processed successfully!');
            clearBasket();
            navigation.replace('Home');
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={{
      flexDirection: 'row',
      padding: 16,
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginVertical: 4,
      borderRadius: 8,
      alignItems: 'center',
    }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>{item.name}</Text>
        <Text style={{ fontSize: 14, color: colors.muted }}>{item.course}</Text>
        <Text style={{ fontSize: 16, fontWeight: '600', color: colors.primary }}>
          {formatZAR(item.price)}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable
          style={{
            width: 30,
            height: 30,
            backgroundColor: colors.border,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text }}>-</Text>
        </Pressable>

        <Text style={{ marginHorizontal: 16, fontSize: 16, fontWeight: '600', color: colors.text }}>
          {item.quantity}
        </Text>

        <Pressable
          style={{
            width: 30,
            height: 30,
            backgroundColor: colors.primary,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.white }}>+</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'center',
        padding: 16,
      }}>
        Your Basket
      </Text>

      {basketItems.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: colors.muted }}>Your basket is empty</Text>
          <Pressable
            style={{
              backgroundColor: colors.primary,
              padding: 12,
              borderRadius: 8,
              marginTop: 16,
            }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: colors.white, fontWeight: '600' }}>Continue Shopping</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <FlatList
            data={basketItems}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
          />

          <View style={{
            padding: 16,
            backgroundColor: colors.card,
            borderTopWidth: 1,
            borderTopColor: colors.border,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text }}>Total:</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.primary }}>
                {formatZAR(getTotal())}
              </Text>
            </View>

            <Pressable
              style={{
                backgroundColor: colors.primary,
                padding: 16,
                borderRadius: 8,
                alignItems: 'center',
              }}
              onPress={handleCheckout}
            >
              <Text style={{ color: colors.white, fontSize: 16, fontWeight: 'bold' }}>
                Checkout
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}
