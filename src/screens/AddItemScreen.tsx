import React, { useRef, useState, useCallback } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useMenu } from '../context/MenuContext';
import { useUser } from '../context/UserContext';
import { Course } from '../types';
import { colors } from '../theme/colors';
import { styles } from '../styles/AddItemScreenStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'AddItem'>;

export default function AddItemScreen({ navigation }: Props) {
  const { addItem } = useMenu();
  const { canEditPrice } = useUser();

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState<Course>('Starters');

  const scale = useRef(new Animated.Value(1)).current;

  const onSave = useCallback(() => {
    const priceNum = Number(price);
    if (!name.trim() || !desc.trim() || !price || isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Validation', 'Please enter a valid name, description, and positive price.');
      return;
    }
    addItem({ name: name.trim(), description: desc.trim(), price: priceNum, course });
    setName('');
    setDesc('');
    setPrice('');
    setCourse('Starters');
    Alert.alert('Success', 'Menu item added.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
  }, [name, desc, price, course, addItem, navigation]);

  const animate = useCallback((to: number) => {
    Animated.spring(scale, { toValue: to, useNativeDriver: true, friction: 5 }).start();
  }, [scale]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Dish Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Tomato Bruschetta"
          placeholderTextColor={colors.muted}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={desc}
          onChangeText={setDesc}
          placeholder="Short description..."
          placeholderTextColor={colors.muted}
          multiline
        />

        <Text style={styles.label}>Price (ZAR)</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="e.g. 89"
          placeholderTextColor={colors.muted}
          keyboardType="numeric"
          editable={canEditPrice()}
        />
        {!canEditPrice() && (
          <Text style={{ color: colors.muted, fontSize: 12, marginTop: 4 }}>
            Only owners can edit prices
          </Text>
        )}

        <Text style={styles.label}>Course</Text>
        <View style={styles.pickerWrap}>
          <Picker
            selectedValue={course}
            onValueChange={(v) => setCourse(v as Course)}
          >
            <Picker.Item label="Starters" value="Starters" />
            <Picker.Item label="Mains" value="Mains" />
            <Picker.Item label="Dessert" value="Dessert" />
          </Picker>
        </View>

        <Animated.View style={{ transform: [{ scale }], marginTop: 16 }}>
          <Pressable
            style={styles.saveBtn}
            onPressIn={() => animate(0.98)}
            onPressOut={() => animate(1)}
            onPress={onSave}
          >
            <Text style={styles.saveText}>Save Item</Text>
          </Pressable>
        </Animated.View>

        <View style={styles.navButtons}>
          <Pressable style={styles.backBtn} onPress={handleBackPress}>
            <Text style={styles.backText}>Back to Home</Text>
          </Pressable>
          <Pressable style={styles.navBtn} onPress={() => navigation.navigate('Filter')}>
            <Text style={styles.navBtnText}>Filter</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
