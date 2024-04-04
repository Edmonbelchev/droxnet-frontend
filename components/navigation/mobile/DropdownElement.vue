<script setup lang="ts">
defineProps({
  dropdownElements: {
    type: Object,
  },
});


</script>

<template>
  <ul class=""
    v-if="dropdownElements"
  >
    <li
      class="relative group z-10"
      v-for="(element, index) in dropdownElements"
      :key="index"
    >
      <NuxtLink
        :to="element.route"
        class="relativ"
      >
        {{ element.text }}

        <span v-if="element.dropdownElements">
          <Icon class="text-lg" name="heroicons-solid:chevron-right" />
        </span>
      </NuxtLink>

      <ul class="">
        <li
          v-for="(subElement, index) in element.dropdownElements"
          :key="index"
        >
          <NuxtLink
            :to="subElement.route"
            class="relative text-[--gray-color] px-4 py-3 block border-b text-sm"
          >
            {{ subElement.text }}
          </NuxtLink>
        </li>
      </ul>
    </li>
  </ul>
</template>