import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useUser } from '../context/UserContext';
import { styles } from '../styles/SignupScreenStyles';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [userCode, setUserCode] = useState('');
  const { signup } = useUser();

  const handleSignup = () => {
    if (!name.trim() || !userCode.trim()) {
      Alert.alert('Error', 'Please enter both name and user code');
      return;
    }

    const success = signup(name.trim(), userCode.trim().toUpperCase());
    if (success) {
      Alert.alert('Success', 'Signup successful! Please login.');
      navigation.replace('Login');
    } else {
      Alert.alert('Error', 'User code already exists. Please try a different one.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>
            Signup for Christoffel's Menu
          </Text>
          <Text style={styles.headerSubtitle}>
            Create a new user account
          </Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor={colors.muted}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>

        <View style={{ marginBottom: 30 }}>
          <Text style={styles.label}>User Code:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., NEWUSER001"
            placeholderTextColor={colors.muted}
            value={userCode}
            onChangeText={setUserCode}
            autoCapitalize="characters"
            autoCorrect={false}
          />
        </View>

        <Pressable
          style={styles.signupButton}
          onPress={handleSignup}
        >
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </Pressable>

        <Pressable onPress={() => navigation.replace('Login')}>
          <Text style={styles.loginLink}>
            Already have an account? Login here
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
