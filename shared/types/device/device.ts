export const DEVICE_CATEGORIES = ['smartphone', 'wearable', 'accessory'] as const;

export type DeviceCategoryType = (typeof DEVICE_CATEGORIES)[number];

export const DEVICE_BADGES = ['new', 'sale', 'top'] as const;

export type DeviceBadgeType = (typeof DEVICE_BADGES)[number];

export type SmartphoneSpecsType = {
  display: string;
  storage: string;
  battery: string;
};

export type WearableSpecsType = {
  display: string;
  storage: string;
  battery: string;
};

export type AccessorySpecsType = {
  type: string;
  anc: string;
  battery: string;
};

type BaseDeviceType = {
  id: string;
  slug: string;
  brand: string;
  model: string;

  priceMDL: number;
  oldPriceMDL: number | null;

  inStock: boolean;

  badge: DeviceBadgeType | null;

  image: string;
};

export type SmartphoneDeviceType = {
  category: 'smartphone';
  specs: SmartphoneSpecsType;
} & BaseDeviceType;

export type WearableDeviceType = {
  category: 'wearable';
  specs: WearableSpecsType;
} & BaseDeviceType;

export type AccessoryDeviceType = {
  category: 'accessory';
  specs: AccessorySpecsType;
} & BaseDeviceType;

export type DeviceType = SmartphoneDeviceType | WearableDeviceType | AccessoryDeviceType;
