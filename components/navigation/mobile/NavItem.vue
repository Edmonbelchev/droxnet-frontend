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

const showDropdown = ref(false);
</script>

<template>
  <li class="relative group/parent">
    <slot name="element">
      <NuxtLink
        :to="route"
        class="relative text-[--gray-color] px-4 py-3 flex justify-between"
        :class="{ 'border-b': !dropdownElements }"
      >
        {{ text }}
      </NuxtLink>

      <button
        class="absolute right-0 top-[12px] px-4"
        type="button"
        @click="showDropdown = !showDropdown"
        v-if="dropdownElements"
      >
        <Icon
          class="text-lg transition-all duration-300"
          :class="{ 'transform rotate-90': showDropdown }"
          name="heroicons-solid:chevron-right"
        />
      </button>

      <NavigationMobileDropdownElement
        v-if="dropdownElements"
        :dropdownElements="dropdownElements"
        :showDropdown="showDropdown"
      />
    </slot>
  </li>
</template>