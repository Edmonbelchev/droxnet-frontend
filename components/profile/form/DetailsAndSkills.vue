<script setup lang="ts">
import { required, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const props: any = defineProps({
  form: {
    type: Object,
    required: true,
  },
});

const rules = computed(() => {
  return {
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
    hourly_rate: {
      number: helpers.withMessage(
        "The hourly rate field must be a number",
        required
      ),
    },
    about: {
      required: helpers.withMessage(
        "The description field is required",
        required
      ),
    },
  };
});

const v$ = useVuelidate(rules, props.form);

const previewProfileAvatarImage = ref(props.form.profile_image ?? null);
const previewProfileBannerImage = ref(props.form.profile_banner ?? null);
</script>

<template>
  <div class="flex flex-col p-6 gap-2">
    <h4
      class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-6 border-l-4 border-[--primary-color] text-base"
    >
      Your Details
    </h4>

    <div class="flex gap-2 px-6">
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

    <div class="flex gap-2 px-6">
      <div class="flex-1">
        <select
          class="bg-white border rounded-md px-4 w-full h-[50px] uppercase"
          name="gender"
          id="gender"
          v-model="form.gender"
        >
          <option value="male" :selected="form.gender == 'male'">Male</option>
          <option value="female" :selected="form.gender == 'female'">
            Female
          </option>
        </select>
      </div>

      <FormElementsInput
        v-model="form.hourly_rate"
        type="number"
        placeholder="Your Service Hourly Rate ($)"
        name="hourly_rate"
        :error="v$.hourly_rate.$error"
        :valid="!v$.hourly_rate.$invalid"
        :errorMessages="v$.hourly_rate.$errors"
        @touch="v$.hourly_rate.$touch"
      />
    </div>

    <div class="flex gap-2 mb-6 px-6">
      <FormElementsTextarea
        name="about"
        v-model="form.about"
        placeholder="Description"
        :error="v$.about.$error"
        :valid="!v$.about.$invalid"
        :errorMessages="v$.about.$errors"
        @touch="v$.about.$touch"
      />
    </div>

    <div class="flex flex-col mb-6">
      <h4
        class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-4 border-l-4 border-[--primary-color] text-base"
      >
        Profile Photo
      </h4>

      <div class="flex flex-col px-6">
        <p class="mb-4">Upload a profile photo to make your profile stand out</p>
    
        <FormElementsFileUpload
          v-model="form.profile_image"
          name="profile_image"
          id="profile_image"
          width="270"
          height="270"
        />
      </div>
  
    </div>

    <div class="flex flex-col">
      <h4
        class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-4 border-l-4 border-[--primary-color] text-base"
      >
        Banner Photo
      </h4>
  
      <div class="flex flex-col px-6">
        <p class="mb-4">Upload a banner photo to make your profile stand out</p>
    
        <FormElementsFileUpload
          v-model="form.profile_banner"
          name="profile_banner"
          id="profile_banner"
          width="800"
          height="166"
          imageName="Profile Banner"
        />
      </div>
    </div>
  </div>
</template>