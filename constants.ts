
import { Phone } from './types';

export const BRANDS = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Sony', 'Oppo', 'Vivo'];

const MODELS: Record<string, string[]> = {
  'Apple': ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 14 Plus', 'iPhone 13 Mini', 'iPhone 15', 'iPhone 14 Pro'],
  'Samsung': ['Galaxy S24 Ultra', 'Galaxy Z Fold 5', 'Galaxy S23 FE', 'Galaxy A54', 'Galaxy S24+', 'Galaxy S22 Ultra'],
  'Google': ['Pixel 8 Pro', 'Pixel 7a', 'Pixel Fold', 'Pixel 8', 'Pixel 6 Pro'],
  'OnePlus': ['OnePlus 12', 'OnePlus 11 5G', 'OnePlus Open', 'Nord CE 3'],
  'Xiaomi': ['14 Ultra', 'Redmi Note 13 Pro+', 'Xiaomi 13T Pro', 'POCO X6 Pro'],
  'Sony': ['Xperia 1 V', 'Xperia 5 V', 'Xperia 10 V'],
  'Oppo': ['Find X7 Ultra', 'Reno 11 Pro', 'Find N3'],
  'Vivo': ['X100 Pro', 'V30 Pro', 'iQOO 12']
};

/**
 * Model-specific high-quality image mapping.
 * Curated from Unsplash to match specific device models as closely as possible.
 */
const MODEL_IMAGES: Record<string, string> = {
  // Apple Specifics
  'iPhone 15 Pro Max': 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800',
  'iPhone 15 Pro': 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800',
  'iPhone 15': 'https://images.unsplash.com/photo-1695048132843-ef880579e000?auto=format&fit=crop&q=80&w=800',
  'iPhone 14 Pro': 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&q=80&w=800',
  'iPhone 14 Plus': 'https://images.unsplash.com/photo-1664447972814-386055bc7948?auto=format&fit=crop&q=80&w=800',
  'iPhone 13 Mini': 'https://images.unsplash.com/photo-1635324211327-142805179040?auto=format&fit=crop&q=80&w=800',
  
  // Samsung Specifics
  'Galaxy S24 Ultra': 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800',
  'Galaxy Z Fold 5': 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&q=80&w=800',
  'Galaxy S23 FE': 'https://images.unsplash.com/photo-1678911820845-668875e6082c?auto=format&fit=crop&q=80&w=800',
  'Galaxy S24+': 'https://images.unsplash.com/photo-1644310972589-643a2099d946?auto=format&fit=crop&q=80&w=800',
  'Galaxy S22 Ultra': 'https://images.unsplash.com/photo-1644310903029-1eead470042d?auto=format&fit=crop&q=80&w=800',
  'Galaxy A54': 'https://images.unsplash.com/photo-1610945264445-5af61f0906a1?auto=format&fit=crop&q=80&w=800',
  
  // Google Specifics
  'Pixel 8 Pro': 'https://images.unsplash.com/photo-1595941069915-4ebc5197c14a?auto=format&fit=crop&q=80&w=800',
  'Pixel Fold': 'https://images.unsplash.com/photo-1683533658514-c13636f014e3?auto=format&fit=crop&q=80&w=800',
  'Pixel 8': 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800',
  'Pixel 7a': 'https://images.unsplash.com/photo-1565849906461-0ee43c82952d?auto=format&fit=crop&q=80&w=800',
  'Pixel 6 Pro': 'https://images.unsplash.com/photo-1634140029989-91361093116a?auto=format&fit=crop&q=80&w=800',
  
  // OnePlus Specifics
  'OnePlus 12': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800',
  'OnePlus Open': 'https://images.unsplash.com/photo-1551817958-1110f7abe53f?auto=format&fit=crop&q=80&w=800',
  'OnePlus 11 5G': 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&q=80&w=800',
  
  // Xiaomi Specifics
  '14 Ultra': 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&q=80&w=800',
  'Redmi Note 13 Pro+': 'https://images.unsplash.com/photo-1533228891704-8f5ec358622e?auto=format&fit=crop&q=80&w=800',
  
  // Sony Specifics
  'Xperia 1 V': 'https://images.unsplash.com/photo-1544244015-0cd4b3ff3f9d?auto=format&fit=crop&q=80&w=800',
  'Xperia 5 V': 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=800',
  
  // Oppo / Vivo / Fallbacks
  'Oppo': 'https://images.unsplash.com/photo-1573148195900-7845dcb9b127?auto=format&fit=crop&q=80&w=800',
  'Vivo': 'https://images.unsplash.com/photo-1605236453023-494020121769?auto=format&fit=crop&q=80&w=800',
  'Generic': 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=800'
};

const getModelImage = (brand: string, model: string): string => {
  if (MODEL_IMAGES[model]) return MODEL_IMAGES[model];
  if (MODEL_IMAGES[brand]) return MODEL_IMAGES[brand];
  
  // Deterministic fallback based on the model name's character codes to ensure stability
  const charSum = model.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const keys = Object.keys(MODEL_IMAGES);
  const fallbackKey = keys[charSum % keys.length];
  return MODEL_IMAGES[fallbackKey] || MODEL_IMAGES['Generic'];
};

export const generatePhones = (count: number): Phone[] => {
  const phones: Phone[] = [];
  for (let i = 0; i < count; i++) {
    const brand = BRANDS[i % BRANDS.length];
    const brandModels = MODELS[brand] || ['Titanium Flagship'];
    // Rotate through models to ensure all 200+ spots are filled with high-quality branded entries
    const model = brandModels[Math.floor(i / BRANDS.length) % brandModels.length];
    
    // Original prices range from $1199 to $1899 for high-end perception
    const originalPrice = 1199 + (i % 701); 
    // Discount percentage strictly between 69% and 79%
    const discountPercentage = 69 + (i % 11);
    
    const imageUrl = getModelImage(brand, model);
    
    phones.push({
      id: `lux-v3-final-${i}`,
      brand,
      model,
      originalPrice,
      discountPercentage,
      imageUrl,
      specs: [
        'Advanced Titanium Grade-5 Chassis',
        '6.8" Super Retina XDR LTPO Display',
        '8K Pro-Res Cinematic Recording',
        'IP69 Deep-Water Resistance'
      ],
      trending: i % 12 === 0
    });
  }
  return phones;
};

export const AD_CLIENT_ID = 'ca-pub-1609026564473378';
