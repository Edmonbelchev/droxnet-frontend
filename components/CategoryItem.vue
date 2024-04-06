
<script setup lang="ts">

defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  }
});
</script>

<template>
  <div
    class="min-w-64 min-h-64 border rounded-sm py-8 px-6 justify-center items-center flex flex-col group overflow-hidden relative"
  >
    <img
      :src="image"
      alt="Category Image"
      class="group-hover:-translate-y-40 relative duration-500 mb-4"
    />

    <NuxtLink :to="route" class="group-hover:-translate-y-20 relative duration-500 text-lg text-[--text-color] hover:text-[--primary-color]">
      {{ title }}
    </NuxtLink>

    <div class="flex flex-col items-center gap-4 absolute -bottom-[100%] group-hover:bottom-[35%] group-hover:translate-y-1/2 transition-all duration-500">
        <p class="text-center text-sm">
          {{ description }}
        </p>
        <NuxtLink :to="route" class="text-[--blue-color] hover:text-[--primary-color]">Explore</NuxtLink>
    </div>
  </div>
</template>