<script setup lang="ts">
import { useTheme } from '~/composables/useTheme';

const { initTheme } = useTheme();

onMounted(() => {
  initTheme();
});
</script>

<template>
  <ThemeToggle />
  <NuxtPage />
</template>
