<script lang="ts" setup>
const props = defineProps<{
  messages: any[];
  user: any;
  hasMoreMessages: boolean;
  isLoadingMore: boolean;
  isLoading: boolean;
}>();

const emit = defineEmits(["send", "load-more"]);

const message = ref("");

const handleSendMessage = async () => {
  if (message.value.trim()) {
    emit("send", message.value);
    message.value = "";
  }
};

// New function to determine if a message is the last from the sender
const isLastMessageFromSender = (index: number) => {
  if (index === props.messages.length - 1) return true;
  return (
    props.messages[index].sender.id !== props.messages[index + 1].sender.id
  );
};

const chatContainer = ref(null);

const loadMoreMessages = () => {
  emit("load-more");
};

// Modify the existing scrollToBottom function
const scrollToBottom = async (force = false) => {
  await nextTick();
  if (chatContainer.value) {
    if (
      force ||
      chatContainer.value.scrollTop + chatContainer.value.clientHeight >=
        chatContainer.value.scrollHeight - 100
    ) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  }
};

const statusColors = {
  ongoing: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-green-100 text-green-800',
};

watch(
  () => props.messages.length,
  async (newLength: number, oldLength: number) => {
    if (newLength > oldLength) {
      console.log('test')
      await nextTick(); // Wait for the DOM to update
      scrollToBottom(); // Smooth scroll to bottom after sending a message
    }
  }
);

onMounted(() => {
  scrollToBottom(true);
});
</script>

<template>
  <div class="flex px-4">
    <div
      class="flex flex-col justify-center items-center gap-2 min-h-[700px] w-full"
      v-if="isLoading"
    >
      <Loader width="70px" height="70px" />
      <span class="text-gray-300 text-base">Loading messages...</span>
    </div>
    <div class="flex flex-col min-h-[700px] w-full" v-else>
      <div
        class="flex flex-col justify-center items-center w-full my-auto"
        v-if="messages.length === 0"
      >
        <img
          src="/images/message-img.png"
          class="rounded-full object-cover mb-4"
        />
        <span class="text-gray-300 text-base">
          No message selected to display
        </span>
      </div>

      <div v-else class="flex-1 overflow-y-auto max-h-[500px] relative">
        <div
          class="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none"
          v-if="hasMoreMessages"
        ></div>
        <div ref="chatContainer" class="h-full overflow-y-auto scroll-smooth chat-container">
          <div v-if="hasMoreMessages" class="text-center py-2 relative z-10">
            <button
              @click="loadMoreMessages"
              class="text-[--primary-color] hover:underline focus:outline-none"
              :disabled="isLoadingMore"
            >
              {{ isLoadingMore ? "Loading..." : "Load More Messages" }}
            </button>
          </div>

          <div
            v-for="(message, index) in messages"
            :key="message.id"
            :class="{
              'animate-pulse': message.status === 'sending',
              'animate-scale-up':
                message.status === 'sending' ||
                message.sender.uuid !== user.uuid,
              'mb-4': isLastMessageFromSender(index),
              'mb-1': !isLastMessageFromSender(index),
            }"
          >
            <div class="flex items-end">
              <div
                v-if="message.sender.id !== user.id"
                class="flex-shrink-0 mr-2"
              >
                <NuxtLink :to="`/users/${message.sender.uuid}`" v-if="isLastMessageFromSender(index)">
                  <img
                    v-if="message.sender.profile_image"
                    :src="message.sender.profile_image"
                    alt="User Avatar"
                    class="w-[50px] h-[50px] rounded-full"
                  />
                  <span
                    v-else
                    class="w-[50px] h-[50px] rounded-md flex justify-center items-center"
                  >
                    <IconsAvatar width="100%" height="100%" fill="#d1d5db" />
                  </span>
                </NuxtLink>

                <span
                  class="w-[50px] h-[50px] rounded-md flex justify-center items-center"
                  v-else
                >
                </span>
              </div>

              <div class="flex-grow">
                <div 
                class="bg-[--background-color] text-[--text-color] rounded-md p-3"
                :class="[
                  'max-w-[70%] w-fit p-3 rounded-lg text-xs md:text-sm',
                  { 'ml-auto': message.sender.id === user.id },
                ]"
                v-if="JSON.parse(message.message).type == 'job'"
                >
                  <div class="flex flex-col gap-2">
                    Job status updated
                    <span class="text-base font-medium">{{JSON.parse(message.message).job.title}}</span>
                    <span :class="[
                      'rounded-full p-2 text-xs w-fit', 
                      statusColors[JSON.parse(message.message).job.status]
                    ]">
                      Status: {{JSON.parse(message.message).job.status}}
                    </span>
                    <NuxtLink 
                      :to="`/profile/jobs/${JSON.parse(message.message).job.id}`" 
                      class="text-xs md:text-sm flex flex-col gap-1 bg-[--primary-color] items-center justify-center text-white py-2 px-4 rounded-md w-fit min-w-[150px]"
                      target="_blank"
                    >
                      View Job
                    </NuxtLink>
                  </div>
                </div>
                <div
                  class="bg-gray-200 text-[--text-color]"
                  :class="[
                    'max-w-[70%] w-fit p-3 rounded-lg',
                    { 'ml-auto': message.sender.id === user.id },
                  ]"
                  v-else
                >
                  {{ JSON.parse(message.message).text }}
                </div>
              </div>

              <div
                v-if="message.sender.id === user.id"
                class="flex-shrink-0 ml-2"
              >
                <NuxtLink :to="`/users/${message.sender.uuid}`" v-if="isLastMessageFromSender(index)">
                  <img
                    v-if="message.sender.profile_image"
                    :src="message.sender.profile_image"
                    alt="User Avatar"
                    class="w-[50px] h-[50px] rounded-full"
                  />
                  <span
                    v-else
                    class="w-[50px] h-[50px] rounded-md flex justify-center items-center"
                  >
                    <IconsAvatar width="100%" height="100%" fill="#d1d5db" />
                  </span>
                </NuxtLink>

                <span
                  class="w-[50px] h-[50px] rounded-md flex justify-center items-center"
                  v-else
                >
                </span>
              </div>
            </div>

            <div
              v-if="isLastMessageFromSender(index)"
              class="text-xs text-gray-500 mt-2"
              :class="[
                message.sender.id === user.id
                  ? 'text-right mr-[72px]'
                  : 'text-left',
                'ml-[72px]',
              ]"
            >
              {{ formatDateToLocaleString(message.created_at) }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col mt-auto">
        <FormElementsTextarea
          v-model="message"
          inputClass="px-4 py-2 min-h-[200px] rounded-t border focus:border-[--primary-color] focus-visible:outline-none transition-all duration-300 w-full"
          placeholder="Type your message here..."
          :resizable="false"
        />
        <div class="border-x border-b class flex justify-end p-2">
          <button
            type="button"
            class="primary-button-sm w-fit ml-auto"
            @click="handleSendMessage"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes scaleUp {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale-up {
  animation: scaleUp 0.3s ease-out;
}

.scroll-smooth {
  scroll-behavior: smooth;
}
</style>
