// Color Palette Configuration
// Blue + Emerald Green theme for Choice Properties

export const colors = {
  primary: {
    light: "#60a5fa",    // Blue 400
    base: "#3b82f6",     // Blue 500 (main)
    dark: "#2563eb",     // Blue 600
    darker: "#1e40af",   // Blue 800
  },
  accent: {
    light: "#4ade80",    // Emerald 400
    base: "#22c55e",     // Emerald 500 (main)
    dark: "#16a34a",     // Emerald 600
    darker: "#15803d",   // Emerald 700
  },
  neutral: {
    white: "#ffffff",
    light: "#f9fafb",    // Gray 50
    lighter: "#f3f4f6",  // Gray 100
    medium: "#d1d5db",   // Gray 300
    dark: "#4b5563",     // Gray 600
    darker: "#1f2937",   // Gray 800
  },
  semantic: {
    success: "#22c55e",  // Green
    warning: "#f59e0b",  // Amber
    error: "#ef4444",    // Red
    info: "#3b82f6",     // Blue
  },
};

// Color usage guide
export const colorUsage = {
  primaryButton: "bg-primary-base hover:bg-primary-dark",
  secondaryButton: "bg-accent-base hover:bg-accent-dark",
  textPrimary: "text-primary-darker",
  textAccent: "text-accent-dark",
  border: "border-neutral-medium",
  background: "bg-neutral-light",
  cardHover: "hover:shadow-lg hover:border-accent-light",
};
