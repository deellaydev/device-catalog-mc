<script setup lang="ts">
import type { DeviceType } from '#shared/types/device';

defineProps<{
  device: DeviceType;
}>();
</script>

<template>
  <article class="card">
    <div class="image-wrapper">
      <img :src="device.image" :alt="`${device.brand} ${device.model}`" />

      <span v-if="device.badge" class="badge">
        {{ device.badge }}
      </span>
    </div>

    <div class="content">
      <span class="brand">
        {{ device.brand }}
      </span>

      <h3>
        {{ device.model }}
      </h3>

      <div class="price">
        <strong> {{ device.priceMDL }} MDL </strong>

        <del v-if="device.oldPriceMDL"> {{ device.oldPriceMDL }} MDL </del>
      </div>

      <div class="specs">
        <template v-if="device.category === 'smartphone'">
          <span>
            {{ device.specs.display }}
          </span>

          <span>
            {{ device.specs.storage }}
          </span>

          <span>
            {{ device.specs.battery }}
          </span>
        </template>

        <template v-else-if="device.category === 'wearable'">
          <span>
            {{ device.specs.display }}
          </span>

          <span>
            {{ device.specs.storage }}
          </span>

          <span>
            {{ device.specs.battery }}
          </span>
        </template>

        <template v-else>
          <span>
            {{ device.specs.type }}
          </span>

          <span>
            {{ device.specs.anc }}
          </span>

          <span>
            {{ device.specs.battery }}
          </span>
        </template>
      </div>

      <div class="stock" :class="{ disabled: !device.inStock }">
        {{ device.inStock ? 'В наличии' : 'Нет в наличии' }}
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
}

.image-wrapper {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--color-text);
  color: var(--color-bg);
  font-size: 12px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
}

.brand {
  opacity: 0.6;
  font-size: 14px;
}

h3 {
  margin: 0;
  font-size: 20px;
}

.price {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price strong {
  font-size: 20px;
}

.price del {
  opacity: 0.5;
}

.specs {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  opacity: 0.8;
}

.stock {
  margin-top: auto;
  font-size: 14px;
}

.stock.disabled {
  opacity: 0.5;
}
</style>
