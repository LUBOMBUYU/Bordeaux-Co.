/**
 * Login Screen Component
 *
 * This screen allows users to log in using their distinct user codes.
 * It displays available user codes for demonstration purposes.
 *
 * Features:
 * - User code input field
 * - Login button with validation
 * - Display of available user codes
 * - Error handling for invalid codes
 */

import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useUser } from '../context/UserContext';
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
  const { login, users } = useUser();

  const handleLogin = () => {
    if (!userCode.trim()) {
      Alert.alert('Error', 'Please enter a user code');
      return;
    }

    const success = login(userCode.trim().toUpperCase());
    if (success) {
      navigation.replace('Home');
    } else {
      Alert.alert('Error', 'Invalid user code. Please try again.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: 10 }}>
            Christoffel's Menu
          </Text>
          <Text style={{ fontSize: 18, color: colors.text, textAlign: 'center' }}>
            Login with your user code
          </Text>
        </View>

        <View style={{ marginBottom: 30 }}>
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
            placeholder="e.g., OWNER001"
            placeholderTextColor={colors.muted}
            value={userCode}
            onChangeText={setUserCode}
            autoCapitalize="characters"
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

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 10 }}>
            Available User Codes (Demo):
          </Text>
          {users.map(user => (
            <Text key={user.id} style={{ fontSize: 14, color: colors.muted, marginBottom: 5 }}>
              {user.name} ({user.type}): {user.userCode}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
