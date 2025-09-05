import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.bg },
  label: { color: colors.text, fontWeight: '700', marginTop: 12, marginBottom: 6 },
  input: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    color: colors.text,
  },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  pickerWrap: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
  },
  saveBtn: { backgroundColor: colors.primary, padding: 14, borderRadius: 12, alignItems: 'center' },
  saveText: { color: colors.white, fontWeight: '800' },
  backBtn: { marginTop: 10, borderWidth: 2, borderColor: colors.primary, padding: 12, borderRadius: 12, alignItems: 'center' },
  backText: { color: colors.primary, fontWeight: '800' },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 16,
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
