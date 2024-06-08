<script setup lang="ts">
defineProps({
  user: {
    type: Object,
    required: true,
  },
});

// Add method for getting a param in url for active tab
const getParam = (key) => {
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
};

const activeTab = ref(getParam('tab') ?? 1);

// Add method for adding a param in url for active tab
const addParam = (key: string = 'tab', value: number) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, "", url);

  activeTab.value = value;
};
</script>

<template>
  <div
    class="flex flex-col justify-center items-center max-w-[1026px] mx-auto gap-4 shadow-lg"
  >
    <div class="flex flex-col bg-white rounded-md w-full">
      <h2 class="border-b p-4 md:p-6 text-[--text-color] text-base md:text-lg">My Profile</h2>

      <div class="flex flex-col lg:flex-row">
        <div class="flex flex-col border-b md:border-b-0 md:border-r md:min-w-[290px]">
          <button
            class="text-left md:text-base p-4 md:p-6"
            :class="{
              'border-l-2 border-[--primary-color] text-[--text-color]':
                activeTab == 1,
            }"
            type="button"
            @click="addParam('tab', 1)"
          >
            Personal Details & Skills
          </button>

          <button
            class="text-left md:text-base p-4 md:p-6"
            :class="{
              'border-l-2 border-[--primary-color] text-[--text-color]':
                activeTab == 2,
            }"
            type="button"
            @click="addParam('tab', 2)"
          >
            Experience & Education
          </button>

          <button
            class="text-left md:text-base p-4 md:p-6"
            :class="{
              'border-l-2 border-[--primary-color] text-[--text-color]':
                activeTab == 3,
            }"
            type="button"
            @click="addParam('tab', 3)"
          >
            Projects & Awards
          </button>
        </div>

        <div class="flex-1">
          <ProfileFormDetailsAndSkills :user="user" v-if="activeTab == 1" />

          <ProfileFormExperienceAndEducation :user="user" v-if="activeTab == 2" />

          <ProfileFormProjectsAndAwards :user="user" v-if="activeTab == 3" />
        </div>
      </div>
    </div>
  </div>
</template>