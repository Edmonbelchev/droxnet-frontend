<script setup lang="ts">
import { required, minLength, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const form = ref({
  current_password: "",
  new_password: "",
});

const toast: any = useNuxtApp().$toast;
const loading = ref(false);

const diffPassword = (param: string) => {
  return helpers.withParams(
    { type: "different", value: param },
    (value: string) => value !== param
  );
};

const rules = computed(() => {
  return {
    current_password: {
      required: helpers.withMessage("The password field is required", required),
      minLength: helpers.withMessage(
        "The new password field must be at least 8 characters",
        minLength(8)
      ),
    },
    new_password: {
      required: helpers.withMessage(
        "The new password field is required",
        required
      ),
      // Check if its different than the current password
      diffPassword: helpers.withMessage(
        "The new password must be different than the current password",
        diffPassword(form.value.current_password)
      ),
      minLength: helpers.withMessage(
        "The new password field must be at least 8 characters",
        minLength(8)
      ),
    },
  };
});

const v$ = useVuelidate(rules, form);

const submit = async () => {
  // Validate the form
  v$.value.$touch();

  if (!v$.value.$invalid) {
    loading.value = true;

    const response = await changePassword(form.value);

    if (response.status.value == "success") {
      toast.success("Password changed successfully", { autoClose: 3000 });
    } else {
      toast.error(response.error, { autoClose: 5000 });
    }

    loading.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="submit" class="flex flex-col p-4 md:p-6 gap-2">
    <h4
      class="mb-2 bg-[--background-color] text-[--text-color] py-3 px-4 border-l-4 border-[--primary-color] text-base flex"
    >
      Change Your Password
    </h4>

    <div class="flex gap-2 flex-col sm:flex-row mb-8">
      <FormElementsInput
        v-model="form.current_password"
        type="password"
        placeholder="Enter your current password"
        required
        :error="v$.current_password.$error"
        :valid="!v$.current_password.$invalid"
        :errorMessages="v$.current_password.$errors"
        @touch="v$.current_password.$touch"
      />

      <FormElementsInput
        v-model="form.new_password"
        type="password"
        placeholder="Enter your new password"
        required
        :error="v$.new_password.$error"
        :valid="!v$.new_password.$invalid"
        :errorMessages="v$.new_password.$errors"
        @touch="v$.new_password.$touch"
      />
    </div>

    <div class="flex justify-end w-full bg-white rounded-md">
      <button
        type="submit"
        class="primary-button uppercase flex gap-2 items-center"
        :class="loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
        :disabled="loading"
      >
        Save & Update
        <Loader width="14" v-if="loading" />
      </button>
    </div>
  </form>
</template>