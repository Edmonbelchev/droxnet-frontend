<script setup lang="ts">
const authStore: any = useAuthStore();

const navigationItems = [
  {
    text: "How It Works",
    route: "/how-it-works",
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
        },
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
    },
  },
  {
    text: "View Freelancers",
    route: "/",
  },
];

const profileMenu = [
  {
    text: "My Profile",
    route: "/profile",
  },
  {
    text: "Settings",
    route: "/",
  },
  {
    text: "Sign out",
    method: "signOut",
  },
];

const showNavMenu: Ref<boolean> = ref(false);
const showLoader: Ref<boolean> = ref(false);

const signOut = async () => {
  showLoader.value = true;
  showNavMenu.value = false;

  const response = await authStore.signOut();

  if (response) {
    showLoader.value = false;
  }
};
</script>

<template>
  <div class="lg:flex p-4 md:py-2 lg:px-4 justify-between items-center max-w-[1920px] mx-auto">
    <Logo class="lg:w-36 md:w-44 lg:auto md:flex md:justify-center md:w-full" />

    <div class="flex gap-4 items-center md:justify-around">
      <NavigationDesktopNavMenu :navigationItems="navigationItems" />

      <NavigationMobileNavMenu
        :navigationItems="navigationItems"
        :showNavMenu="showNavMenu"
        @hideNavMenu="showNavMenu = false"
        @signOut="signOut"
      />

      <button
        type="button"
        class="md:hidden"
        @click="showNavMenu = !showNavMenu"
      >
        <Icon
          class="text-2xl"
          :name="showNavMenu ? 'heroicons-solid:x' : 'heroicons-solid:menu'"
        />
      </button>

      <div
        class="hidden relative md:flex items-center gap-4 md:pl-4 md:before:content-[''] md:before:h-[30px] md:before:w-[1px] md:before:bg-gray-200 md:before:absolute md:before:left-0"
      >
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
            :dropdownElements="profileMenu"
            @signOut="signOut"
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

  <div 
    class="fixed top-0 bg-black/50 w-full h-full z-10 transition-all duration-300 cursor-pointer"
    :class="{ 'visible opacity-[100%]': showNavMenu, 'invisible opacity-0': !showNavMenu}"
    @click="showNavMenu = false"
  ></div>

  <div 
    class="fixed inset-0 w-full h-full flex justify-center items-center transition-all bg-gray-200/50 z-50"
    :class="{ 'visible opacity-[100%]': showLoader, 'invisible opacity-0': !showLoader}"
  >
    <Loader width="100" height="100" />
  </div>
</template>
