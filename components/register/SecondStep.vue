<script setup>
import { required, minLength, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(["register"]);

const rules = computed(() => {
  return {
    password: {
      required: helpers.withMessage("The password field is required", required),
      minLength: helpers.withMessage(
        "The password field must be at least 8 characters",
        minLength(8)
      ),
    },
    password_confirmation: {
      required: helpers.withMessage(
        "The confirm password field is required",
        required
      ),
      sameAsPassword: helpers.withMessage(
        "The confirm password field must be the same as the password field",
        (value) => value === props.form.password
      ),
    },
    terms: {
      required: helpers.withMessage(
        "The terms and conditions field is required",
        (value) => value === true
      ),
    },
  };
});

const v$ = useVuelidate(rules, props.form);

const submitRegister = () => {
  v$.value.$validate();

  if (!v$.value.$error) {
    emit("register");
  }
};
</script>

<template>
  <FormElementsCountrySelect
    v-model="form.location"
    placeholder="Select a country"
    :selectedOption="form.location"
  />

  <div class="flex flex-col sm:flex-row gap-4 w-full">
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

    <FormElementsInput
      v-model="form.password_confirmation"
      type="password"
      placeholder="Confirm Password"
      name="password_confirmation"
      :error="v$.password_confirmation.$error"
      :valid="!v$.password_confirmation.$invalid"
      :errorMessages="v$.password_confirmation.$errors"
      @touch="v$.password_confirmation.$touch"
    />
  </div>

  <div class="flex flex-col">
    <label class="border p-4 text-[--text-color] cursor-pointer border-b-0" for="employer">
        <input
            type="radio"
            name="role"
            id="employer"
            class="mr-2"
            v-model="form.role"
            value="employer"
        />
        Company
        <span class="text-gray-400 text-xs">(Signup as company/service seeker & post jobs)</span>
    </label>

    <label class="border p-4 text-[--text-color] cursor-pointer" for="freelancer">
        <input
            type="radio"
            name="role"
            id="freelancer"
            class="mr-2"
            v-model="form.role"
            value="freelancer"
        />
        Freelancer
    </label>
  </div>

  <label class="text-xs sm:text-sm text-gray-800" for="terms">
    <input type="checkbox" id="terms" class="mr-2" v-model="form.terms" />
    I agree to the terms and conditions
  </label>

  <span v-if="v$.terms.$error" class="text-red-500 text-xs sm:text-sm ">
    The terms and conditions field is required
  </span>

  <div class="flex gap-4">
    <button
      type="button"
      class="primary-button px-10 uppercase font-medium flex items-center gap-2"
      @click="submitRegister"
    >
      Continue
      <Loader width="12" v-if="isLoading" />
    </button>

    <button
      type="button"
      class="primary-button px-10 line-h-[20px] uppercase font-medium"
      @click="$emit('changeStep', 1)"
    >
      Back
    </button>
  </div>
</template>