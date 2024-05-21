<script setup lang="ts">
const props = defineProps({
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

const activeTab = ref(1);

const submit = async () => {
  loading.value = true

  const response: any = await updateProfile(form.value);

  if (response.status.value === "success") {
    toast.success("Profile updated successfully");
  } else {
    toast.error(response.error, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  loading.value = false;
};
</script>

<template>
  <form @submit.prevent="submit" class="flex flex-col justify-center items-center max-w-[1200px] mx-auto gap-4">
    <div class="flex flex-col bg-white rounded-md w-full">
      <h2 class="border-b p-6 text-[--text-color] text-lg">My Profile</h2>
  
      <div class="flex">
        <div class="flex flex-col border-r min-w-[290px]">
          <button
            class="text-left text-base p-6"
            :class="{
              'border-l-2 border-[--primary-color] text-[--text-color]':
                activeTab === 1,
            }"
            type="button"
            @click="activeTab = 1"
          >
            Personal Details & Skills
          </button>
  
          <button
            class="text-left text-base p-6"
            :class="{
              'border-l-2 border-[--primary-color] text-[--text-color]':
                activeTab === 2,
            }"
            type="button"
            @click="activeTab = 2"
          >
            Experience & Education
          </button>
  
          <button
            class="text-left text-base p-6"
            :class="{
              'border-l-2 border-[--primary-color] text-[--text-color]':
                activeTab === 3,
            }"
            type="button"
            @click="activeTab = 3"
          >
            Projects & Awards
          </button>
        </div>
  
        <div class="flex-1">
          <ProfileFormDetailsAndSkills :form="form" />
        </div>
      </div>
    </div>

    <div class="flex justify-end p-6 w-full bg-white rounded-md">
      <button type="submit" class="primary-button uppercase flex gap-2 items-center">
        Save & Update
        <Loader width="14" v-if="loading" />
      </button>
    </div>
  </form>
</template>