import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { scaleFont, scalePadding, scaleMargin, scaleWidth, scaleSize } from '../utils/scale';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: scaleSize(12),
    marginBottom: scaleMargin(16),
    marginHorizontal: scaleMargin(4),
    borderWidth: 0,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, // For Android shadow
    width: '48%', // Adjusted for two columns with margin
    flexDirection: 'column',  // Changed from 'row' to 'column' to put text under image
    overflow: 'hidden',
    minHeight: 140, // Added min height for better text spacing
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: scaleFont(18), fontWeight: '700', color: colors.text, flex: 1 },
  price: { fontSize: scaleFont(16), fontWeight: '700', color: colors.primary },
  meta: { marginTop: scaleMargin(4), color: colors.muted, fontWeight: '500', fontSize: scaleFont(12) },
  desc: { marginTop: scaleMargin(4), color: colors.text, lineHeight: scaleSize(18), fontSize: scaleFont(14) },
  image: {
    width: scaleWidth(120),
    height: scaleWidth(120),
  },
  content: {
    flex: 1,
    padding: scalePadding(12),
    justifyContent: 'center',
  },
  removeBtn: {
    alignSelf: 'flex-start',
    marginTop: scaleMargin(12),
    backgroundColor: colors.danger,
    paddingVertical: scalePadding(8),
    paddingHorizontal: scalePadding(12),
    borderRadius: scaleSize(8),
  },
  removeText: { color: colors.white, fontWeight: '600' },
  addToBasketBtn: {
    backgroundColor: colors.primary,
    paddingVertical: scalePadding(6),
    paddingHorizontal: scalePadding(12),
    borderRadius: scaleSize(6),
    alignItems: 'center',
    marginTop: scaleMargin(10),
  },
  addToBasketText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: scaleFont(14),
  },
});
