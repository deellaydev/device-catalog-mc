<script setup lang="ts">
import type { Device } from '#shared/schemas/device';

const route = useRoute();

const id = route.params.id as string;

const { data: device, error } = await useFetch<Device>(`/api/devices/${id}`);

if (error.value) {
  throw createError({
    status: 404,
    statusText: 'Device not found',
  });
}

useSeoMeta({
  title: () => `${device.value?.brand} ${device.value?.model}`,

  description: () =>
    `${device.value?.brand} ${device.value?.model} — ${device.value?.priceMDL} MDL`,

  ogTitle: () => `${device.value?.brand} ${device.value?.model}`,

  ogDescription: () => `${device.value?.brand} ${device.value?.model}`,

  ogImage: () => device.value?.image,
});
</script>

<template>
  <main v-if="device" class="device-page">
    <NuxtLink to="/" class="back-link"> ← Back </NuxtLink>

    <div class="device-layout">
      <div class="device-image">
        <img :src="device.image" :alt="`${device.brand} ${device.model}`" />
      </div>

      <div>
        <p class="brand">
          {{ device.brand }}
        </p>

        <h1>
          {{ device.model }}
        </h1>

        <p class="category">
          {{ device.category }}
        </p>

        <div class="price">
          <strong>{{ device.priceMDL }} MDL</strong>

          <del v-if="device.oldPriceMDL"> {{ device.oldPriceMDL }} MDL </del>
        </div>

        <p :class="['stock', { 'stock--out': !device.inStock }]">
          {{ device.inStock ? 'In stock' : 'Out of stock' }}
        </p>

        <section class="specs">
          <h2>Specifications</h2>

          <dl>
            <div v-for="(value, key) in device.specs" :key="key">
              <dt>{{ key }}</dt>
              <dd>{{ value }}</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped>
.device-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px;
}

.back-link {
  display: inline-block;

  margin-bottom: 24px;

  color: var(--color-text);
  text-decoration: none;

  opacity: 0.7;

  transition: opacity 0.2s ease;
}

.back-link:hover {
  opacity: 1;
}

.device-layout {
  display: grid;

  grid-template-columns: minmax(300px, 420px) 1fr;

  gap: 40px;
}

.device-image {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 32px;

  background: var(--color-card);

  border: 1px solid var(--color-border);
  border-radius: 16px;
}

.device-image img {
  width: 100%;
  max-height: 420px;

  object-fit: contain;
}

.brand {
  margin: 0 0 8px;

  font-size: 14px;

  color: var(--color-text);

  opacity: 0.6;
}

h1 {
  margin: 0 0 12px;

  color: var(--color-text);

  font-size: 40px;
}

.category {
  margin: 0 0 24px;

  color: var(--color-text);

  opacity: 0.6;

  text-transform: capitalize;
}

.price {
  display: flex;

  align-items: center;

  gap: 12px;

  margin-bottom: 20px;
}

.price strong {
  color: var(--color-text);

  font-size: 32px;
}

.price del {
  color: var(--color-text);

  opacity: 0.5;
}

.stock {
  display: inline-block;

  margin-bottom: 32px;
  padding: 8px 14px;

  color: var(--color-text);

  border: 1px solid var(--color-border);
  border-radius: 999px;
}

.stock--out {
  opacity: 0.5;
}

.specs {
  padding: 24px;

  background: var(--color-card);

  border: 1px solid var(--color-border);
  border-radius: 16px;
}

.specs h2 {
  margin: 0 0 20px;

  color: var(--color-text);

  font-size: 22px;
}

.specs dl {
  display: flex;

  flex-direction: column;

  gap: 12px;

  margin: 0;
}

.specs dl div {
  display: flex;

  justify-content: space-between;

  gap: 20px;

  padding-bottom: 12px;

  border-bottom: 1px solid var(--color-border);
}

.specs dl div:last-child {
  border-bottom: none;
}

.specs dt {
  color: var(--color-text);

  font-weight: 600;

  text-transform: capitalize;
}

.specs dd {
  margin: 0;

  color: var(--color-text);

  opacity: 0.7;

  text-align: right;
}

@media (max-width: 768px) {
  .device-page {
    padding: 20px 16px;
  }

  .device-layout {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 32px;
  }

  .specs dl div {
    flex-direction: column;
    gap: 6px;
  }

  .specs dd {
    text-align: left;
  }
}
</style>
