<script setup lang="ts">
import {
  required,
  minLength,
  maxLength,
  numeric,
  helpers,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const props: any = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const toast: any = useNuxtApp().$toast;

const form = ref({
  first_name: props.user.first_name ?? "",
  last_name: props.user.last_name ?? "",
  hourly_rate: props.user.hourly_rate ?? "",
  gender: props.user.gender ?? "male",
  about: props.user.about ?? "",
  date_of_birth: props.user.date_of_birth ?? "",
  phone: props.user.phone_number ?? "",
  email: props.user.email ?? "",
  address: props.user.address ?? "",
  city: props.user.city ?? "",
  country: props.user.country ?? "",
  profile_image: props.user.profile_image ?? "",
  profile_banner: props.user.profile_banner ?? "",
  company_name: props.user.company_name ?? "",
});

const loading = ref(false);

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
    about: {
      required: helpers.withMessage(
        "The description field is required",
        required
      ),
      minLength: helpers.withMessage(
        "The description field must be at least 64 characters",
        minLength(64)
      ),
      maxLength: helpers.withMessage(
        "The description field must be at most 512 characters",
        maxLength(512)
      ),
    },
  };
});

const v$ = useVuelidate(rules, form.value);

const submit = async () => {
  loading.value = true;

  v$.value.$validate();

  if (!v$.value.$error) {
    const response: any = await updateProfile(form.value);

    if (response.status.value === "success") {
      toast.success("Profile updated successfully");
    } else {
      toast.error(response.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } else {
    toast.error("Please fill in all required fields", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  loading.value = false;
};
</script>

<template>
  <form @submit.prevent="submit" class="flex flex-col p-6 gap-2">
    <h4 class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-4 border-l-4 border-[--primary-color] text-base">
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
        <p class="mb-4">
          Upload a profile photo to make your profile stand out
        </p>

        <FormElementsFileUpload
          v-model="form.profile_image"
          name="profile_image"
          id="profile_image"
          width="270"
          height="270"
        />
      </div>
    </div>

    <div class="flex flex-col mb-6">
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
          className="profile-banner"
        />
      </div>
    </div>

    <h4
      class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-4 border-l-4 border-[--primary-color] text-base"
    >
      Your Details
    </h4>

    <div class="flex gap-2 mb-6 px-6">
      <div class="flex-1">
        <FormElementsCountrySelect
          v-model="form.country"
          placeholder="Select a country"
          :selectedOption="form.country"
        />
      </div>

      <FormElementsInput
        v-model="form.city"
        type="text"
        placeholder="City"
        name="city"
      />
    </div>

    <div class="flex justify-end p-6 w-full bg-white rounded-md">
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