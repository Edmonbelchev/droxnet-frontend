<script setup lang="ts">
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
              route: '/element-1',
            },
            element2: {
              text: 'Element 2',
              route: '/element-2',
            },
            element3: {
              text: 'Element 3',
              route: '/element-3',
            },
          }"
        />

        <NavItem text="Browse Jobs" route="/" />

        <NavItem text="Hire Freelancers" route="/" />
      </ul>

      <div class="flex items-center gap-4 my-4 border-l pl-4">
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
    </div>
  </div>
</template>
