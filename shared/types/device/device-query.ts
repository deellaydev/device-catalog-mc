export type GetDevicesQueryType = {
  brand?: string;

  minPrice?: number;
  maxPrice?: number;

  sort?: 'priceAsc' | 'priceDesc';
};
