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
        class="py-2 my-4 relative text-[--gray-color] block after:content-[''] after:invisible after:absolute after:bottom-0 after:left-0 after:right-0 after:m-auto after:opacity-0 after:w-[10px] after:h-[2px] after:bg-[--primary-color] after:transition-all after:duration-300 hover:after:w-[20px] hover:after:opacity-[100%] hover:after:visible"
      >
        {{ text }}
      </NuxtLink>

      <ul
        class="absolute overflow-hidden left-0 top-[130px] dropdown-menu w-[255px] bg-white shadow shadow-black/25 border-t-2 border-[--primary-color] rounded-b-md transition-all opacity-0 duration-300 invisible group-hover/parent:top-[72px] group-hover/parent:opacity-100 group-hover/parent:visible"
        v-if="dropdownElements"
      >
        <li v-for="(element, index) in dropdownElements" :key="index">
          <NuxtLink
            :to="element.route"
            class="relative text-[--gray-color] px-4 py-3 block border-b text-sm hover:bg-gray-100/50 transition-all duration-300 hover:text-black"
          >
            {{ element.text }}
          </NuxtLink>
        </li>
      </ul>
    </slot>
  </li>
</template>