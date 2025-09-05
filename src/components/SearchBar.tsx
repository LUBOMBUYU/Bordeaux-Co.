import React from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { colors } from '../theme/colors';
import { styles } from '../styles/SearchBarStyles';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, placeholder = 'Search...' }) => {
  const handleClear = () => {
    onChangeText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
      {value.length > 0 && (
        <Pressable style={styles.clearBtn} onPress={handleClear}>
          <Text style={styles.clearText}>✕</Text>
        </Pressable>
      )}
    </View>
  );
};

export default SearchBar;
