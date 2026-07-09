import devices from '#server/data/devices.json';
import { ZodError } from 'zod';
import { DevicesSchema } from '#server/schemas/device.schema';

export default defineEventHandler((event) => {
  try {
    const validatedDevices = DevicesSchema.parse(devices);

    const { id } = getRouterParams(event);

    const device = validatedDevices.find((d) => d.id === id);

    if (!device) {
      throw createError({
        status: 404,
        statusText: 'Device not found',
      });
    }

    return device;
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
