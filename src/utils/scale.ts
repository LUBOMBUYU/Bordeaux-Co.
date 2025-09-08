import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Base dimensions (iPhone 11 as reference)
const baseWidth = 375;
const baseHeight = 812;

// Scaling factors
const widthScale = screenWidth / baseWidth;
const heightScale = screenHeight / baseHeight;
const scale = Math.min(widthScale, heightScale); // Use the smaller scale to maintain aspect ratio

/**
 * Scale a size based on screen width
 * @param size - The base size to scale
 * @returns Scaled size
 */
export const scaleWidth = (size: number): number => size * widthScale;

/**
 * Scale a size based on screen height
 * @param size - The base size to scale
 * @returns Scaled size
 */
export const scaleHeight = (size: number): number => size * heightScale;

/**
 * Scale a size based on the minimum scale factor (maintains aspect ratio)
 * @param size - The base size to scale
 * @returns Scaled size
 */
export const scaleSize = (size: number): number => size * scale;

/**
 * Scale font size with moderate scaling
 * @param size - The base font size
 * @returns Scaled font size
 */
export const scaleFont = (size: number): number => {
  const scaled = size * scale;
  // Limit font scaling to prevent too large/small fonts
  return Math.round(Math.max(size * 0.8, Math.min(scaled, size * 1.4)));
};

/**
 * Get responsive margin/padding
 * @param size - The base size
 * @returns Scaled size
 */
export const scaleMargin = (size: number): number => scaleSize(size);

/**
 * Get responsive padding
 * @param size - The base size
 * @returns Scaled size
 */
export const scalePadding = (size: number): number => scaleSize(size);
