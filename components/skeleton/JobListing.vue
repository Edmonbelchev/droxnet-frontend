<script setup lang="ts">
defineProps({
  count: {
    type: Number,
    default: 10,
  },
});
</script>


<template>
  <div class="rounded-md gap-8 flex flex-col">
    <SkeletonUserCard v-for="index in count" :key="index" />
  </div>
</template>