<script setup lang="ts">
defineProps({
  dropdownElements: {
    type: Object,
  },
  showDropdown: {
    type: Boolean,
    default: false,
  },
});

const showSubDropdown = ref(false);
</script>

<template>
  <ul
    class="flex flex-col overflow-hidden transition-all ease-in-out relative"
    v-if="dropdownElements"
    :class="{ 'max-h-[999px]': showDropdown, 'max-h-0': !showDropdown }"
  >
    <li
      class="relative group z-10"
      v-for="(element, index) in dropdownElements"
      :key="index"
    >
      <NuxtLink
        :to="element.route"
        class="relative text-[--gray-color] px-6 py-3 border-b text-sm flex justify-between"
      >
        {{ element.text }}
      </NuxtLink>

      <button
        class="absolute right-0 top-[10px] px-4"
        type="button"
        v-if="element.dropdownElements"
        @click="showSubDropdown = !showSubDropdown"
      >
        <Icon
          class="text-lg transition-all duration-300"
          :class="{ 'transform rotate-90': showSubDropdown }"
          name="heroicons-solid:chevron-right"
        />
      </button>

      <ul
        class="flex flex-col overflow-hidden transition-all ease-in-out"
        :class="{
          'max-h-[999px]': showSubDropdown,
          'max-h-0': !showSubDropdown,
        }"
      >
        <li
          v-for="(subElement, index) in element.dropdownElements"
          :key="index"
        >
          <NuxtLink
            :to="subElement.route"
            class="relative text-[--gray-color] px-8 py-3 block border-b text-sm"
          >
            {{ subElement.text }}
          </NuxtLink>
        </li>
      </ul>
    </li>
  </ul>
</template>