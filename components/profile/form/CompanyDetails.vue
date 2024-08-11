
<script setup lang="ts">
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";
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
  tagline: props.user.tagline ?? "",
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
  company_details: {
    company_name: props.user.company_details?.company_name ?? "",
    company_size: props.user.company_details?.company_size ?? "",
    department: props.user.company_details?.department ?? "",
    company_website: props.user.company_details?.company_website ?? "",
  },
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
    country: {
      required: helpers.withMessage("The country field is required", required),
    },
    company_details: {
      department: {
        required: helpers.withMessage(
          "The department field is required",
          required
        ),
      },
    },
  };
});

const v$ = useVuelidate(rules, form.value);

const submit = async () => {
  loading.value = true;

  v$.value.$validate();

  if (!v$.value.$error) {
    await updateProfile(form.value);
  } else {
    toast.error("Please fill in all required fields", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  loading.value = false;
};
</script>

<template>
  <form @submit.prevent="submit" class="flex flex-col p-4 md:p-6 gap-2">
    <ProfileFormDetails :user="user" :form="form" :v$="v$" />

    <div class="flex justify-end pb-2 md:p-6 w-full bg-white rounded-md">
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