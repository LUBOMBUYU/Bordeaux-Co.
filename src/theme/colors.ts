/**
 * Color Theme Configuration
 *
 * This file defines the color palette for the Christoffel's Menu application.
 * The theme uses a dark color scheme with gold accents for an elegant restaurant feel.
 *
 * Color Usage Guidelines:
 * - primary: Main brand color (gold) - used for titles, active states, primary buttons
 * - accent: Secondary brand color (orange) - used for highlights and accents
 * - bg: Main background color (black) - provides contrast for content
 * - text: Primary text color (white) - ensures readability on dark background
 * - card: Card/container backgrounds (dark gray) - subtle elevation from main background
 * - border: Border colors (medium gray) - subtle separation between elements
 * - shadow: Shadow color (semi-transparent white) - creates depth in dark theme
 */

export const colors = {
  // Brand Colors
  primary: '#FFD700',     // Gold - main brand color for titles and primary actions
  accent: '#FFA500',      // Orange - secondary brand color for accents

  // Background Colors
  bg: '#000000',          // Black - main app background
  card: '#1A1A1A',        // Dark gray - card and container backgrounds

  // Text Colors
  white: '#FFFFFF',       // Pure white for maximum contrast
  text: '#FFFFFF',        // Primary text color (white for dark theme)
  muted: '#B0B0B0',       // Light gray for secondary text and muted elements

  // Semantic Colors
  danger: '#FF4444',      // Red - for delete actions and errors
  success: '#4CAF50',     // Green - for success states and confirmations
  warning: '#FF9800',     // Orange - for warnings and alerts
  info: '#2196F3',        // Blue - for informational messages

  // UI Element Colors
  border: '#333333',      // Dark gray - borders and dividers
  shadow: 'rgba(255, 255, 255, 0.1)', // Light shadow - creates depth in dark theme
};
