<script setup lang="ts">
import type { DeviceType } from '#shared/types/device';
import DeviceCard from '~/components/device/DeviceCard.vue';

defineProps<{
  devices: DeviceType[];
}>();
</script>

<template>
  <section class="device-grid">
    <DeviceCard v-for="device in devices" :key="device.id" :device="device" />
  </section>
</template>

<style scoped>
.device-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  width: 100%;
}
</style>
