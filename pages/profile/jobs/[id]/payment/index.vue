<script setup lang="ts">
import { sendMoney } from '~/composables/stripe';

definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const authStore = useAuthStore();
const toast = useNuxtApp().$toast;

const job: Ref<Object> = ref({});
const loading: Ref<boolean> = ref(true);
const isProcessing = ref(false);

const amount = ref(0);
const recipient = ref(null);
const paymentMethodId = ref(null);
const cards = ref([]);

const retrieveJob = async () => {
  try {
    const response = await fetchJob(route.params.id);

    if (response.status.value === "success") {
      job.value = response.data.value.data;

      // Set recipient UUID from accepted proposal
      recipient.value = job.value?.accepted_proposals[0]?.user_uuid;
      
      // Set amount from accepted proposal's price
      if (job.value?.accepted_proposals[0]?.price) {
        amount.value = job.value.accepted_proposals[0].price;
      }
    }
  } catch (error) {
    console.error("Error fetching job:", error);
    toast.error("Failed to retrieve job.");
  }

  loading.value = false;
};

const retrieveCards = async () => {
  const response = await fetchUserCards()

  if (response.status.value === "success") {
    cards.value = response.data.value.data;
  } else {
    toast.error(response.error);
  }
}

const handlePayment = async () => {
  if (!recipient.value || !amount.value || !paymentMethodId.value) {
    toast.error('Please enter all details');
    return;
  }

  try {
    isProcessing.value = true;

    // Send request to Laravel backend
    const response = await sendMoney(amount.value, recipient.value, paymentMethodId.value);

    if (response.status._value === "success") {
      toast.success("Money sent successfully");
    } else {
      toast.error(response.error || 'Failed to send money');
    }
  } catch (error: any) {
    console.error('Payment failed:', error);
    toast.error(error.message || 'Payment failed');
  } finally {
    isProcessing.value = false;
  }
};

onMounted(async () => {
  try {
    await retrieveJob();
    await retrieveCards()
  } catch (error: any) {
    console.error('Stripe initialization failed:', error);
    toast.error(error.message || 'Failed to initialize payment form');
  }
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="relative">
      <ProfileSidebarMenu :user="authStore.user" />
      
      <div class="p-4 max-w-[640px] mx-auto">
        <div class="payments-container p-6 bg-base-100 shadow-xl rounded-md">
          <h1 class="text-2xl font-bold mb-6">Payment for Job</h1>

          <!-- Job Title -->
          <div class="mb-6">
            <h2 class="text-lg font-semibold">{{ job?.title }}</h2>
          </div>

          <!-- Freelancer Info -->
          <div v-if="job?.accepted_proposals?.[0]?.user" class="mb-8 p-4 bg-base-200 rounded-lg">
            <div class="flex items-center gap-4">
              <img 
                :src="job.accepted_proposals[0].user.profile_image" 
                :alt="`${job.accepted_proposals[0].user.first_name} ${job.accepted_proposals[0].user.last_name}`"
                class="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 class="text-lg font-semibold">
                  {{ job.accepted_proposals[0].user.first_name }} {{ job.accepted_proposals[0].user.last_name }}
                </h3>
                <p v-if="job.accepted_proposals[0].user.tagline" class="text-sm text-gray-600">
                  {{ job.accepted_proposals[0].user.tagline }}
                </p>
                <p class="text-sm text-primary mt-1">
                  Agreed Amount: ${{ job.accepted_proposals[0].price }}
                </p>
              </div>
            </div>
          </div>

          <form @submit.prevent="handlePayment" class="space-y-6">
            <!-- Payment Method Selection -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Payment Method</span>
              </label>

              <!-- Saved Cards -->
              <div v-if="cards && cards.length" class="space-y-3">
                <div 
                  v-for="card in cards" 
                  :key="card.payment_method_id"
                  class="flex items-center p-3 border rounded-lg cursor-pointer hover:border-primary transition-colors"
                  :class="{
                    'border-primary bg-primary/5': paymentMethodId === card.payment_method_id,
                    'border-base-300': paymentMethodId !== card.payment_method_id
                  }"
                  @click="paymentMethodId = card.payment_method_id"
                >
                  <input
                    type="radio"
                    :name="card.payment_method_id"
                    :value="card.payment_method_id"
                    v-model="paymentMethodId"
                    class="radio radio-primary"
                  />
                  <div class="ml-3 flex-grow">
                    <div class="flex items-center gap-2">
                      <span class="font-medium capitalize">{{ card.brand }}</span>
                      <span class="text-sm">•••• {{ card.last4 }}</span>
                      <span v-if="card.is_default" class="badge badge-primary badge-sm">Default</span>
                    </div>
                    <div class="text-sm text-gray-600">
                      Expires {{ card.exp_month }}/{{ card.exp_year }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- No Cards Message -->
              <div v-else class="text-center py-4 text-gray-600">
                No payment methods found. Please add a card in your payment settings.
              </div>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit"
              class="primary-button w-full"
              :disabled="isProcessing || !job?.accepted_proposals?.[0]?.user"
            >
              <span v-if="isProcessing" class="flex items-center justify-center gap-2">
                <Loader width="14" height="14" />
                Processing Payment...
              </span>
              <span v-else>
                Pay ${{ amount }}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
