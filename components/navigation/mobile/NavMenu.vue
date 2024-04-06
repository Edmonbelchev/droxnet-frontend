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
    class="flex flex-col lg:hidden fixed top-0 h-full w-3/4 bg-white pt-4 b-8 z-50 border-r transition-all ease-in-out duration-500"
    :class="{ 'left-0': showNavMenu, '-left-[100%]': !showNavMenu }"
  >
    <div class="px-4 pb-4 border-b border-gray-200 flex justify-between">
      <Logo class="w-32 block"/>

      <button type="button">
        <Icon
          class="text-2xl"
          :name="showNavMenu ? 'heroicons-solid:x' : 'heroicons-solid:menu'"
          @click="$emit('hideNavMenu')"
        />
      </button>
    </div>

    <NavigationMobileNavItem
      :text="item.text"
      :route="item.route"
      :dropdownElements="item.dropdownElements"
      v-for="(item, index) in navigationItems"
      :key="index"
    />
  </ul>
</template>