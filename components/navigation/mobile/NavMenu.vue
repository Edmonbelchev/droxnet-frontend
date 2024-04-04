<script setup>
defineProps({
  navigationItems: {
    type: Array,
    required: true,
  },
  showNavMenu: {
    type: Boolean,
    default: false,
  },
});

</script>

<template>
  <ul
    class="flex flex-col lg:hidden fixed top-0 h-full w-2/4 bg-white py-8 z-50"
    :class="{ 'left-0': showNavMenu, '-left-[100%]': !showNavMenu }"
  >
    <NavigationMobileNavItem
      :text="item.text"
      :route="item.route"
      :dropdownElements="item.dropdownElements"
      v-for="(item, index) in navigationItems"
      :key="index"
    />
  </ul>
</template>