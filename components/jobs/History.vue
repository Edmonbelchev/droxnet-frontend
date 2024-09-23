<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";

const props = defineProps<{
  jobID: number;
}>();

const toast: any = useNuxtApp().$toast;

const user = useAuthStore().user;

const expanded: Ref<Record<number, boolean>> = ref({ 0: true });

const comments: Ref<Array<Object>> = ref([]);
const perPage: Ref<number> = ref(6);
const page: Ref<number> = ref(1);
const totalComments: Ref<number> = ref(2);
const skeletonLoading: Ref<boolean> = ref(true);
const loadingComments: Ref<boolean> = ref(false);
const form: Ref<any> = ref({
  comment: "",
});

const loadingCommentSubmit: Ref<boolean> = ref(false);

const commentRefs = ref<Array<HTMLElement | null>>([]);

const isTruncated = ref<boolean[]>([]);

const calculateTruncation = () => {
  nextTick(() => {
    isTruncated.value = commentRefs.value.map((element) =>
      element ? element.scrollWidth > element.clientWidth : false
    );
  });
};

const retrieveComments = async () => {
  loadingComments.value = true;

  const response = await retrieveJobComments(
    perPage.value,
    page.value,
    props.jobID
  );

  if (response.status.value === "success") {
    comments.value = response.data.value.data;
    totalComments.value = response.data.value.meta.total;
    calculateTruncation(); // Add this line
  }

  if (loadingComments.value) {
    loadingComments.value = false;
  }

  skeletonLoading.value = false;
};

const handleSubmitComment = async () => {
  loadingCommentSubmit.value = true;

  const response = await createJobComment(props.jobID, form.value);
  if (response.status.value === "success") {
    toast.success("Comment submitted successfully");
    form.value.comment = "";
  } else {
    toast.error("Failed to submit comment");
  }

  await retrieveComments();

  loadingCommentSubmit.value = false;
};

const toggleExpanded = (index: number) => {
  expanded.value[index] = !expanded.value[index];
};

const showDeleteModal = ref(false);
const commentToDelete = ref<number | null>(null);
const deleteModalLoading = ref(false);

const openDeleteModal = (commentID: number) => {
  commentToDelete.value = commentID;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  commentToDelete.value = null;
};

const confirmDeleteComment = async () => {
  if (commentToDelete.value === null) return;

  deleteModalLoading.value = true;
  const response = await deleteJobComment(commentToDelete.value);
  if (response.status.value === "success") {
    toast.success("Comment deleted successfully");
    await retrieveComments();
  } else {
    toast.error("Failed to delete comment");
  }
  deleteModalLoading.value = false;
  closeDeleteModal();
};

watch(page, async () => {
  await retrieveComments();
});

watch(comments, () => {
  calculateTruncation();
});

onMounted(async () => {
  await retrieveComments();
  window.addEventListener('resize', calculateTruncation);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculateTruncation);
});
</script>

<template>
  <div class="relative">
    <div
      class="grid grid-cols-8 bg-[--background-color] py-4 px-6 border gap-4 relative text-[--text-color]"
    >
      <div class="col-span-2 pl-14 text-base">Date</div>
      <div class="col-span-4 text-base">Message</div>
      <div class="col-span-2 text-base text-right">Actions</div>
    </div>

    <div v-if="skeletonLoading">
      <div
        v-for="i in 4"
        :key="i"
        class="grid grid-cols-8 bg-[--background-color] p-6 border-x border-b gap-4 bg-white items-center"
      >
        <div class="col-span-2 flex items-center gap-2">
          <Skeleton class="max-w-9 h-9 rounded-full" />
          <Skeleton class="h-4 w-12" />
        </div>

        <div class="truncate col-span-4">
          <Skeleton class="h-4 w-full" />
        </div>

        <div class="flex justify-end col-span-2">
          <Skeleton class="h-10 w-28 rounded-md" />
        </div>
      </div>
    </div>

    <div class="relative" v-else>
      <div
        v-if="loadingComments"
        class="text-gray-500 p-4 absolute inset-0 h-[calc(100%-5px)] w-[calc(100%-5px)] m-auto bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center gap-2 rounded-md animate-[fadeIn_300ms_ease-in_forwards]"
      >
        <Loader width="20" height="20" />
        <span class="text-sm font-medium">Loading comments...</span>
      </div>

      <div
        v-if="comments.length === 0"
        class="text-gray-500 p-4 bg-[--background-color] border-b border-x relative text-center gap-1 flex items-center justify-center"
      >
        <Icon name="mdi:comment-outline" class="text-lg" />
        <span class="text-sm font-medium">No comments yet</span>
      </div>

      <div
        class="relative"
        v-else
        v-for="(comment, index) in comments"
        :key="index"
      >
        <div
          class="grid grid-cols-8 bg-[--background-color] p-6 border-x border-b gap-4 bg-white items-center"
        >
          <div class="col-span-2 flex items-center">
            <ProfileAvatar
              class="mr-4 overflow-hidden"
              :avatar="comment.user.profile_image"
            />
            <span class="text-xs">{{
              formatDateWithMonth(comment.created_at)
            }}</span>
          </div>

          <div ref="commentRefs" class="truncate col-span-4 text-sm">
            {{ comment.comment }}
          </div>

          <div class="flex justify-end col-span-2 gap-2">
            <button
              v-if="isTruncated[index]"
              @click="toggleExpanded(index)"
              class="flex items-center justify-center bg-[--green-color] text-white rounded-md px-4 py-2 gap-1"
            >
              <Icon
                name="mdi:chevron-down"
                class="text-lg duration-300"
                :class="{ 'rotate-180': expanded[index] }"
              />
              <span class="text-xs font-medium">
                {{ expanded[index] ? "Collapse" : "Expand" }}
              </span>
            </button>

            <button
              class="flex items-center justify-center bg-red-500 text-white rounded-md px-4 py-2 gap-1"
              v-if="comment.user.id === user.id"
              @click="openDeleteModal(comment.id)"
            >
              <Icon name="mdi:delete" class="text-lg" />
              <span class="text-xs font-medium">Delete</span>
            </button>
          </div>
        </div>

        <div
          v-if="isTruncated[index]"
          class="grid grid-cols-1 bg-[--background-color] overflow-hidden transition-all duration-300"
          :class="{
            'max-h-[999px]': expanded[index],
            'max-h-[0px]': !expanded[index],
            'border-b': index !== comments.length - 1 && expanded[index],
          }"
        >
          <p class="p-6">
            {{ comment.comment }}
          </p>
        </div>
      </div>
    </div>

    <div v-if="skeletonLoading" class="flex justify-center mt-4">
      <div class="flex gap-2 w-full">
        <Skeleton class="max-w-12 h-8 rounded-md" />

        <div class="flex justify-center gap-2 mx-auto w-1/2 px-4">
          <Skeleton class="max-w-12 h-8 rounded-md" />
          <Skeleton class="max-w-12 h-8 rounded-md" />
          <Skeleton class="max-w-12 h-8 rounded-md" />
        </div>
        
        <Skeleton class="max-w-12 h-8 rounded-md" />
      </div>
    </div>

    <div class="flex justify-center mt-4" v-else-if="totalComments > perPage">
      <Pagination
        :total="totalComments"
        :page="page"
        :perPage="perPage"
        @update:currentPage="page = $event"
      />
    </div>

    <FormElementsTextarea
      label="Add a comment"
      v-model="form.comment"
      class="mt-8 mb-4"
      labelClass="mb-2 block text-sm"
    />

    <button
      type="button"
      class="primary-button flex items-center gap-2"
      @click="handleSubmitComment"
    >
      <Loader v-if="loadingCommentSubmit" width="12" height="12" />
      <span v-if="loadingCommentSubmit">Sending...</span>
      <span v-else>Send Now</span>
    </button>
  </div>

  <Modal
    :is-open="showDeleteModal"
    message="Are you sure you want to delete this comment?"
    :loading="deleteModalLoading"
    @close="closeDeleteModal"
    @submit="confirmDeleteComment"
  />
</template>