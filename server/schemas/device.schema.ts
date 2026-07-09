import { z } from 'zod';

const BaseSchema = z.object({
  id: z.string(),
  slug: z.string(),

  brand: z.string(),
  model: z.string(),

  priceMDL: z.number(),
  oldPriceMDL: z.number().nullable(),

  inStock: z.boolean(),

  badge: z.enum(['new', 'sale', 'top']).nullable(),

  image: z.string(),
});

const SmartphoneSchema = BaseSchema.extend({
  category: z.literal('smartphone'),

  specs: z.object({
    display: z.string(),
    storage: z.string(),
    battery: z.string(),
  }),
});

const WearableSchema = BaseSchema.extend({
  category: z.literal('wearable'),

  specs: z.object({
    display: z.string(),
    storage: z.string(),
    battery: z.string(),
  }),
});

const AccessorySchema = BaseSchema.extend({
  category: z.literal('accessory'),

  specs: z.object({
    type: z.string(),
    anc: z.string(),
    battery: z.string(),
  }),
});

export const DeviceSchema = z.discriminatedUnion('category', [
  SmartphoneSchema,
  WearableSchema,
  AccessorySchema,
]);

export const DevicesSchema = z.array(DeviceSchema);
