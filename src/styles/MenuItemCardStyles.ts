import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 4,
    borderWidth: 0,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, // For Android shadow
    width: '100%', // Full width for list style
    flexDirection: 'row',
    overflow: 'hidden',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '700', color: colors.text, flex: 1 },
  price: { fontSize: 16, fontWeight: '700', color: colors.primary },
  meta: { marginTop: 4, color: colors.muted, fontWeight: '500', fontSize: 12 },
  desc: { marginTop: 4, color: colors.text, lineHeight: 18, fontSize: 14 },
  image: {
    width: 120,
    height: 120,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
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
