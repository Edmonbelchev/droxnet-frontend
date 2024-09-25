<script setup>
import { useAuthStore } from "@/stores/auth";
import { required, email, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

const toast = useNuxtApp().$toast;

// Access the auth store
const authStore = useAuthStore();
const isLoading = ref(false);
const isSubmitted = ref(false); // New ref to track submission status

const form = ref({
  email: "",
});

const resetPassword = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    // Set the loading state
    isLoading.value = true;
  
    // Call the reset password action (you'll need to implement this in your auth store)
    const response = await authStore.forgotPassword(form.value.email)

    console.log(response)
  
    if (response.status.value != "error") {
      // Show success message
      toast.success("Password reset instructions sent to your email", {
        position: toast.POSITION.TOP_RIGHT,
      });
      isSubmitted.value = true; // Set to true on successful submission
    } else {
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
  };
});

const v$ = useVuelidate(rules, form);
</script>

<template>
  <NuxtLayout name="default">
    <div class="bg-[--background-color] py-10 px-4 md:px-10 md:py-20 flex justify-center">
      <div
        class="flex flex-col p-8 lg:p-10 gap-4 max-w-[500px] w-full bg-white rounded-md"
      >
        <h2 class="text-2xl text-gray-800 font-bold text-center">Forgot Password</h2>

        <template v-if="!isSubmitted">
          <span class="text-xs text-center mb-4">
            Enter your email address and we'll send you instructions to reset your password.
          </span>

          <form @submit.prevent="resetPassword">
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
    
            <div class="flex flex-col gap-4 mt-4" :class="{ 'pointer-events-none animate-pulse' : isLoading}">
              <button class="bg-[--primary-color] text-white px-4 py-2 rounded w-full">
                <div v-if="isLoading" class="flex items-center justify-center gap-1">
                  Sending...
                  <Loader width="14" height="14" strokeWidth="8" color="text-gray-600" />
                </div>
                <span v-else>Reset Password</span>
              </button>
            </div>
          </form>
        </template>

        <template v-else>
          <p class="text-center text-green-600">
            Password reset instructions have been sent to your email. Please check your inbox and follow the instructions to reset your password.
          </p>
        </template>

        <NuxtLink to="/login" class="text-blue-400 text-center mt-4">Back to Login</NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>