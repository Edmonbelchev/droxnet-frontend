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
              dropdownElements: {
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
                element4: {
                  text: 'Element 4',
                  route: '/',
                },
                element5: {
                  text: 'Element 5',
                  route: '/',
                },
              }
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
        class="flex items-center gap-4 border-l pl-4"
      >
      
      <div class="flex items-center py-4 gap-4 group/parent relative" v-if="authStore.loggedIn">
        <ProfileAvatar />
          <span>
            {{ authStore.user.first_name }}
            {{ authStore.user.last_name }}
          </span>
  
          <DropdownElement :dropdownElements="{
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
                element4: {
                  text: 'Element 4',
                  route: '/',
                },
                element5: {
                  text: 'Element 5',
                  route: '/',
                },
              }" />
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
