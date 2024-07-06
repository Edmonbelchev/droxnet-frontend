<script setup lang="ts">
defineProps({
  title: {
    type: String,
  },
});

const { breadcrumbs } = useBreadcrumbs();
</script>

<template>
  <div class="relative px-4 min-h-[300px] w-full flex">
    <img src="/images/breadcrumb-bg.webp" alt="Breadcrumb Background Image" class="absolute w-full h-full inset-0 object-cover" />

    <div class="relative flex flex-col w-full items-center justify-center">
        <h1 class="text-5xl font-bold text-white mb-4" v-if="title">
          {{ title }}
        </h1>

        <Breadcrumbs :breadcrumbs="breadcrumbs" />
    </div>
  </div>
</template>