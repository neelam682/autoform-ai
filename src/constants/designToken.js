// src/constants/designTokens.js

export const COLORS = {
  // Apple-style grayscale
  gray: {
    50: '#F2F2F7',
    100: '#E5E5EA',
    200: '#D1D1D6',
    300: '#C7C7CC',
    400: '#AEAEB2',
    500: '#8E8E93',
    600: '#636366',
    700: '#48484A',
    800: '#3A3A3C',
    900: '#1C1C1E',
  },
  // System colors
  blue: {
    DEFAULT: '#007AFF',
    dark: '#005FC7',
  },
  green: {
    DEFAULT: '#34C759',
  },
  red: {
    DEFAULT: '#FF3B30',
  },
  yellow: {
    DEFAULT: '#FFCC00',
  },
  background: {
    light: '#FFFFFF',
    dark: '#000000',
    soft: '#F9F9F9',
  }
};

export const TYPOGRAPHY = {
  fontFamily: {
    base: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: '"SF Pro Display", -apple-system, sans-serif',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '30px',
  },
};

export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
};

export const RADIUS = {
  sm: '6px',
  md: '12px',
  lg: '16px',
  full: '9999px',
};

export const SHADOWS = {
  subtle: '0 1px 2px rgba(0,0,0,0.06)',
  soft: '0 4px 8px rgba(0,0,0,0.08)',
  card: '0 6px 20px rgba(169, 42, 42, 0.1)',
};

export const BUTTON = {
  base: 'font-medium transition duration-200 ease-in-out rounded-md px-4 py-2',
  primary: 'bg-blue-DEFAULT text-white hover:bg-blue-dark',
  danger: 'bg-red-DEFAULT text-white hover:opacity-90',
  outline: 'border border-gray-300 text-gray-800 hover:bg-gray-100',
};

export const INPUT = {
  base: 'block w-full border rounded-md px-3 py-2',
  focus: 'focus:outline-none focus:ring-2 focus:ring-blue-DEFAULT',
  error: 'border-red-DEFAULT text-red-DEFAULT',
};
