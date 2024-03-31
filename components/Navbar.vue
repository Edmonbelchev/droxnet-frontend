<script setup lang="ts">
const authStore: any = useAuthStore();
</script>

<template>
  <div class="flex px-4 justify-between items-center">
    <Logo />

    <div class="flex gap-4 items-center">
      <ul class="flex gap-6">
        <NavItem
          text="How it Works"
          route="/"
          :dropdownElements="{
            element1: {
              text: 'Element 1',
              route: '/',
            },
            element2: {
              text: 'Element 2',
              route: '/',
            },
            element3: {
              text: 'Element 3',
              route: '/',
            },
          }"
        />

        <NavItem text="Browse Jobs" route="/" />

        <NavItem text="Hire Freelancers" route="/" />
      </ul>

      <div
        class="flex items-center gap-4 my-4 border-l pl-4"
        v-if="!authStore.loggedIn"
      >
        <img
          class="w-9 h-9"
          src="~/assets/images/user-login.webp"
          alt="User Logo"
        />

        <NuxtLink to="/login" class="text-blue-400">Login</NuxtLink>

        <NuxtLink
          to="/register"
          class="bg-[--primary-color] text-white px-4 py-2 rounded"
          >Join now</NuxtLink
        >
      </div>

      <div class="flex items-center gap-4 my-4 border-l pl-4" v-else>
        {{ authStore.user.email }}
      </div>
    </div>
  </div>
</template>
