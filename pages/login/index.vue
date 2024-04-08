<script setup>
import { useAuthStore } from "@/stores/auth";
import { required, email, minLength, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

definePageMeta({
  middleware: 'auth'
})

const router = useRouter();
const toast = useNuxtApp().$toast;

// Access the auth store
const authStore = useAuthStore();
const isLoading = ref(false)

const form = ref({
  email: "",
  password: "",
});

const login = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    // Set the loading state
    isLoading.value = true;
  
    // Call the authenticate action
    const response = await authStore.signIn(form)
  
    if(response.status.value != "error") {
      // Redirect to the homepage
      router.push("/");
    }else{
      // Show error message
      toast.error(response.errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  
    // Reset the loading state
    isLoading.value = false;
  }
};

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('The email field is required', required),
      email: helpers.withMessage('Invalid email format', email),
    },
    password: {
      required: helpers.withMessage('The password field is required', required),
      minLength: minLength(8),
    },
  };
});

const v$ = useVuelidate(rules, form);
</script>

<template>
  <NuxtLayout name="default">
    <div class="bg-[--background-color] py-10 px-4 md:px-10 md:py-20 flex justify-center">
      <form
        class="flex flex-col p-8 lg:p-10 gap-4 max-w-[500px] w-full bg-white rounded-md"
        @submit.prevent="login"
      >
        <h2 class="text-2xl text-gray-800 font-bold text-center">Login</h2>

        <span class="text-xs text-center mb-4">
          Consectetur adipisicing elit sed dotem eiusmod tempor incune utnaem labore etdolore maigna aliqua enim poskina
        </span>

        <FormElementsInput
          v-model="form.email"
          type="email"
          placeholder="Email"
          name="email"
          :error="v$.email.$error"
          :valid="!v$.email.$invalid"
          :errorMessages="v$.email.$errors"
          @touch="v$.email.$touch"
        />
  
        <FormElementsInput
          v-model="form.password"
          type="password"
          placeholder="Password"
          name="password"
          :error="v$.password.$error"
          :valid="!v$.password.$invalid"
          :errorMessages="v$.password.$errors"
          @touch="v$.password.$touch"
        />
  
        <div class="flex gap-2 items-center">
          <input type="checkbox" id="remember" />
          <label for="remember">Remember me</label>
        </div>
  
        <div class="flex flex-col gap-4" :class="{ 'pointer-events-none animate-pulse' : isLoading}">
          <button class="bg-[--primary-color] text-white px-4 py-2 rounded w-full">
            <div v-if="isLoading" class="flex items-center justify-center gap-1">
              Logging in...
              <Loader width="14" height="14" strokeWidth="8" color="text-gray-600" />
            </div>
            <span v-else>Login</span>
          </button>
          <NuxtLink to="/" class="text-blue-400 ml-auto">Forgot Password?</NuxtLink>
        </div>
      </form>
    </div>
  </NuxtLayout>
</template>