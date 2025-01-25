<script setup lang="ts">
import { ref, provide } from 'vue'

definePageMeta({
  middleware: "auth",
});

const { $pusher } = useNuxtApp();

const authStore = useAuthStore();

const conversations = ref([]);
const messages = ref([]);
const isLoading = ref(true);

const search = ref('');
const perPage = ref(10);
const page = ref(1);
const isLoadingSearch = ref(false);

const retrieveConversations = async (query: string = '', loadingSearch: boolean = false) => {
  if(loadingSearch) {
    isLoadingSearch.value = true;
  }

  const response = await fetchConversations(perPage.value, page.value, query);

  if (response.status.value === "success") {
    conversations.value = response.data.value.data;
  }

  isLoading.value = false;

  if(loadingSearch) {
    isLoadingSearch.value = false;
  }
};

const initializePusher = (conversationId: string, userId: number) => {
  console.log("Initializing Pusher for conversation:", conversationId);
  
  const channelName = `conversation.${conversationId}`;
  
  try {
    // Unsubscribe from the previous channel if it exists
    if (window.currentChannel) {
      $pusher.unsubscribe(window.currentChannel);
    }
    
    // Subscribe to the new channel
    const channel = $pusher.subscribe(channelName);
    window.currentChannel = channelName; // Store the current channel name

    channel.bind("message.created", (data: any) => {
      const newMessage = data.message;

      // Update the last_message of the corresponding conversation
      const conversationIndex = conversations.value.findIndex(c => c.id === conversationId);
      if (conversationIndex !== -1) {
        conversations.value[conversationIndex].last_message = newMessage; // Update last_message
      }

      // Check if this message is from the current user
      if (newMessage.sender.id === userId) {
        // Update the existing 'sending' message
        const index = messages.value.findIndex(m => m.status === 'sending');
        if (index !== -1) {
          messages.value[index] = newMessage;
        }
      } else {
        // Add the new message from other user
        messages.value.push(newMessage);
      }
    });

    // ... rest of the Pusher initialization ...
  } catch (error) {
    console.error("Error initializing Pusher:", error);
  }
};

provide('messages', messages)
provide('initializePusher', initializePusher)

onMounted(async () => {
  await retrieveConversations();
});

watch(search, (newVal: string) => {
  retrieveConversations(newVal, true);
})
</script>

<template>
  <NuxtLayout name="default">
    <div class="relative">
      <ProfileSidebarMenu :user="authStore.user" />

      <div class="px-4 py-8">
        <ConversationsListing
          :conversations="conversations"
          :isLoading="isLoading"
          :user="authStore.user"
          @search="search = $event"
          :isLoadingSearch="isLoadingSearch"
          @initializePusher="initializePusher"
        />
      </div>
    </div>
  </NuxtLayout>
</template>
