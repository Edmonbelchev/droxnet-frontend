<script setup>
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const props = defineProps({
  form: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits(["changeStep"]);

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

const changeStep = () => {
  v$.value.$validate();
  
  if (!v$.value.$error) {
    emit("changeStep", 2);
  }
};
</script>

<template>
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
      class="primary-button w-fit uppercase font-medium"
      @click="changeStep"
    >
      Start now
    </button>
  </div>

  <div class="mt-6 flex flex-col items-center text-center gap-2 px-10">
    <h4 class="text-[--text-color] text-lg">Join Now With</h4>
    <p class="text-base mb-4">
      Use a social account for faster login or easy registration to directly
      get in to your account and start a good business
    </p>

    <div class="flex gap-2">
      <button class="bg-[#1877f2] text-white px-4 py-2.5 rounded flex items-center gap-2 shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
        <Icon name="logos:facebook" class="text-lg" />
        <span class="pl-3 border-l border-white/50">Facebook</span>
      </button>

      <button class="bg-[#1da1f2] text-white px-4 py-2.5 rounded flex items-center gap-2 shadow-lg hover:shadow-[#1da1f2]/50 transition-all duration-300">
        <Icon name="uil:twitter" class="text-lg" />
        <span class="pl-3 border-l border-white/50">Twitter</span>
      </button>

      <button class="bg-[#dc4d42] text-white px-4 py-2.5 rounded flex items-center gap-2 shadow-lg hover:shadow-[#dc4d42]/50 transition-all duration-300">
        <Icon name="logos:google-plus" class="text-2xl" />
        <span class="pl-3 border-l border-white/50">Google</span>
      </button>

      <button class="bg-[#e4405f] text-white px-4 py-2.5 rounded flex items-center gap-2 shadow-lg hover:shadow-[#e4405f]/50 transition-all duration-300">
        <Icon name="uil:instagram" class="text-lg" />
        <span class="pl-3 border-l border-white/50">Instagram</span>
      </button>
    </div>
  </div>
</template>