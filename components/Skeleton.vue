<script setup lang="ts">
defineProps({
  className: {
    type: String,
    default: "w-full h-4",
  },
});
</script>

<template>
  <div :class="['animate-pulse bg-gray-100', className]"></div>
</template>
  