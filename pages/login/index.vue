<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

// Access the auth store
const authStore: any = useAuthStore()

const form: Ref<any> = ref({
  email: "",
  password: ""
});

const login = async () => {
  // Call the authenticate action
 await authStore.signIn(form)
}
</script>

<template>
  <NuxtLayout name="default">
    <form class="flex flex-col items-center justify-center p-20" @submit.prevent="login">
      <div class="flex flex-col gap-4">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email" />
      </div>

      <div class="flex flex-col gap-4">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="form.password" />
      </div>

      <div class="flex gap-4 items-center">
        <input type="checkbox" id="remember" />
        <label for="remember">Remember me</label>
      </div>

      <div class="flex gap-4 items-center">
        <button class="bg-[--primary-color] text-white px-4 py-2 rounded">
          Login
        </button>
        <NuxtLink to="/" class="text-blue-400">Forgot Password?</NuxtLink>
      </div>
    </form>
  </NuxtLayout>
</template>