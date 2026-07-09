<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const brands = ['Apple', 'Samsung', 'Xiaomi', 'Google', 'Motorola', 'Huawei', 'TCL', 'Nokia'];

const brand = ref((route.query.brand as string) || '');

const minPrice = ref(Number(route.query.minPrice) || null);

const maxPrice = ref(Number(route.query.maxPrice) || null);

const sort = ref((route.query.sort as string) || '');

function updateFilters() {
  router.push({
    query: {
      ...(brand.value && {
        brand: brand.value,
      }),

      ...(minPrice.value && {
        minPrice: minPrice.value,
      }),

      ...(maxPrice.value && {
        maxPrice: maxPrice.value,
      }),

      ...(sort.value && {
        sort: sort.value,
      }),
    },
  });
}

function resetFilters() {
  brand.value = '';
  minPrice.value = null;
  maxPrice.value = null;
  sort.value = '';

  router.push({
    query: {},
  });
}
</script>

<template>
  <section class="filters" aria-label="Device filters">
    <div class="field">
      <label for="brand"> Brand </label>

      <select id="brand" v-model="brand" @change="updateFilters">
        <option value="">All brands</option>

        <option v-for="item in brands" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
    </div>

    <div class="field">
      <label for="min"> Min price </label>

      <input id="min" v-model.number="minPrice" type="number" min="0" @change="updateFilters" />
    </div>

    <div class="field">
      <label for="max"> Max price </label>

      <input id="max" v-model.number="maxPrice" type="number" min="0" @change="updateFilters" />
    </div>

    <div class="field">
      <label for="sort"> Sort </label>

      <select id="sort" v-model="sort" @change="updateFilters">
        <option value="">Default</option>

        <option value="price_asc">Price low → high</option>

        <option value="price_desc">Price high → low</option>
      </select>
    </div>

    <button type="button" @click="resetFilters">Reset</button>
  </section>
</template>

<style scoped>
.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;

  padding: 20px;
  margin-bottom: 24px;

  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
}

.field input,
.field select {
  width: 100%;
  height: 42px;

  padding: 0 12px;

  background: var(--color-bg);
  color: var(--color-text);

  border: 1px solid var(--color-border);
  border-radius: 10px;

  font-size: 14px;

  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.field input::placeholder {
  color: var(--color-text);
  opacity: 0.5;
}

.field input:focus,
.field select:focus {
  border-color: var(--color-text);
  box-shadow: 0 0 0 3px rgb(127 127 127 / 15%);
}

button {
  align-self: end;
  height: 42px;
  padding: 0 20px;
  border: none;
  border-radius: 10px;
  background: var(--color-text);
  color: var(--color-bg);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition:
    opacity 0.2s ease,
    transform 0.15s ease;
}

button:hover {
  opacity: 0.9;
}

button:active {
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .filters {
    grid-template-columns: 1fr;
  }

  button {
    width: 100%;
  }
}
</style>
