<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  dropdownElements: {
    type: Object,
  },
});
</script>

<template>
  <li class="relative group/parent">
    <slot name="element">
      <NuxtLink
        :to="route"
        class="text-base py-2 my-4 relative text-[--gray-color] block after:content-[''] after:invisible after:absolute after:bottom-0 after:left-0 after:right-0 after:m-auto after:opacity-0 after:w-[10px] after:h-[2px] after:bg-[--primary-color] after:transition-all after:duration-300 hover:after:w-[20px] hover:after:opacity-[100%] hover:after:visible"
      >
        {{ text }}
      </NuxtLink>

      <NavigationMobileDropdownElement v-if="dropdownElements" :dropdownElements="dropdownElements" />
    </slot>
  </li>
</template>