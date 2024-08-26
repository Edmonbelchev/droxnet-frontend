<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore();
const toast: any = useNuxtApp().$toast;

const form: Ref<Object> = ref({
  title: "",
  description: "",
  level: "",
  type: "",
  budget: "",
  budget_type: "",
  duration: "",
  skills: [],
  languages: [],
  location: "",
  files: [],
  show_attachments: false,
});

const loading: Ref<boolean> = ref(false);

const submit = async () => {
  loading.value = true;

  const response = await createJob(form.value);

  if (response.status.value === "success") {
    // Redirect to the job page
    toast.success("Job created successfully");
  } else {
    toast.error(response.error, {
      autoClose: false
    });
  }

  loading.value = false;
};
</script>

<template>
  <NuxtLayout name="default">
    <div class="relative">
      <ProfileSidebarMenu :user="authStore.user" />

      <form
        @submit.prevent="submit"
        class="bg-[--background-color] py-8 px-4 md:py-10 md:px-16 md:min-h-[1200px]"
      >
        <JobsCreate :form="form" class="mb-4" />

        <div class="p-6 flex flex-wrap gap-4 justify-between items-center max-w-[730px] mx-auto shadow-lg bg-white rounded-md">
          <h4 class="text-base text-[--text-colo]">Post job by just clicking on “Post Job Now” button.</h4>

          <button
            type="submit"
            class="primary-button uppercase flex gap-2 items-center"
            :class="
              loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            "
            :disabled="loading"
          >
            Post Job Now
            <Loader width="14" v-if="loading" />
          </button>
        </div>
      </form>
    </div>
  </NuxtLayout>
</template>
