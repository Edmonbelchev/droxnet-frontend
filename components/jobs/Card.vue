<script setup>
const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
});

const toast = useNuxtApp().$toast;
const saveLoading = ref(false);

const save = async () => {
  saveLoading.value = true;

  const response = await saveItem("job", props.job.id);

  if (response.status.value === "success") {
    toast.success("Job saved");

    props.job.saved_item = response.data.value.data.saved_item;
  }

  saveLoading.value = false;
};

const unsave = async () => {
  saveLoading.value = true;

  const response = await unsaveItem(props.job.saved_item.id);

  if (response.status.value === "success") {
    toast.success("Job unsaved");

    props.job.saved_item = null;
  }

  saveLoading.value = false;
};
</script>

<template>
  <div class="flex flex-col md:flex-row bg-white rounded">
    <div class="flex flex-col p-6 w-full md:w-4/5">
      <div class="mb-1 flex items-center gap-1">
        <Icon name="lets-icons:check-fill" class="text-[--green-color]" />
        <h3 class="text-[--text-color] text-sm">
          {{ job.user?.company_details?.company_name }}
        </h3>
      </div>

      <h4 class="text-[--text-color] text-lg mb-2">
        {{ job.title }}
      </h4>

      <div
        v-html="job.description"
        class="max-h-[65px] truncated overflow-hidden"
      ></div>

      <div
        class="mt-4 gap-2 flex flex-wrap"
        v-if="job.skills && job.skills.length > 0"
      >
        <a
          href="#"
          class="text-xs py-2 px-4 border rounded-[30px] text-[--gray-color]"
          v-for="(skill, index) of job.skills"
          :key="index"
        >
          {{ skill.name }}
        </a>
      </div>
    </div>

    <div class="flex flex-col gap-3 md:border-l p-6 md:w-2/5">
      <div
        class="grid grid-cols-[auto_1fr] gap-2 items-center"
        v-if="job.budget_type"
      >
        <Icon
          name="lucide:dollar-sign"
          class="text-[--green-color] text-base"
        />

        <span class="text-sm text-[--text-color]">
          {{ job.budget_type }}
        </span>
      </div>

      <div
        class="grid grid-cols-[auto_1fr] gap-2 items-center"
        v-if="job.country"
      >
        <img
          :src="countryFlag(job.country)"
          :alt="job.country"
          class="w-[18px]"
        />

        <span class="text-sm text-[--text-color]">
          {{ countryName(job.country) }}
        </span>
      </div>

      <div class="grid grid-cols-[auto_1fr] gap-2 items-center" v-if="job.type">
        <Icon
          name="material-symbols:folder-outline"
          class="text-blue-500 text-base"
        />

        <span class="text-sm text-[--text-color]"> Type: {{ job.type }} </span>
      </div>

      <div
        class="grid grid-cols-[auto_1fr] gap-2 items-center"
        v-if="job.duration"
      >
        <Icon name="ph:clock" class="text-[--primary-color] text-lg" />

        <span class="text-sm text-[--text-color]">
          Duration: {{ job.duration }}
        </span>
      </div>

      <div class="grid grid-cols-[auto_1fr] gap-2 items-center">
        <Icon
          :name="job.saved_item ? 'ph:heart-fill' : 'ph:heart'"
          class="text-[--primary-color] text-base"
        />

        <button
          type="button"
          class="w-fit transition-transform"
          @click="unsave()"
          v-if="job.saved_item"
        >
          <span class="text-sm text-[--text-color]" v-if="saveLoading"
            >Unsaving...</span
          >
          <span class="text-sm text-[--text-color]" v-else>Unsave</span>
        </button>

        <button
          type="button"
          class="w-fit transition-transform"
          @click="save()"
          v-else
        >
          <span class="text-sm text-[--text-color]" v-if="saveLoading">Saving...</span>
          <span class="text-sm text-[--text-color]" v-else>Click to save</span>
        </button>
      </div>

      <div class="mt-auto pt-4">
        <NuxtLink :to="`/jobs/${job.id}`" class="primary-button-sm w-full">
          View Job
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
