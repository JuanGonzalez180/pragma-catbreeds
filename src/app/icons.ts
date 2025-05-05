import { addIcons } from 'ionicons';
import { 
  star, 
  locationOutline, 
  bulbOutline,
  bulb,
  expandOutline,
  contractOutline,
} from 'ionicons/icons';

/**
 * Registers the application's Ionicons icons for use throughout the app.
 */
export function registerIcons(): void {
  addIcons({
    'star': star,
    'location-outline': locationOutline,
    'bulb-outline': bulbOutline,
    'bulb': bulb,
    'expand-outline': expandOutline,
    'contract-outline': contractOutline,
  });
}