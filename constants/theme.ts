/**
 * Centralized color system for consistent theming across light and dark modes.
 * Uses semantic color names for production-ready consistency.
 * Reference: Material Design 3 color system
 */

import { Platform } from "react-native";

// Semantic base colors
const primaryLight = "#4f46e5"; // Indigo
const primaryDark = "#a5b4fc"; // Light Indigo
const surfaceLight = "#ffffff";
const surfaceDark = "#151718";
const errorLight = "#dc2626";
const errorDark = "#fca5a5";
const successLight = "#16a34a";
const successDark = "#86efac";
const warningLight = "#ea580c";
const warningDark = "#fdba74";

export const Colors = {
  light: {
    // Semantic colors
    primary: primaryLight,
    secondary: "#7c3aed", // Violet
    error: errorLight,
    success: successLight,
    warning: warningLight,

    // Surface & background
    background: "#f8fafc", // Slate 50
    surface: surfaceLight,
    surfaceVariant: "#f1f5f9", // Slate 100

    // Text & content
    text: "#0f172a", // Slate 900
    textSecondary: "#475569", // Slate 600
    textTertiary: "#64748b", // Slate 500
    textDisabled: "#cbd5e1", // Slate 300

    // Icon & UI elements
    icon: "#64748b", // Slate 500
    iconSecondary: "#94a3b8", // Slate 400
    iconDisabled: "#cbd5e1", // Slate 300

    // Tab navigation
    tabIconDefault: "#94a3b8", // Slate 400
    tabIconSelected: primaryLight,

    // Legacy compatibility
    tint: primaryLight,

    // Border & divider
    border: "#e2e8f0", // Slate 200
    borderVariant: "#f1f5f9", // Slate 100

    // Status specific
    successBackground: "#dcfce7", // Green 100
    errorBackground: "#fee2e2", // Red 100
    warningBackground: "#fed7aa", // Orange 100
  },
  dark: {
    // Semantic colors
    primary: primaryDark,
    secondary: "#d8b4fe", // Light Violet
    error: errorDark,
    success: successDark,
    warning: warningDark,

    // Surface & background
    background: "#0f172a", // Slate 900
    surface: surfaceDark,
    surfaceVariant: "#1e293b", // Slate 800

    // Text & content
    text: "#f1f5f9", // Slate 100
    textSecondary: "#cbd5e1", // Slate 300
    textTertiary: "#94a3b8", // Slate 400
    textDisabled: "#475569", // Slate 600

    // Icon & UI elements
    icon: "#cbd5e1", // Slate 300
    iconSecondary: "#94a3b8", // Slate 400
    iconDisabled: "#475569", // Slate 600

    // Tab navigation
    tabIconDefault: "#94a3b8", // Slate 400
    tabIconSelected: primaryDark,

    // Legacy compatibility
    tint: primaryDark,

    // Border & divider
    border: "#334155", // Slate 700
    borderVariant: "#1e293b", // Slate 800

    // Status specific
    successBackground: "#064e3b", // Green 900
    errorBackground: "#7f1d1d", // Red 900
    warningBackground: "#92400e", // Orange 900
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
