import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
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
