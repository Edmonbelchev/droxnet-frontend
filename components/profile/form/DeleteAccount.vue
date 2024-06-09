<script setup lang="ts">
import { required, minLength, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const form = ref({
  password: "",
  confirm_password: "",
  reason: "",
  description: "",
});

const toast: any = useNuxtApp().$toast;
const loading = ref(false);

const samePassword = (param: string) => {
  return helpers.withParams(
    { type: "different", value: param },
    (value: string) => value === param
  );
};

const rules = computed(() => {
  return {
    password: {
      required: helpers.withMessage("The password field is required", required),
      minLength: helpers.withMessage(
        "The new password field must be at least 8 characters",
        minLength(8)
      ),
    },
    confirm_password: {
      required: helpers.withMessage(
        "The confirm password field is required",
        required
      ),
      // Check if its the same as the password
      samePassword: helpers.withMessage(
        "The confirm password must be the same as the password",
        samePassword(form.value.password)
      ),
      minLength: helpers.withMessage(
        "Confirm password field must be at least 8 characters",
        minLength(8)
      ),
    },
    reason: {
      required: helpers.withMessage("The reason field is required", required),
    },
  };
});

const v$ = useVuelidate(rules, form);

const submit = async () => {
  // Validate the form
  v$.value.$touch();

  if (!v$.value.$invalid) {
    loading.value = true;

    const response = await deleteProfile(form.value);

    if (response.status.value == "success") {
      toast.loading("Profile deleted, logging out...", { autoClose: 3000 });

      setTimeout(() => {
        window.location.href = "/";
      }, 3000);

      setTimeout(() => {
        const authStore: any = useAuthStore();
        authStore.loggedIn = false;
        authStore.user = null;
      }, 3100);
    } else {
      toast.error(response.error, { autoClose: 3000 });
      loading.value = false;
    }
  }
};
</script>

<template>
  <form @submit.prevent="submit" class="flex flex-col p-4 md:p-6 gap-2">
    <h4
      class="mb-2 bg-[--background-color] text-[--text-color] py-3 px-4 border-l-4 border-[--primary-color] text-base flex"
    >
      Delete account
    </h4>

    <div class="flex gap-2 flex-col sm:flex-row">
      <FormElementsInput
        v-model="form.password"
        type="password"
        placeholder="Enter your current password"
        required
        :error="v$.password.$error"
        :valid="!v$.password.$invalid"
        :errorMessages="v$.password.$errors"
        @touch="v$.password.$touch"
      />

      <FormElementsInput
        v-model="form.confirm_password"
        type="password"
        placeholder="Confirm your password"
        required
        :error="v$.confirm_password.$error"
        :valid="!v$.confirm_password.$invalid"
        :errorMessages="v$.confirm_password.$errors"
        @touch="v$.confirm_password.$touch"
      />
    </div>

    <div class="flex flex-col gap-2 flex-1">
      <div class="relative">
        <select
          class="text-xs md:text-sm w-full px-4 py-2 min-h-[46px] sm:min-h-[50px] rounded border focus:border-[--primary-color] transition-all duration-300 bg-white"
          :class="{ 'border-red-500': v$.reason.$error }"
          v-model="form.reason"
          name="reason"
          id="reason"
          :error="v$.reason.$error"
          :valid="!v$.reason.$invalid"
          :errorMessages="v$.reason.$errors"
          @touch="v$.reason.$touch"
        >
          <option value="" disabled selected>Select a reason</option>
          <option value="personal">Personal</option>
          <option value="business">Business</option>
          <option value="other">Other</option>
        </select>

        <span
          class="text-red-500 text-xs"
          v-for="(error, index) in v$.reason.$errors"
          :key="index"
        >
          {{ error.$message }}
        </span>
      </div>
    </div>

    <FormElementsTextarea
      v-model="form.description"
      placeholder="Description (optional)"
    />

    <div class="flex justify-end w-full bg-white rounded-md">
      <button
        type="submit"
        class="primary-button uppercase flex gap-2 items-center"
        :class="loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
        :disabled="loading"
      >
        Delete Account
        <Loader width="14" v-if="loading" />
      </button>
    </div>
  </form>
</template>