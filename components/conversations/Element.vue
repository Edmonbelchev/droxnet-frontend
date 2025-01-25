<script lang="ts" setup>
const props = defineProps<{
  messages: any[];
  user: any;
  otherUser: any;
  hasMoreMessages: boolean;
  isLoadingMore: boolean;
  isLoading: boolean;
}>();

const emit = defineEmits(["send", "load-more", "close"]);

const message = ref("");

const handleSendMessage = async () => {
  if (message.value.trim()) {
    emit("send", message.value);
    message.value = "";
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    handleSendMessage();
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
    const scrollThreshold = chatContainer.value.clientHeight * 0.2;
    const isNearBottom = 
      chatContainer.value.scrollTop + chatContainer.value.clientHeight >=
      chatContainer.value.scrollHeight - scrollThreshold;
      
    if (force || isNearBottom) {
      setTimeout(() => {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }, 100); // Small delay to ensure content is rendered
    }
  }
};

onMounted(() => {
  scrollToBottom(true);
});

watch(
  () => [...props.messages],
  async (newMessages, oldMessages) => {
    if (newMessages.length > oldMessages.length) {
      // Check if the new message was added at the end (new message)
      // or at the beginning (loading older messages)
      const isNewMessage = newMessages[newMessages.length - 1]?.id !== oldMessages[oldMessages.length - 1]?.id;
      
      if (isNewMessage) {
        scrollToBottom(true); // Only scroll for new messages
      }
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="absolute top-0 left-0 w-full h-full z-1 bg-white md:relative flex flex-col">
    <div class="flex flex-wrap items-center justify-between gap-3 p-4 border-b">
      <div class="flex items-center gap-3">
        <button @click="emit('close')" class="text-[--light-blue] hover:underline text-sm">
          <Icon name="fluent:arrow-left-20-regular" class="text-lg" />
        </button>
        <img
          v-if="otherUser?.profile_image"
          :src="otherUser.profile_image"
          alt="User Avatar"
          class="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full"
        />
        <span
          v-else
          class="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-md flex justify-center items-center"
        >
          <IconsAvatar width="100%" height="100%" fill="#d1d5db" />
        </span>
        <div class="flex flex-col">
          <span class="font-medium text-[--text-color]">
            {{ otherUser?.first_name }} {{ otherUser?.last_name }}
          </span>
        </div>
      </div>
      <NuxtLink
        :to="otherUser.role === 'employer' ? `/companies/${otherUser?.uuid}` : `/users/${otherUser?.uuid}`"
        class="text-[--light-blue] hover:underline text-sm"
      >
        View Profile
      </NuxtLink>
    </div>

    <div
      class="flex flex-col justify-center items-center gap-2 px-4 min-h-[700px] w-full"
      v-if="isLoading"
    >
      <Loader width="70px" height="70px" />
      <span class="text-gray-300 text-base">Loading messages...</span>
    </div>
    <div class="flex flex-col min-h-[700px] w-full px-4" v-else>
      <div
        class="flex flex-col justify-center items-center w-full my-auto"
        v-if="messages.length === 0"
      >
        <img
          src="/images/message-img.png"
          class="rounded-full object-cover mb-4"
        />
        <span class="text-gray-300 text-base">
          There are no messages yet to display in this conversation.
        </span>
      </div>

      <div v-else class="flex-1 overflow-y-auto max-h-[500px] relative pt-4">
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
                    class="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full"
                  />
                  <span
                    v-else
                    class="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-md flex justify-center items-center"
                  >
                    <IconsAvatar width="100%" height="100%" fill="#d1d5db" />
                  </span>
                </NuxtLink>

                <span
                  class="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-md flex justify-center items-center"
                  v-else
                >
                </span>
              </div>

              <div class="flex-grow">
                <div
                  class="bg-gray-200 text-[--text-color]"
                  :class="[
                    'max-w-[70%] w-fit p-3 rounded-lg text-xs md:text-sm',
                    { 'ml-auto': message.sender.id === user.id },
                  ]"
                >
                  {{ message.message }}
                </div>
              </div>

              <div
                v-if="message.sender.id === user.id"
                class="flex-shrink-0 ml-2"
              >
                <NuxtLink :to="`/users/${message.sender.uuid}`" v-if="isLastMessageFromSender(index)">
                  <img
                    v-if="user.profile_image"
                    :src="user.profile_image"
                    alt="User Avatar"
                    class="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full"
                  />
                  <span
                    v-else
                    class="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-md flex justify-center items-center"
                  >
                    <IconsAvatar width="100%" height="100%" fill="#d1d5db" />
                  </span>
                </NuxtLink>

                <span
                  class="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-md flex justify-center items-center"
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
                  ? 'text-right mr-[50px] md:mr-[60px]'
                  : 'text-left',
                'ml-[50px] md:ml-[60px]',
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
          @keydown="handleKeyDown"
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
