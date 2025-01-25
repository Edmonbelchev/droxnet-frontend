<script setup lang="ts">
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

const authStore: any = useAuthStore();
</script>

<template>
  <div
    class="flex flex-col lg:hidden fixed top-0 h-full w-3/4 bg-white pt-4 b-8 border-r transition-all ease-in-out duration-500 z-40"
    :class="{ 'left-0': showNavMenu, '-left-[100%]': !showNavMenu }"
  >
    <div class="px-4 pb-4 border-b border-gray-200 flex justify-between">
      <Logo class="w-36 block" />

      <button type="button">
        <Icon
          class="text-2xl"
          :name="showNavMenu ? 'heroicons-solid:x' : 'heroicons-solid:menu'"
          @click="$emit('hideNavMenu')"
        />
      </button>
    </div>

    <div class="border-b px-4" v-if="authStore.loggedIn">
      <div class="flex items-center gap-4 py-4">
        <ProfileAvatar :avatar="authStore.user.profile_image" />

        <div class="flex flex-col">
          <span class="text-sm">
            {{ authStore.user.first_name }}
            {{ authStore.user.last_name }}
          </span>
          <span class="text-xs">Freelancer</span>
        </div>
      </div>
    </div>

    <ul>
      <NavigationMobileNavItem
        :text="item.text"
        :route="item.route"
        :dropdownElements="item.dropdownElements"
        v-for="(item, index) in navigationItems"
        :key="index"
      />
    </ul>

    <div class="px-4 py-3" v-if="authStore.loggedIn">
      <button
        type="button"
        class="flex gap-2 items-center"
        @click="$emit('signOut')"
      >
        <Icon class="text-lg" name="heroicons-solid:logout" />

        Logout
      </button>
    </div>

    <div
      class="absolute bottom-0 left-0 w-full flex gap-4 px-4 py-4 border-t items-center justify-between"
      v-else
    >
      <NuxtLink 
        to="/login" 
        class="bg-[--secondary-color] text-white text-xs p-3 rounded flex-1 flex items-center justify-center gap-1"
      >
        <Icon class="text-lg" name="heroicons-solid:login" />
        Login
      </NuxtLink>

      <NuxtLink
        to="/register"
        class="bg-[--primary-color] text-white text-xs p-3 rounded flex-1 flex items-center justify-center gap-1"
        >
         <Icon class="text-lg" name="heroicons-solid:user-add" />
          Join now
        </NuxtLink
      >
    </div>
  </div>
</template>