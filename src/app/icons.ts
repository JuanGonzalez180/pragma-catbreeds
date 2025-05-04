import { addIcons } from 'ionicons';
import { 
  star, 
  locationOutline, 
  bulbOutline,
  bulb,
} from 'ionicons/icons';

export function registerIcons(): void {
  addIcons({
    'star': star,
    'location-outline': locationOutline,
    'bulb-outline': bulbOutline,
    'bulb': bulb,
  });
}