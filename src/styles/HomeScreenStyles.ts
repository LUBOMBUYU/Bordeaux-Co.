import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { scaleFont, scalePadding, scaleMargin, scaleWidth, scaleSize } from '../utils/scale';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, maxWidth: 480, alignSelf: 'center' },
  headerArea: {
    paddingTop: scalePadding(20),
    paddingHorizontal: scalePadding(16),
    paddingBottom: scalePadding(12),
    backgroundColor: colors.bg,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
  },
  logo: { width: scaleWidth(150), height: scaleWidth(90), marginBottom: scaleMargin(12) },
  title: { fontSize: scaleFont(24), fontWeight: '800', color: colors.primary, textAlign: 'center' },
  subtitle: { marginTop: scaleMargin(4), color: colors.text, fontWeight: '600', textAlign: 'center' },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: scaleMargin(8), marginTop: scaleMargin(8), justifyContent: 'center' },
  badge: {
    backgroundColor: colors.card,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: scaleSize(20),
    paddingVertical: scalePadding(6),
    paddingHorizontal: scalePadding(10),
    marginRight: scaleMargin(8),
    marginBottom: scaleMargin(8),
  },
  badgeText: { fontWeight: '600', color: colors.text },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scaleMargin(12),
    marginHorizontal: scaleMargin(16),
    marginBottom: scaleMargin(12),
  },
  navBtn: {
    backgroundColor: colors.primary,
    borderRadius: scaleSize(10),
    paddingVertical: scalePadding(10),
    paddingHorizontal: scalePadding(20),
    flex: 1,
    alignItems: 'center',
  },
  navBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: scaleFont(16),
  },
  sortOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scaleMargin(12),
    marginHorizontal: scaleMargin(16),
    marginBottom: scaleMargin(12),
  },
  sortBtn: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: scaleSize(10),
    paddingVertical: scalePadding(8),
    paddingHorizontal: scalePadding(16),
  },
  sortBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sortBtnText: {
    color: colors.text,
    fontWeight: '600',
  },
  sortBtnTextActive: {
    color: colors.white,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  menuList: {
    paddingHorizontal: scalePadding(8),
    paddingBottom: scalePadding(24),
    paddingTop: scalePadding(8),
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginHorizontal: scaleMargin(8),
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scalePadding(50),
  },
  empty: { textAlign: 'center', marginTop: scaleMargin(24), color: colors.muted },
});
