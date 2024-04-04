<script setup lang="ts">
const authStore: any = useAuthStore();

const navigationItems = ref([
  {
    text: "How It Works",
    route: "/",
    dropdownElements: {
      element1: {
        text: "Element 1",
        route: "/",
      },
      element2: {
        text: "Element 2",
        route: "/",
      },
      element3: {
        text: "Element 3",
        route: "/",
        dropdownElements: {
          element1: {
            text: "Element 1",
            route: "/",
          },
          element2: {
            text: "Element 2",
            route: "/",
          },
          element3: {
            text: "Element 3",
            route: "/",
          },
          element4: {
            text: "Element 4",
            route: "/",
          },
          element5: {
            text: "Element 5",
            route: "/",
          },
        },
      },
      element4: {
        text: "Element 4",
        route: "/",
      },
      element5: {
        text: "Element 5",
        route: "/",
      },
    },
  },
  {
    text: "Browse Jobs",
    route: "/",
    dropdownElements: {
          element1: {
            text: "Element 1",
            route: "/",
          },
          element2: {
            text: "Element 2",
            route: "/",
          },
          element3: {
            text: "Element 3",
            route: "/",
          },
        }
  },
  {
    text: "View Freelancers",
    route: "/",
  },
]);
const showNavMenu: Ref<boolean> = ref(false);
</script>

<template>
  <div class="flex px-4 justify-between items-center">
    <Logo />

    <div class="flex gap-4 items-center">
      <NavigationDesktopNavMenu :navigationItems="navigationItems" />
      <NavigationMobileNavMenu :navigationItems="navigationItems" :showNavMenu="showNavMenu" />

      <button type="button" class="md:hidden" @click="showNavMenu = !showNavMenu">
        <Icon
          class="text-2xl"
          :name="showNavMenu ? 'heroicons-solid:x' : 'heroicons-solid:menu'"
        />
      </button>

      <div class="relative flex items-center gap-4 pl-4 before:content-[''] before:h-[30px] before:w-[1px] before:bg-gray-200 before:absolute before:left-0">
        <div
          class="flex items-center py-4 gap-4 group/parent relative"
          v-if="authStore.loggedIn"
        >
          <ProfileAvatar />

          <span>
            {{ authStore.user.first_name }}
            {{ authStore.user.last_name }}
          </span>

          <NavigationDesktopDropdownElement
            :dropdownElements="navigationItems"
          />
        </div>

        <div class="flex gap-4 items-center" v-else>
          <NuxtLink to="/login" class="text-blue-400">Login</NuxtLink>

          <NuxtLink
            to="/register"
            class="bg-[--primary-color] text-white px-4 py-2 rounded"
            >Join now</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
