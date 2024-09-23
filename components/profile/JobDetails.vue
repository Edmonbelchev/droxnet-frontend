<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const toast: any = useNuxtApp().$toast;

const job: Ref<Object> = ref({});
const loading: Ref<boolean> = ref(true);
const loadingForm: Ref<boolean> = ref(false);
const status: Ref<string> = ref("accepted");

const retrieveJob = async () => {
  const response = await fetchJob(route.params.id);

  if (response.status.value === "success") {
    job.value = response.data.value.data;

    console.log(job.value.accepted_proposals[0]);
  }

  loading.value = false;
};

onMounted(async () => {
  await retrieveJob();
});
</script>

<template>
  <div
    class="bg-[--background-color] py-8 px-4 md:py-10 md:px-16 flex flex-col lg:flex-row justify-center gap-8"
  >
    <div
      class="flex flex-col order-2 lg:order-1 w-full lg:w-[730px] shadow-lg bg-white rounded-md"
    >
      <div v-if="loading">
        <div class="flex flex-col rounded-md w-full">
          <h2
            class="border-b p-4 md:p-6 text-[--text-color] text-base md:text-lg"
          >
            Job Details
          </h2>

          <div class="flex flex-col p-6">
            <div class="mb-4 pb-4 border-b flex items-center gap-2">
              <Skeleton class="rounded-md w-[90px] h-[90px]" />

              <div class="flex gap-2 flex-col w-1/4">
                <Skeleton class="rounded-md w-[100px] h-6" />
                <Skeleton class="rounded-md w-[100px] h-6" />
              </div>
            </div>

            <div class="border-b pb-4 mb-4 w-full" v-for="n in 3" :key="n">
              <Skeleton class="h-[80px] w-full rounded-md" />
            </div>

            <div class="border-b pb-4 mb-4 w-full">
              <Skeleton class="h-[150px] w-full rounded-md" />
            </div>

            <div class="mb-8 w-full">
              <Skeleton class="h-[80px] w-full rounded-md" />
            </div>

            <div class="flex flex-wrap mt-auto gap-4flex gap-4">
              <Skeleton class="w-full sm:flex-1 h-[55px] rounded-md" />
              <Skeleton class="w-full sm:flex-1 h-[55px] rounded-md" />
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="flex flex-col rounded-md w-full">
          <h2
            class="border-b p-4 md:p-6 text-[--text-color] text-base md:text-lg"
          >
            Job Details
          </h2>
          <ProposalsCard :proposal="job.accepted_proposals[0]" />
        </div>
      </div>
    </div>
  </div>
</template>