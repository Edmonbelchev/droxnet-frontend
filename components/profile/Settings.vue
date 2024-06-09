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
    <div class="flex flex-col lg:flex-row bg-white rounded-md w-full overflow-hidden">
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
          Password
        </button>

        <button
          class="text-left md:text-base p-4 md:p-6 relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-[3px] after:h-full after:max-h-0 after:bg-[--primary-color] after:transition-all after:duration-500 after:ease-in-out hover:after:max-h-[100px] hover:bg-white transition-all duration-300"
          :class="{
            'after:max-h-[100px] text-[--text-color] bg-white':
              activeTab == 2,
          }"
          type="button"
          @click="activeTab = addParam('tab', 2)"
        >
          Delete Account
        </button>
      </div>

      <div class="flex-1 max-w-[740px]">
        <ProfileFormPassword v-if="activeTab == 1" />

        <ProfileFormDeleteAccount v-if="activeTab == 2" />
      </div>
    </div>
  </div>
</template>