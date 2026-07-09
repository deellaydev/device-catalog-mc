<script setup lang="ts">
import type { DeviceType } from '#shared/types/device';
import FilterBar from '~/components/device/FilterBar.vue';

const route = useRoute();

const {
  data: devices,
  pending,
  error,
} = await useFetch<DeviceType[]>('/api/devices', {
  query: computed(() => ({
    brand: route.query.brand,
    minPrice: route.query.minPrice,
    maxPrice: route.query.maxPrice,
    sort: route.query.sort,
  })),
});

useSeoMeta({
  title: 'Device Catalog',
  description: 'Browse smartphones, wearables and accessories',
});
</script>

<template>
  <main>
    <h1>Devices</h1>

    <div v-if="pending">Loading...</div>

    <div v-else-if="error">Failed to load devices</div>

    <div v-else>
      <FilterBar />

      <DeviceGrid :devices="devices ?? []" />
    </div>
  </main>
</template>
