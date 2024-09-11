<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const toast: any = useNuxtApp().$toast;

const proposal: Ref<Object> = ref({});
const loading: Ref<boolean> = ref(true);
const loadingForm: Ref<boolean> = ref(false);
const status: Ref<string> = ref("accepted");

const retrieveProposal = async () => {
  const response = await fetchProposal(route.params.id);

  if (response.status.value === "success") {
    proposal.value = response.data.value.data;
  }

  loading.value = false;
};

const updateStatus = async (value: string) => {
  loadingForm.value = true;
  status.value = value;

  const response = await updateProposalStatus(route.params.id, value);

  if (response.status.value === "success") {
    router.push("/profile/proposals");
  } else {
    toast.error(response.error);
  }

  loadingForm.value = false;
};

onMounted(async () => {
  await retrieveProposal();
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
            Proposal for: Loading...
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
            Proposal for: {{ proposal.job.title }}
          </h2>

          <div class="flex flex-col p-6">
            <div class="flex gap-2 items-center mb-4 pb-4 border-b">
              <NuxtLink :to="`/users/${proposal.user.uuid}`">
                <img
                  :src="proposal.user.profile_image"
                  alt=""
                  class="w-[90px] h-[90px] rounded-md"
                  v-if="proposal.user.profile_image"
                />
                <div
                  class="w-[90px] h-[90px] flex items-center justify-center bg-white rounded-md"
                  v-else
                >
                  <IconsAvatar
                    :width="'80px'"
                    :height="'80px'"
                    :fill="'#e0e0e0'"
                  />
                </div>
              </NuxtLink>

              <div class="flex">
                <div class="flex flex-col">
                  <NuxtLink
                    :to="`/users/${proposal.user.uuid}`"
                    class="text-[--text-color] text-lg"
                  >
                    {{ proposal.user.first_name }} {{ proposal.user.last_name }}
                  </NuxtLink>

                  <div class="flex items-center gap-1">
                    <Icon name="ic:round-star" class="text-[#fecb02] text-sm" />

                    <div class="flex">
                      <span class="text-sm text-[--gray-color]">4.5/</span>
                      <span class="text-sm text-[--gray-color]">5</span>
                    </div>
                    <span class="text-sm text-[--light-blue]">
                      (860 Feedback)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="border-b pb-4 mb-4 w-full">
              <h4 class="mb-2 text-xl text-[--text-color]">Price</h4>

              <p class="text-[--text-color]">${{ proposal.price }}</p>
            </div>

            <div class="border-b pb-4 mb-4 w-full">
              <h4 class="mb-2 text-xl text-[--text-color]">Duration</h4>

              <p class="text-[--text-color]">
                {{ proposal.duration }}
                {{ getDurationType(proposal.duration_type, proposal.duration) }}
              </p>
            </div>

            <div class="border-b pb-4 mb-4 w-full">
              <h4 class="mb-2 text-xl text-[--text-color]">Subject</h4>

              <p class="text-[--text-color]">
                {{ proposal.subject }}
              </p>
            </div>

            <div class="border-b pb-4 mb-4 w-full">
              <h4 class="mb-2 text-xl text-[--text-color]">Description</h4>

              <p class="text-[--text-color]">
                {{ proposal.description }}
              </p>
            </div>

            <div class="border-b pb-4 mb-4 w-full">
              <h4 class="mb-2 text-xl text-[--text-color]">Attachments</h4>

              <div v-if="proposal.files.data.length === 0">No attachments</div>

              <div
                class="text-[--text-color] border py-2 px-4 text-xs"
                :class="{
                  'border-b-0': index + 1 !== proposal.files.data.length,
                }"
                v-for="(file, index) in proposal.files.data"
                :key="index"
              >
                <span
                  class="flex justify-between items-center"
                  v-if="!file.url"
                >
                  File upload error
                  <Icon
                    name="carbon:warning-filled"
                    class="text-xl text-red-500"
                  />
                </span>

                <a
                  :href="file.url"
                  target="_blank"
                  class="flex justify-between items-center"
                  v-else
                >
                  {{ file.url }}
                  <Icon
                    name="carbon:view-filled"
                    class="text-xl text-[--primary-color]"
                  />
                </a>
              </div>
            </div>

            <div
              class="flex flex-wrap mt-auto gap-4"
              v-if="proposal.status === 'pending'"
            >
              <button
                class="p-3 bg-red-500 text-white rounded-md w-full sm:flex-1 order-2 sm:order-1 flex items-center justify-center gap-2 hover:bg-red-600 transition-colors duration-300"
                :class="{ 'pointer-events-none opacity-50': loadingForm }"
                type="button"
                @click="updateStatus('rejected')"
              >
                Reject
                <Loader
                  width="14"
                  v-if="loadingForm && status === 'rejected'"
                />
              </button>

              <button
                class="p-3 bg-[--green-color] text-white rounded-md w-full sm:flex-1 order-1 sm:order-2 flex items-center justify-center gap-2 hover:bg-green-600 transition-colors duration-300"
                :class="{ 'pointer-events-none opacity-50': loadingForm }"
                type="button"
                @click="updateStatus('accepted')"
              >
                Accept
                <Loader
                  width="14"
                  v-if="loadingForm && status === 'accepted'"
                />
              </button>
            </div>

            <div v-else class="w-full">
              <p class="text-[--text-color]">
                This proposal's status is: {{ proposal.status }}. No further
                actions are available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>