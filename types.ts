
export interface Phone {
  id: string;
  brand: string;
  model: string;
  originalPrice: number;
  discountPercentage: number;
  imageUrl: string;
  specs: string[];
  trending: boolean;
}

export enum AdType {
  BANNER = 'banner',
  SIDEBAR = 'sidebar',
  IN_FEED = 'in-feed',
}
