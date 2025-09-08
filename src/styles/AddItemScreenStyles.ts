import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
  // Main container with consistent spacing
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  // Form section styling
  formContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },

  // Section headers
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },

  // Form labels with consistent typography
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },

  // Input fields with improved styling
  input: {
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: colors.text,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },

  // Multiline input for description
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 14,
  },

  // Disabled input styling for permission restrictions
  inputDisabled: {
    backgroundColor: colors.card,
    borderColor: colors.muted,
    opacity: 0.6,
  },

  // Picker container with consistent styling
  pickerWrap: {
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },

  // Permission indicator text
  permissionText: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 6,
    fontStyle: 'italic',
  },

  // Action buttons container
  actionContainer: {
    marginTop: 32,
  },

  // Primary save button with enhanced styling
  saveBtn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  saveText: {
    color: colors.bg,
    fontSize: 18,
    fontWeight: '700',
  },

  // Secondary navigation buttons
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
  },

  navBtn: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },

  navBtnText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },

  // Back button styling
  backBtn: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 16,
  },

  backText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },

  // Validation and feedback styling
  errorText: {
    color: colors.danger,
    fontSize: 14,
    marginTop: 6,
  },

  successText: {
    color: colors.success,
    fontSize: 14,
    marginTop: 6,
  },

  // Loading state styling
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },

  loadingText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
});
