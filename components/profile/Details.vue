<script setup lang="ts">
defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const activeTab = ref(getParam("tab") ?? 1);
</script>

<template>
  <div
    class="flex flex-col justify-center items-center max-w-[1030px] mx-auto gap-4 shadow-lg"
  >
    <div class="flex flex-col bg-white rounded-md w-full">
      <h2 class="border-b p-4 md:p-6 text-[--text-color] text-base md:text-lg">
        <span v-if="user.role === 'freelancer'">
          My Profile
        </span>
        <span v-else>
          Company Profile
        </span> 
      </h2>

      <div class="flex flex-col lg:flex-row">
        <div
          class="flex flex-col border-b md:border-b-0 md:border-r md:min-w-[290px] bg-[#fcfcfc]"
        >
          <button
            class="text-left md:text-base p-4 md:p-6 relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-[3px] after:h-full after:max-h-0 after:bg-[--primary-color] after:transition-all after:duration-500 after:ease-in-out hover:after:max-h-[100px] hover:bg-white transition-all duration-300"
            :class="{
              'after:max-h-[100px] text-[--text-color] bg-white':
                activeTab == 1,
            }"
            type="button"
            @click="activeTab = addParam('tab', 1)"
          >
            <span v-if="user.role === 'freelancer'">
              Personal Details & Skills
            </span>
            <span v-else>
              Company Details
            </span>
          </button>

          <button
            class="text-left md:text-base p-4 md:p-6 relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-[3px] after:h-full after:max-h-0 after:bg-[--primary-color] after:transition-all after:duration-500 after:ease-in-out hover:after:max-h-[100px] hover:bg-white transition-all duration-300"
            :class="{
              'after:max-h-[100px] text-[--text-color] bg-white':
                activeTab == 2,
            }"
            type="button"
            @click="activeTab = addParam('tab', 2)"
            v-if="user.role === 'freelancer'"
          >
            Experience & Education
          </button>

          <button
            class="text-left md:text-base p-4 md:p-6 relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-[3px] after:h-full after:max-h-0 after:bg-[--primary-color] after:transition-all after:duration-500 after:ease-in-out hover:after:max-h-[100px] hover:bg-white transition-all duration-300"
            :class="{
              'after:max-h-[100px] text-[--text-color] bg-white':
                activeTab == 3,
            }"
            type="button"
            @click="activeTab = addParam('tab', 3)"
            v-if="user.role === 'freelancer'"
          >
            Projects & Awards
          </button>
        </div>

        <div class="flex-1 max-w-[740px]" v-if="user.role === 'freelancer'">
          <ProfileFormDetailsAndSkills :user="user" v-if="activeTab == 1" />

          <ProfileFormExperienceAndEducation
            :user="user"
            v-if="activeTab == 2"
          />

          <ProfileFormProjectsAndAwards :user="user" v-if="activeTab == 3" />
        </div>

        <div class="flex-1 max-w-[740px]" v-else>
          <ProfileFormCompanyDetails :user="user" v-if="activeTab == 1" />
        </div>
      </div>
    </div>
  </div>
</template>