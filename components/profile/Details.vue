<script setup lang="ts">
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const activeTab = ref(1);
</script>

<template>
  <div class="flex flex-col justify-center items-center max-w-[1200px] mx-auto gap-4 shadow-lg">
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
          <ProfileFormDetailsAndSkills :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>