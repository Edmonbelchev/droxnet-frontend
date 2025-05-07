<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  breadcrumb: "Job Detail",
});

const route = useRoute();
const user = useAuthStore().user;
const toast = useNuxtApp().$toast;

const job = ref();
const loading = ref(true);
const saveLoading = ref(false);

const currentDate = new Date().toDateString();

const retrieveJob = async () => {
  const response = await fetchJob(route.params.id);

  if (response.status.value === "success") {
    job.value = response.data.value.data;
  }

  loading.value = false;
};

const applied = computed(() => {
  if (!job.value || !job.value.proposals) return false;
  return job.value.proposals.some(
    (proposal: any) => proposal.user_uuid === user.uuid
  );
});

const save = async () => {
  saveLoading.value = true;

  const response = await saveItem("job", job.value.id);

  if (response.status.value === "success") {
    toast.success("Job saved");

    job.value.saved_item = response.data.value.data.saved_item;
  }

  saveLoading.value = false;
};

const unsave = async () => {
  saveLoading.value = true;

  const response = await unsaveItem(job.value.saved_item.id);

  if (response.status.value === "success") {
    toast.success("Job unsaved");

    job.value.saved_item = null;
  }

  saveLoading.value = false;
};

onMounted(() => {
  retrieveJob();
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="bg-gray-100 min-h-screen">
      <AppBreadcrumbs title="Job Detail" />

      <SkeletonJobDetail v-if="loading" />

      <div class="bg-[--background-color] p-4 lg:p-20" v-else>
        <div class="max-w-[1100px] w-full mx-auto flex flex-col gap-4 lg:gap-8">
          <div
            class="flex-col lg:flex-row rounded-lg flex bg-white justify-between lg:items-center gap-4 p-6 md:p-8"
          >
            <div class="flex flex-col gap-2 md:gap-4">
              <h1 class="text-[28px] leading-10 text-[--text-color] font-bold">
                {{ job.title }}
              </h1>

              <div class="flex flex-col md:flex-row">
                <div
                  class="mb-1 md:mb-0 md:mr-3 md:pr-3 md:border-r flex gap-1 items-center"
                  v-if="job.level"
                >
                  <Icon
                    name="lucide:dollar-sign"
                    class="text-[--green-color]"
                  />
                  <span>{{ job.level }}</span>
                </div>

                <div
                  class="mb-1 md:mb-0 md:mr-3 md:pr-3 md:border-r flex gap-1 items-center"
                  v-if="job.country"
                >
                  <img
                    :src="countryFlag(job.country)"
                    :alt="job.country"
                    class="w-[18px]"
                  />
                  <span>{{ job.location }}</span>
                </div>

                <div
                  class="mb-1 md:mb-0 md:mr-3 md:pr-3 md:border-r flex gap-1 items-center"
                  v-if="job.type"
                >
                  <Icon
                    name="material-symbols:folder-outline"
                    class="text-blue-500"
                  />
                  <span>Type: {{ job.type }}</span>
                </div>

                <div class="flex gap-1 items-center" v-if="job.duration">
                  <Icon name="ph:clock" class="text-[--primary-color]" />
                  <span>Duration: {{ job.duration }}</span>
                </div>
              </div>
            </div>

            <NuxtLink
              :to="`/jobs/${route.params.id}/proposal`"
              class="primary-button min-w-[210px] h-fit"
              type="button"
              v-if="user.role === 'freelancer' && !applied"
            >
              Send proposal
            </NuxtLink>

            <div
              v-else-if="user.role === 'freelancer' && applied"
              class="bg-gray-50 rounded-md p-3 border border-gray-300 w-fit mt-auto"
            >
              <span class="text-[--text-color] flex items-center gap-1">
                <Icon
                  name="mdi:check-circle"
                  class="text-[--green-color] text-lg"
                />
                <span class="font-medium text-xs sm:text-sm"
                  >You have already applied for this job</span
                >
              </span>
            </div>

            <NuxtLink
              :to="`/profile/post-job/${route.params.id}`"
              class="primary-button min-w-[210px] h-fit"
              type="button"
              v-if="job.user.id === user.id"
            >
              Edit proposal
            </NuxtLink>
          </div>

          <div class="flex flex-col md:flex-row gap-4 lg:gap-8">
            <div class="w-full md:w-4/5 bg-white p-6 lg:p-8 rounded-md">
              <div class="rounded-lg mb-8">
                <h4 class="text-[--text-color] text-lg">Project Detail</h4>

                <div
                  class="text-[--text-color] mt-4 description-element"
                  v-html="job.description"
                ></div>
              </div>

              <div class="rounded-lg mb-8">
                <h4 class="text-[--text-color] text-lg mb-4">
                  Skills Required
                </h4>

                <div
                  class="flex flex-wrap gap-2"
                  v-if="job.skills.length !== 0"
                >
                  <span
                    class="border text-[--text-color] px-4 py-2 rounded-full"
                    v-for="(skill, index) in job.skills"
                    :key="index"
                  >
                    {{ skill.name }}
                  </span>
                </div>

                <span class="text-[--text-color]" v-else>
                  No skills required
                </span>
              </div>

              <div class="rounded-lg" v-if="job.files && job.files.length > 0">
                <h4 class="text-[--text-color] text-lg mb-4">Attachments</h4>

                <div class="flex flex-col">
                  <div v-for="(file, index) in job.files" :key="index">
                    <a
                      :href="file.url"
                      target="_blank"
                      class="flex items-center gap-2 text-[--text-color] border-x border-t p-3"
                      :class="{ 'border-b': index == job.files.length - 1 }"
                      v-if="file.url"
                    >
                      <span class="text-xs">{{ file.url }}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="w-full md:w-2/5 flex flex-col gap-4 lg:gap-8">
              <div class="bg-white rounded-md">
                <div class="flex border-b p-4 lg:p-6">
                  <Icon
                    name="cil:newspaper"
                    class="text-[72px] text-yellow-500 pr-4 mr-4 border-r"
                  />

                  <div class="flex flex-col">
                    <span class="text-[--green-color] font-bold text-xl">{{
                      job.proposals_count
                    }}</span>
                    <span
                      >Proposals Received Till <br /><i>{{
                        currentDate
                      }}</i></span
                    >
                  </div>
                </div>

                <div
                  class="p-4 lg:p-6 gap-4 flex flex-col items-center justify-center"
                >
                  <span>job ID: {{ job.id }}</span>

                  <button
                    type="button"
                    class="px-8 py-3 border rounded-md border-[--primary-color] font-bold hover:text-[--primary-color] duration-300 flex items-center justify-center gap-2"
                    @click="unsave()"
                    v-if="job.saved_item"
                  >
                    <Icon name="ph:heart-fill" class="text-lg text-red-400" />
                    <span v-if="saveLoading">Removing...</span>
                    <span v-else>Saved</span>
                  </button>

                  <button
                    type="button"
                    class="px-8 py-3 border rounded-md border-[--primary-color] font-bold hover:text-[--primary-color] duration-300 flex items-center justify-center gap-2"
                    @click="save()"
                    v-else
                  >
                    <Icon name="ph:heart" class="text-lg" />
                    <span v-if="saveLoading">Saving...</span>
                    <span v-else>Click to save</span>
                  </button>
                </div>
              </div>

              <div class="bg-white rounded-md">
                <div class="w-full md:w-[350px] h-[170px]">
                  <img
                    :src="job.user.profile_banner"
                    class="w-full h-full object-cover"
                    alt="Profile Banner"
                    v-if="job.user.profile_banner"
                  />

                  <div
                    class="rounded flex justify-center items-center border bg-gray-200 p-4 w-full md:w-[350px] h-[170px]"
                    v-else
                  >
                    <Icon name="ic:round-wallpaper" class="text-[50px]" />
                  </div>
                </div>

                <div
                  class="px-4 pb-4 lg:px-6 lg:pb-6 -mt-[50px] flex flex-col items-center justify-center"
                >
                  <img
                    :src="job.user.profile_image"
                    alt="Profile Image"
                    class="w-[100px] h-[100px] object-cover rounded border border-gray-300 mb-4"
                    v-if="job.user.profile_image"
                  />

                  <div
                    class="bg-white rounded border border-gray-300 p-4 mb-4"
                    v-else
                  >
                    <IconsAvatar width="68px" height="68px" fill="#d1d5db" />
                  </div>

                  <span
                    class="mb-2 flex items-center gap-1 text-[--text-color]"
                    v-if="job.user.email_verified"
                  >
                    <Icon
                      name="lets-icons:check-fill"
                      class="text-[--green-color] text-lg"
                    />
                    Verified Company
                  </span>

                  <h3
                    class="text-base text-[--text-color] mb-4"
                    v-if="job.user?.company_details?.company_name"
                  >
                    {{ job.user.company_details.company_name }}
                  </h3>

                  <div class="flex">
                    <button type="button" class="text-md pr-3 mr-3 border-r">
                      Open Jobs
                    </button>

                    <NuxtLink 
                      :to="`/companies/${job.user.uuid}`"
                      class="text-md pr-3 mr-3 border-r text-[--light-blue]"
                    >
                      Full Profile
                    </NuxtLink>

                    <button
                      type="button"
                      class="text-md text-[--primary-color]"
                    >
                      Following
                    </button>
                  </div>
                </div>
              </div>

              <div class="flex flex-col bg-white p-6 rounded-md">
                <h4 class="border-b mb-6 pb-4 text-xl text-[--text-color]">
                  Report This Job
                </h4>
                <ReportForm
                  reportable_type="job"
                  :reportable_id="job.id"
                  :reported="job.is_reported"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>