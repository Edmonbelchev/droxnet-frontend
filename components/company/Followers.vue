<script setup lang="ts">
const props = defineProps({
  followers: {
    type: Array,
    required: true,
  },
  skeletonLoading: {
    type: Boolean,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  maxPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:currentPage"]);

const followersPage = ref(1);

const handleScroll = (event) => {
  if (props.loading || followersPage.value >= props.maxPage) return;

  const { scrollTop, scrollHeight, clientHeight } = event.target;

  if (scrollTop + clientHeight >= scrollHeight - 1) {
    followersPage.value++;
    emit("update:currentPage", followersPage.value);
  }
};
</script>

<template>
  <div
    class="overflow-x-auto max-h-[350px] w-full flex flex-col gap-4 blue-scrollbar"
    @scroll="handleScroll"
  >
    <div class="w-full flex flex-col gap-2 pr-4" v-if="skeletonLoading">
      <div
        class="w-full flex items-center gap-2"
        v-for="(n, index) in 6"
        :key="index"
      >
        <IconsAvatar width="40px" height="40px" fill="#d1d5db" />

        <Skeleton class="w-[100px] min-w-[40px] h-18 rounded" />
      </div>
    </div>

    <NuxtLink
      :to="`/users/${follower.uuid}`"
      class="flex items-center gap-2 w-full"
      v-else-if="followers.length > 0"
      v-for="(follower, index) in followers"
      :key="index"
    >
      <img
        :src="follower.profile_image"
        alt="Follower Image"
        class="w-10 h-10 rounded object-cover"
        v-if="follower.profile_image"
      />
      <div
        class="rounded border border-gray-300 bg-gray-100 flex items-center justify-center w-10 h-10"
        v-else
      >
        <IconsAvatar width="40px" height="40px" fill="#d1d5db" />
      </div>
      <span>{{ follower.first_name }} {{ follower.last_name }}</span>
    </NuxtLink>

    <div v-else>
      <p class="text-gray-500">No followers yet</p>
    </div>

    <div class="flex justify-center items-center gap-2" v-if="loading && !skeletonLoading">
      <Loader />
      Loading more followers...
    </div>
  </div>
</template>
