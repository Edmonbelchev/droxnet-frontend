<script setup lang="ts">
const props = defineProps<{
    conversations: Record<string, {
        id: number;
        freelancer: {
            id: number;
            first_name: string;
            last_name: string;
            profile_image: string;
        };
        employer: {
            id: number;
            first_name: string;
            last_name: string;
            profile_image: string;
        };
    }>
    user: any
    isLoading: boolean
    isLoadingSearch: boolean
}>();

const emit = defineEmits(['search'])

const messages = inject('messages')
const initializePusher = inject('initializePusher')
const search = ref('')

const messagesPerPage = 10
const messagesPage = ref(1)
const selectedConversation = ref(null)
const isLoadingMore = ref(false)
const hasMoreMessages = ref(false)
const loadingMessages = ref(true)
const isLoadingConversation = ref(false)

const retrieveMessages = async (conversationId: string, page = 1) => {
    isLoadingConversation.value = true
    const response = await fetchMessages(messagesPerPage, page, conversationId)

    if (response.status.value === 'success') {
        if (page === 1) {
            messages.value = response.data.value.data.reverse()
            selectedConversation.value = conversationId
        } else {
            messages.value = [...response.data.value.data.reverse(), ...messages.value]
        }

        hasMoreMessages.value = 
          response.data.value.meta.total >= messagesPerPage 
          && response.data.value.meta.current_page != response.data.value.meta.last_page
    }

    loadingMessages.value = false
    isLoadingConversation.value = false
}

const loadMoreMessages = async () => {
    if (isLoadingMore.value || !hasMoreMessages.value) return;

    isLoadingMore.value = true;
    messagesPage.value++;
    await retrieveMessages(selectedConversation.value, messagesPage.value);
    isLoadingMore.value = false;
};

const send = async (message: string) => {
  const tempId = Date.now().toString()
  const tempMessage = {
    id: tempId,
    message: { text: message },
    sender: { id: props.user.id },
    status: 'sending',
    created_at: new Date().toISOString()
  }
  messages.value.push(tempMessage)

  const form = ref({
    message: JSON.stringify({ text: message }),
    conversation_id: selectedConversation.value
  })

  const response = await sendMessage(form)

  if (response.status.value === 'success') {
    // We'll update the message when we receive it from Pusher
  } else {
    // Remove the temporary message if sending failed
    messages.value = messages.value.filter(m => m.id !== tempId)
    // Optionally, show an error message to the user
  }
}

const getOtherUser = (conversationID: number | string) => {
  const conversationUser = Object.values(props.conversations).find((c: any) => c.id === conversationID)

  return props.user.role === 'employer' ? conversationUser?.freelancer : conversationUser?.employer;
}

const submitSearch = () => {
  emit('search', search.value)
}

watch(selectedConversation, (newVal) => {
    if (newVal) {
        messagesPage.value = 1
        initializePusher(newVal, props.user.id)
    }
})
</script>

<template>
  <div
    class="flex flex-col justify-center items-center max-w-[1030px] mx-auto shadow-lg"
  >
    <div class="flex flex-col bg-white rounded-md w-full">
      <h2 class="border-b p-4 md:p-6 text-[--text-color] text-base md:text-lg">
        Messages
      </h2>
    </div>

    <div class="flex flex-col md:flex-row w-full relative min-h-[900px] md:min-h-0">
      <div class="flex flex-col bg-white border-r md:w-1/4">
        <div class="p-4 border-b">
          <div class="flex">
            <input
              type="text"
              class="border-y border-l rounded-l p-3 w-full flex-1"
              placeholder="Search Here"
              v-model="search"
            />

            <button
              type="button"
              class="p-2 border-[--primary-color] rounded-r w-[50px] flex items-center justify-center bg-[--primary-color]"
              :class="
                isLoadingSearch
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer'
              "
              @click="submitSearch"
            >
              <Icon
                name="simple-line-icons:magnifier"
                class="text-sm text-white"
              />
            </button>
          </div>
        </div>

        <div class="flex flex-col overflow-y-auto max-h-[300px] md:max-h-[500px]" v-if="isLoading">
          <div v-for="i in 10" :key="i" class="bg-gray-200 p-4 border-b flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />

            <div class="flex flex-col gap-1 flex-1">
              <Skeleton className="w-full h-[15px] rounded" />
              <Skeleton className="w-full h-[7px] rounded" />
            </div>
          </div>
        </div>

        <div 
          class="flex flex-col overflow-y-auto max-h-100% md:max-h-[500px]"
          v-else>
            <button
              type="button"
              class="flex items-center border-b gap-3 p-4 bg-white hover:border-l-4 hover:border-l-[--primary-color] duration-100"
              :class="selectedConversation === conversation.id ? 'border-l-4 border-l-[--primary-color]' : ''"
              v-for="conversation in Object.values(conversations)"
              :key="conversation.id"
              @click="retrieveMessages(conversation.id)"
            >
              <img
                :src="getOtherUser(conversation.id).profile_image"
                :alt="`${getOtherUser(conversation.id).first_name} ${getOtherUser(conversation.id).last_name}`"
                class="w-10 h-10 rounded-full object-cover"
                v-if="getOtherUser(conversation.id).profile_image"
              />

              <span
                class="w-10 h-10 rounded-md flex justify-center items-center"
                v-else
              >
                <IconsAvatar width="100%" height="100%" fill="#d1d5db" />
              </span>

              <div class="flex flex-col overflow-hidden">
                <h3 class="text-left text-sm font-medium text-[--text-color]">
                  {{ getOtherUser(conversation.id).first_name }} {{ getOtherUser(conversation.id).last_name }}
                </h3>
                <p 
                  class="text-xs text-gray-500 truncate w-full text-left" 
                  v-if="conversation.last_message && JSON.parse(conversation.last_message.message).type == 'job'"
                >
                  Job: {{JSON.parse(conversation.last_message.message).job.title}}<br>
                </p>
                <p 
                  class="text-xs text-gray-500 truncate w-full text-left" 
                  v-else-if="conversation.last_message"
                >
                  {{ conversation.last_message.sender.id === props.user.id 
                    ? `You: ${JSON.parse(conversation.last_message.message).text}` 
                    : `${getOtherUser(conversation.id)?.first_name}: ${JSON.parse(conversation.last_message.message).text}` }}
                </p>
                <p class="text-xs text-gray-500 truncate w-full text-left" v-else>No messages yet</p>
              </div>
            </button>
        </div>
      </div>

      <div class="flex flex-col bg-white rounded-md w-3/4 px-4 pb-4">
        <SkeletonConversationsElement v-if="isLoadingConversation" />
        <template v-else-if="selectedConversation">
          <ConversationsElement 
            :messages="messages" 
            @send="send" 
            @close="selectedConversation = null"
            :user="user" 
            @load-more="loadMoreMessages"
            :has-more-messages="hasMoreMessages"
            :is-loading-more="isLoadingMore"
            :key="selectedConversation"
            :other-user="getOtherUser(selectedConversation)"
          />
        </template>
        <template v-else>
          <div class="flex flex-col items-center justify-center h-full text-gray-500 py-20">
             <img
              src="/images/message-img.png"
              class="rounded-full object-cover mb-6"
            />

            <span class="text-gray-300 text-lg">
              No message selected to display
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
