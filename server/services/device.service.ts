import type { DeviceType, GetDevicesQueryType } from '#shared/types/device';

export function filterDevices(devices: DeviceType[], query: GetDevicesQueryType) {
  let result = [...devices];

  if (query.brand) {
    result = result.filter((d) => d.brand.toLowerCase() === query.brand!.toLowerCase());
  }

  if (query.minPrice !== undefined) {
    result = result.filter((d) => d.priceMDL >= query.minPrice!);
  }

  if (query.maxPrice !== undefined) {
    result = result.filter((d) => d.priceMDL <= query.maxPrice!);
  }

  if (query.sort === 'priceAsc') {
    result.sort((a, b) => a.priceMDL - b.priceMDL);
  }

  if (query.sort === 'priceDesc') {
    result.sort((a, b) => b.priceMDL - a.priceMDL);
  }

  return result;
}
