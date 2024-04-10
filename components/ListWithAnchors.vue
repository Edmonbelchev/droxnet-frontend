<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <ul class="pl-0">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="py-1 hover:translate-x-2 duration-500"
    >
      <a
        :href="'#' + item.id"
        :class="{
          'text-blue-400': index === items.length - 1,
          'text-sm': true,
        }"
      >
        {{ item.name }}
      </a>
    </li>
  </ul>
</template>
