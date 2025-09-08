import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { scaleFont, scalePadding, scaleMargin, scaleWidth } from '../utils/scale';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingTop: 12, maxWidth: 480, alignSelf: 'center' },
  title: {
    fontSize: scaleFont(20),
    fontWeight: '700',
    color: '#000000',
    backgroundColor: colors.white,
    paddingHorizontal: scalePadding(8),
    paddingVertical: scalePadding(4),
    borderRadius: 8,
    marginHorizontal: scaleMargin(16),
    marginBottom: scaleMargin(12),
  },
  filterButtons: {
    paddingHorizontal: scalePadding(8),
    paddingBottom: scalePadding(12),
  },
  filterButtonsContainer: {
    paddingHorizontal: scalePadding(8),
    paddingBottom: scalePadding(12),
    flexWrap: 'wrap', // Added wrap to allow stacking
    flexDirection: 'row', // Ensure horizontal layout with wrapping
    justifyContent: 'center', // Center buttons in container
  },
  filterBtn: {
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingVertical: scalePadding(8),
    paddingHorizontal: scalePadding(16),
    marginHorizontal: scaleMargin(6),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 120, // Added min width for consistent button size
    justifyContent: 'center', // Center content horizontally
  },
  filterBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterBtnEmoji: {
    fontSize: scaleFont(18),
    marginRight: scaleMargin(6),
    color: '#000000',
  },
  filterBtnEmojiActive: {
    color: colors.white,
  },
  filterBtnText: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: '#000000',
  },
  filterBtnTextActive: {
    color: colors.white,
  },
  filterBtnCount: {
    fontSize: scaleFont(12),
    fontWeight: '600',
    color: '#000000',
    marginLeft: scaleMargin(6),
  },
  filterBtnCountActive: {
    color: colors.white,
  },
  resultText: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: scaleMargin(16),
    marginBottom: scaleMargin(8),
  },
  menuContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  menuList: {
    paddingHorizontal: scalePadding(8),
    paddingBottom: scalePadding(24),
    paddingTop: 0,
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
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scaleMargin(12),
    marginHorizontal: scaleMargin(16),
    marginTop: scaleMargin(16),
    marginBottom: scaleMargin(16),
  },
  navBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
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
});
