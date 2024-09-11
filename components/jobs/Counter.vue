<script setup lang="ts">
const totalOngoing: Ref<number> = ref(0);
const totalCompleted: Ref<number> = ref(0);
const totalCancelled: Ref<number> = ref(0);

const loadingOngoing: Ref<boolean> = ref(true);
const loadingCompleted: Ref<boolean> = ref(true);
const loadingCancelled: Ref<boolean> = ref(true);

const retrieveOngoing = async () => {
  const response = await jobCounter("ongoing");

  if (response.status.value === "success") {
    totalOngoing.value = response.data.value.data.total;
  }

  loadingOngoing.value = false;
};

const retrieveCompleted = async () => {
  const response = await jobCounter("completed");

  if (response.status.value === "success") {
    totalCompleted.value = response.data.value.data.total;
  }

  loadingCompleted.value = false;
};

const retrieveCancelled = async () => {
  const response = await jobCounter("cancelled");

  if (response.status.value === "success") {
    totalCancelled.value = response.data.value.data.total;
  }

  loadingCancelled.value = false;
};

onMounted(async () => {
  try {
    await Promise.all([
      retrieveOngoing(),
      retrieveCompleted(),
      retrieveCancelled(),
    ]);
  } catch (error) {
    console.error("Error loading data:", error);
  }
});
</script>

<template>
  <div class="w-full order-1 md:order-2 md:w-[275px] flex flex-col gap-4">
    <div class="flex bg-white shadow rounded-md p-6">
      <img
        class="w-14 h-14 object-contain"
        src="/images/jobs/ongoing_jobs.webp"
        alt=""
      />

      <div class="border-l pl-4 ml-4 gap-1 flex flex-col">
        <span v-if="loadingOngoing" class="flex gap-1"><Loader /></span>
        <span class="font-bold text-3xl text-[--green-color]" v-else>
          {{ totalOngoing }}
        </span>
        <span class="text-xs">Total Ongoing jobs</span>
      </div>
    </div>

    <div class="flex bg-white shadow rounded-md p-6">
      <img
        class="w-14 h-14 object-contain"
        src="/images/jobs/completed_jobs.webp"
        alt=""
      />

      <div class="border-l pl-4 ml-4 gap-1 flex flex-col">
        <span v-if="loadingCompleted" class="flex gap-1"><Loader /></span>

        <span class="font-bold text-3xl text-blue-500" v-else>
          {{ totalCompleted }}
        </span>
        <span class="text-xs">Total Completed jobs</span>
      </div>
    </div>

    <div class="flex bg-white shadow rounded-md p-6">
      <img
        class="w-14 h-14 object-contain"
        src="/images/jobs/cancelled_jobs.webp"
        alt=""
      />

      <div class="border-l pl-4 ml-4 gap-1 flex flex-col">
        <span v-if="loadingCancelled" class="flex gap-1"><Loader /></span>

        <span class="font-bold text-purple-600 text-3xl" v-else>
          {{ totalCancelled }}
        </span>
        <span class="text-xs">Total cancelled jobs</span>
      </div>
    </div>
  </div>
</template>