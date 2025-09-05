import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingTop: 12 },
  label: { color: colors.text, fontWeight: '700', marginHorizontal: 16, marginBottom: 6 },
  pickerWrap: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 12,
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
