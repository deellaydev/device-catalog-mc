<script setup lang="ts">
import { useTheme } from '~/composables/useTheme';

const { theme, toggleTheme } = useTheme();
</script>

<template>
  <button class="theme-toggle" type="button" @click="toggleTheme">
    {{ theme === 'light' ? '🌙' : '☀️' }}
  </button>
</template>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background: var(--color-card);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  transform: scale(1.05);
}
</style>
