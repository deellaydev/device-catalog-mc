import devices from '#server/data/devices.json';
import { filterDevices } from '#server/services/device.service';
import { DevicesSchema } from '#server/schemas/device.schema';
import { ZodError } from 'zod';

export default defineEventHandler((event) => {
  try {
    const validatedDevices = DevicesSchema.parse(devices);

    const query = getQuery(event);

    return filterDevices(validatedDevices, {
      brand: query.brand as string | undefined,

      minPrice: query.minPrice ? Number(query.minPrice) : undefined,

      maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,

      sort: query.sort as 'priceAsc' | 'priceDesc' | undefined,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Data validation failed',
        data: error.issues,
      });
    }

    throw error;
  }
});
