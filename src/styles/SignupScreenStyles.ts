import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scrollViewContent: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  headerContainer: { alignItems: 'center', marginBottom: 40 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: 10 },
  headerSubtitle: { fontSize: 18, color: colors.text, textAlign: 'center' },
  label: { fontSize: 16, color: colors.text, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.card,
    color: colors.text,
  },
  signupButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  signupButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    color: colors.primary,
    fontSize: 16,
    textAlign: 'center',
  },
});
