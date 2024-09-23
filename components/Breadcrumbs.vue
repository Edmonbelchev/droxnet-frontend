<script setup lang="ts">
defineProps({
  breadcrumbs: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <nav class="inline-flex items-center text-sm font-normal font-body">
    <ol class="flex w-auto leading-none group md:flex-wrap">
      <li
        v-for="(item, index) in breadcrumbs"
        :key="index"
        class="flex items-center text-white md:text-lg"
      >
        <NuxtLink
          :to="item.path"
          v-if="index === 0"
        >Home</NuxtLink>

        <span
          v-if="index % 1 == 0 && index != 0"
          class="mx-2 text-xs"
        >/</span>

        <div v-if="index !== 0">
          <NuxtLink 
            :to="item.path" v-if="index + 1 !== breadcrumbs.length">
            {{ item.name }}
          </NuxtLink>

          <span :class="{'text-gray-400' : index + 1 == breadcrumbs.length }" v-else>{{ item.name }}</span>
        </div>
      </li>
    </ol>
  </nav>
</template>
  