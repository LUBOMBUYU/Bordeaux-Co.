/**
 * Login Screen Component
 *
 * This screen allows users to log in using their distinct user codes.
 * Provides a secure login interface without exposing user information.
 *
 * Features:
 * - User code input field
 * - Login button with validation
 * - Error handling for invalid codes
 * - Secure authentication without data exposure
 */

import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, SafeAreaView, ScrollView, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useUser } from '../context/UserContext/UserContext';
import { colors } from '../theme/colors';

/**
 * Navigation props type for the Login screen
 * Provides access to navigation object for screen transitions
 */
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

/**
 * LoginScreen Component
 *
 * State management:
 * - userCode: Current input value for user code
 *
 * Data flow:
 * 1. User enters user code
 * 2. On login press, validate code using UserContext
 * 3. Navigate to Home on success, show error on failure
 */
export default function LoginScreen({ navigation }: Props) {
  const [userCode, setUserCode] = useState('');
  const [password, setPassword] = useState('');
  const { login, users } = useUser();

  const handleLogin = () => {
    if (!userCode.trim()) {
      Alert.alert('Error', 'Please enter a user code');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }

    const success = login(userCode.trim().toUpperCase(), password.trim());
    if (success) {
      navigation.replace('Home');
    } else {
      Alert.alert('Error', 'Invalid user code or password. Please try again.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <Image
            source={require('../../assets/Bordeaux_and_Co.jpeg')}
            style={{ width: 150, height: 150, marginBottom: 20 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: 10 }}>
            Christoffel's Menu
          </Text>
          <Text style={{ fontSize: 18, color: colors.text, textAlign: 'center' }}>
            Login with your user code
          </Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, color: colors.text, marginBottom: 10 }}>
            Enter User Code:
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
              backgroundColor: colors.card,
              color: colors.text,
            }}
            placeholder="e.g., USER123"
            placeholderTextColor={colors.muted}
            value={userCode}
            onChangeText={setUserCode}
            autoCapitalize="characters"
            autoCorrect={false}
          />
        </View>

        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 16, color: colors.text, marginBottom: 10 }}>
            Enter Password:
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
              backgroundColor: colors.card,
              color: colors.text,
            }}
            placeholder="Enter your password"
            placeholderTextColor={colors.muted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCorrect={false}
          />
        </View>

        <Pressable
          style={{
            backgroundColor: colors.primary,
            padding: 15,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 30,
          }}
          onPress={handleLogin}
        >
          <Text style={{ color: colors.white, fontSize: 16, fontWeight: 'bold' }}>
            Login
          </Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={{ color: colors.primary, fontSize: 16, textAlign: 'center' }}>
            Don't have an account? Sign up here
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
