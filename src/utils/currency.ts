export const formatZAR = (value: number): string => {
  // Use Intl.NumberFormat for proper localization support
  try {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    // Fallback to simple formatting if Intl is not available
    return `R${value.toFixed(2)}`;
  }
};
