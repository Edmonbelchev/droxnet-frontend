<script setup>
import { useAuthStore } from "@/stores/auth";
import { required, minLength, sameAs, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

const route = useRoute();
const router = useRouter();
const toast = useNuxtApp().$toast;

// Access the auth store
const authStore = useAuthStore();
const isLoading = ref(false);

const form = ref({
  email: route.query.email,
  token: route.query.token,
  password: "",
  password_confirmation: "",
});

const resetPassword = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    isLoading.value = true;
  
    const response = await authStore.resetPassword(form.value);
  
    if (response.status.value === "success") {
      toast.success("Password reset successfully. You can now log in with your new password.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.push("/login");
    } else {
      toast.error(response.errorMessage || "Failed to reset password. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  
    isLoading.value = false;
  }
};

const rules = computed(() => {
  return {
    password: {
      required: helpers.withMessage('The password field is required', required),
      minLength: helpers.withMessage('The password must be at least 8 characters', minLength(8)),
    },
    password_confirmation: {
      required: helpers.withMessage('The password confirmation field is required', required),
      sameAsPassword: helpers.withMessage('The passwords do not match', sameAs(form.value.password)),
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
        @submit.prevent="resetPassword"
      >
        <h2 class="text-2xl text-gray-800 font-bold text-center">Reset Password</h2>

        <span class="text-xs text-center mb-4">
          Enter your new password below.
        </span>

        <FormElementsInput
          v-model="form.password"
          type="password"
          placeholder="New Password"
          name="password"
          :error="v$.password.$error"
          :valid="!v$.password.$invalid"
          :errorMessages="v$.password.$errors"
          @touch="v$.password.$touch"
        />

        <FormElementsInput
          v-model="form.password_confirmation"
          type="password"
          placeholder="Confirm New Password"
          name="password_confirmation"
          :error="v$.password_confirmation.$error"
          :valid="!v$.password_confirmation.$invalid"
          :errorMessages="v$.password_confirmation.$errors"
          @touch="v$.password_confirmation.$touch"
        />
  
        <div class="flex flex-col gap-4" :class="{ 'pointer-events-none animate-pulse' : isLoading}">
          <button class="bg-[--primary-color] text-white px-4 py-2 rounded w-full">
            <div v-if="isLoading" class="flex items-center justify-center gap-1">
              Resetting Password...
              <Loader width="14" height="14" strokeWidth="8" color="text-gray-600" />
            </div>
            <span v-else>Reset Password</span>
          </button>
          <NuxtLink to="/login" class="text-blue-400 text-center">Back to Login</NuxtLink>
        </div>
      </form>
    </div>
  </NuxtLayout>
</template>