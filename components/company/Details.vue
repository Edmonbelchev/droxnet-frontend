<script setup lang="ts">
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const toast = useNuxtApp().$toast;
const saveLoading = ref(false);
const jobsLoading = ref(true);
const authStore = useAuthStore();

const save = async () => {
  saveLoading.value = true;

  const response = await saveItem("user", props.user.id);

  if (response.status.value === "success") {
    toast.success("Company followed");

    props.user.saved_item = response.data.value.data.saved_item;
  }

  saveLoading.value = false;
};

const unsave = async () => {
  saveLoading.value = true;

  const response = await unsaveItem(props.user.saved_item.id);

  if (response.status.value === "success") {
    toast.success("Company unfollowed");

    props.user.saved_item = null;
  }

  saveLoading.value = false;
};

const jobs = ref([]);
const perPage = ref(4);
const page = ref(1);
const total = ref(0);

const retrieveJobs = async () => {
  jobsLoading.value = true;

  const response = await fetchJobs(perPage.value, page.value, {
    user_uuid: props.user.uuid,
  });

  if (response.status.value === "success") {
    jobs.value = response.data.value.data;
    total.value = response.data.value.meta.total;
  }

  jobsLoading.value = false;
};

const followers = ref([]);
const followersLoading = ref(true);
const skeletonFollowersLoading = ref(true);
const followersPage = ref(1);
const followersPerPage = ref(15);
const followersTotal = ref(0);

const retrieveFollowers = async () => {
  followersLoading.value = true;

  const response = await fetchFollowers(
    followersPerPage.value,
    followersPage.value,
    props.user.id
  );

  if (response.status.value === "success") {
    followers.value = [...followers.value, ...response.data.value.data];
    followersTotal.value = response.data.value.meta.total;
  }

  skeletonFollowersLoading.value = false;
  followersLoading.value = false;
};

watch(page, async () => {
  await retrieveJobs();
});

watch(followersPage, async () => {
  await retrieveFollowers();
});

onMounted(() => {
  retrieveJobs();
  retrieveFollowers();
});
</script>

<template>
  <div class="max-w-[1100px] py-6 sm:py-10 md:py-20 w-full mx-auto px-4 sm:px-6">
    <div
      v-if="user.profile_banner"
      :style="{ backgroundImage: `url(${user.profile_banner})` }"
      class="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-t-md bg-center bg-cover"
    ></div>
    <div
      class="rounded flex justify-center items-center border bg-gray-200 p-4 w-full h-[200px] sm:h-[250px] md:h-[300px]"
      v-else
    >
      <Icon name="ic:round-wallpaper" class="text-3xl sm:text-4xl md:text-5xl" />
    </div>

    <div class="flex flex-col md:flex-row gap-4 md:gap-6">
      <div class="flex flex-col gap-4 md:gap-6 w-full md:w-2/6">
        <div
          class="bg-white rounded-b-md p-4 flex flex-col items-center justify-center"
        >
          <img
            :src="user.profile_image"
            alt="Profile Image"
            class="w-20 h-20 sm:w-24 sm:h-24 md:w-[100px] md:h-[100px] object-cover rounded border border-gray-300 mb-4 -mt-12 sm:-mt-16 md:-mt-[70px]"
            v-if="user.profile_image"
          />

          <div
            class="bg-white rounded border border-gray-300 p-3 sm:p-4 mb-4 -mt-12 sm:-mt-16 md:-mt-[70px]"
            v-else
          >
            <IconsAvatar class="w-14 h-14 sm:w-16 sm:h-16 md:w-[66px] md:h-[66px]" fill="#d1d5db" />
          </div>

          <div class="flex flex-col items-center justify-center">
            <span
              class="mb-1 flex items-center gap-1 text-[--text-color] text-xs sm:text-sm"
              v-if="user.email_verified"
            >
              <Icon
                name="lets-icons:check-fill"
                class="text-[--green-color] text-sm sm:text-base"
              />
              Verified Company
            </span>

            <h3 class="text-sm sm:text-base text-[--text-color] mb-2 text-center">
              {{ user.company_details.company_name }}
            </h3>
          </div>

          <div
            class="flex justify-center items-center border-t border-gray-300 pt-4 w-full"
            v-if="user.uuid !== authStore.user.uuid"
          >
            <button
              type="button"
              class="w-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 border rounded-md border-[--primary-color] text-sm sm:text-base font-bold hover:text-[--primary-color] duration-300 flex items-center justify-center gap-2"
              @click="unsave()"
              v-if="user.saved_item"
            >
              <Icon name="ph:heart-fill" class="text-base sm:text-lg text-red-400" />
              <span v-if="saveLoading">Unfollowing...</span>
              <span v-else>Unfollow</span>
            </button>

            <button
              type="button"
              class="w-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 border rounded-md border-[--primary-color] text-sm sm:text-base font-bold hover:text-[--primary-color] duration-300 flex items-center justify-center gap-2"
              @click="save()"
              v-else
            >
              <Icon name="ph:heart" class="text-base sm:text-lg" />
              <span v-if="saveLoading">Following...</span>
              <span v-else>Click to Follow</span>
            </button>
          </div>
        </div>

        <div
          class="bg-white rounded-md p-4 sm:p-6 flex flex-col items-center justify-center"
        >
          <h3
            class="text-sm sm:text-base text-[--text-color] mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-300 w-full"
          >
            Company Followers
          </h3>

          <CompanyFollowers
            :followers="followers"
            :skeletonLoading="skeletonFollowersLoading"
            :loading="followersLoading"
            :maxPage="Math.ceil(followersTotal / followersPerPage)"
            @update:currentPage="followersPage = $event"
          />
        </div>

         <div class="flex flex-col bg-white p-4 sm:p-6 rounded-md" v-if="user.uuid !== authStore.user.uuid">
          <h4 class="border-b mb-4 sm:mb-6 pb-3 sm:pb-4 text-base sm:text-lg md:text-xl text-[--text-color]">
            Report This Company
          </h4>
          <ReportForm
            reportable_type="user"
            :reportable_id="user.id"
            :reported="user.is_reported"
          />
        </div>
      </div>

      <div class="w-full md:w-4/6 flex flex-col gap-4 md:gap-6">
        <div class="bg-white rounded-b-md p-4 sm:p-6">
          <h3 class="text-base sm:text-lg text-[--text-color] mb-2">
            About "{{ user.company_details.company_name }}"
          </h3>

          <p class="text-sm">
            {{ user.about }}
          </p>
        </div>

        <div class="flex flex-col gap-4 md:gap-6 relative">
          <div v-if="jobsLoading">
            <SkeletonJobListing :count="4" />
          </div>

          <JobsCard
            v-else
            v-for="(job, index) in jobs"
            :key="index"
            :job="job"
          />

          <div class="flex justify-center mt-6 sm:mt-8">
            <Pagination
              :page="page"
              :perPage="perPage"
              :total="total"
              @update:currentPage="page = $event"
              v-if="jobs.length > 0"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

