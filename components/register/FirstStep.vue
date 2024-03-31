<script setup>
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const props = defineProps({
  form: {
    type: Object,
    required: true,
  }
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("The email field is required", required),
      email: helpers.withMessage("Invalid email format", email),
    },
    first_name: {
      required: helpers.withMessage(
        "The first name field is required",
        required
      ),
    },
    last_name: {
      required: helpers.withMessage(
        "The last name field is required",
        required
      ),
    },
  };
});

const v$ = useVuelidate(rules, props.form);
</script>

<template>
  <span class="text-xs text-center mb-4">
    Consectetur adipisicing elit sed dotem eiusmod tempor incune utnaem labore
    etdolore maigna aliqua enim poskina
  </span>

  <div class="flex gap-4 w-full">
    <FormElementsInput
      v-model="form.first_name"
      type="text"
      placeholder="First Name"
      name="first_name"
      :error="v$.first_name.$error"
      :valid="!v$.first_name.$invalid"
      :errorMessages="v$.first_name.$errors"
      @touch="v$.first_name.$touch"
    />

    <FormElementsInput
      v-model="form.last_name"
      type="text"
      placeholder="Last Name"
      name="last_name"
      :error="v$.last_name.$error"
      :valid="!v$.last_name.$invalid"
      :errorMessages="v$.last_name.$errors"
      @touch="v$.last_name.$touch"
    />
  </div>

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

  <div class="flex flex-col gap-4">
    <button
      class="bg-[--primary-color] text-white px-8 py-3 rounded w-fit uppercase font-medium"
    >
      Start now
    </button>
  </div>
</template>