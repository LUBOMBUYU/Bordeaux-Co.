import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingTop: 12 },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  filterButtons: {
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
  filterButtonsContainer: {
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
  filterBtn: {
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterBtnEmoji: {
    fontSize: 18,
    marginRight: 6,
    color: '#000000',
  },
  filterBtnEmojiActive: {
    color: colors.white,
  },
  filterBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  filterBtnTextActive: {
    color: colors.white,
  },
  filterBtnCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 6,
  },
  filterBtnCountActive: {
    color: colors.white,
  },
  resultText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  menuList: {
    paddingHorizontal: 8,
    paddingBottom: 24,
    paddingTop: 0,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginHorizontal: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  empty: { textAlign: 'center', marginTop: 24, color: colors.muted },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  navBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
  },
  navBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
});
