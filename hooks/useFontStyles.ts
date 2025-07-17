import { FontPreset } from '../components/FontSwitcher';

export const useFontStyles = (preset: FontPreset) => {  const getFontFamily = (element: 'typewriter' | 'typewriter-main' | 'typewriter-school' | 'carousel' | 'button' | 'button-main' | 'copyright') => {
    switch (preset) {
      case 'current':        switch (element) {
          case 'typewriter': // For "Coming" text
            return "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
          case 'typewriter-main': // For "December 2025"
            return "'Charm', cursive";
          case 'typewriter-school': // For "Iroquois Ridge Highschool"
            return "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
          case 'carousel':
            return "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
          case 'button': // For "Archive" text
            return "'Charm', cursive";
          case 'button-main': // For the rest of button text
            return "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
          case 'copyright':
            return "'Charm', cursive";
        }
        break;
      case 'inter':
        return "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      case 'cmd':
        return "'Consolas', 'Courier New', monospace";
      default:
        return "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    }
  };
  const getTextStyles = (element: 'typewriter' | 'typewriter-main' | 'typewriter-school' | 'carousel' | 'button' | 'button-main' | 'copyright') => {
    const fontFamily = getFontFamily(element);
    
    return {
      fontFamily,
      fontWeight: preset === 'cmd' ? 600 : 
                  element === 'typewriter-school' ? 'normal' : // Keep school name unbolded
                  (element === 'typewriter' || element === 'typewriter-main' || element === 'button' || element === 'button-main' || element === 'copyright') ? 700 : 
                  'inherit'
    };
  };

  return { getTextStyles };
};
