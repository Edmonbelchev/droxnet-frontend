<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js';
import type { Stripe, StripeElements, StripeElement } from '@stripe/stripe-js';
import { addPaymentMethods } from '~/composables/useStripe';

definePageMeta({
  middleware: "auth",
});

const toast: any = useNuxtApp().$toast;
const authStore = useAuthStore();
const stripe = ref<Stripe | null>(null);
const cardElement = ref<StripeElement | null>(null);
const isLoading = ref(false);

// Initialize Stripe
onMounted(async () => {
  stripe.value = await loadStripe(useRuntimeConfig().public.stripe.key);

  if (stripe.value) {
    const elements = stripe.value.elements();
    cardElement.value = elements.create("card", {
      hidePostalCode: true,
      style: {
        base: {
          fontSize: '16px',
          color: '#32325d',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontSmoothing: 'antialiased',
          '::placeholder': {
            color: '#aab7c4'
          },
          iconColor: '#666EE8'
        },
        invalid: {
          color: '#dc2626',
          iconColor: '#dc2626'
        }
      }
    });
    cardElement.value.mount("#card-element");
  }
});

const handleSubmit = async () => {
  if (!stripe.value || !cardElement.value) {
    toast.error("Stripe is not initialized");
    return;
  }

  isLoading.value = true;

  try {
    // Create the payment method
    const { paymentMethod, error } = await stripe.value.createPaymentMethod({
      type: 'card',
      card: cardElement.value,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!paymentMethod) {
      throw new Error('Failed to create payment method');
    }

    // Add payment method using our composable
    const { status, error: apiError } = await addPaymentMethods(paymentMethod.id);

    if (status === 'error') {
      throw new Error(apiError?._object?.[apiError._key]?.message || 'Failed to add payment method');
    }

    toast.success('Payment method added successfully');
    navigateTo('/profile/payments/deposit');

  } catch (error: any) {
    toast.error(error.message);
    cardElement.value?.clear();
  } finally {
    isLoading.value = false;
  }
};

// Cleanup on unmount
onUnmounted(() => {
  if (cardElement.value) {
    cardElement.value.destroy();
  }
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="relative">
      <ProfileSidebarMenu :user="authStore.user" />

      <div class="bg-[--background-color] py-8 px-4 md:py-10 md:px-16 md:min-h-[1200px]">
        <div class="max-w-4xl mx-auto">
          <!-- Header -->
          <div class="mb-6">
            <div class="flex items-center gap-4 mb-2">
              <NuxtLink 
                to="/profile/payments/deposit"
                class="text-gray-500 hover:text-gray-700"
              >
                <Icon name="heroicons:arrow-left" class="w-5 h-5" />
              </NuxtLink>
              <h1 class="text-2xl font-bold text-gray-900">Add Payment Method</h1>
            </div>
            <p class="text-gray-600 ml-9">Add a new credit or debit card to your account</p>
          </div>

          <!-- Card Form -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <form @submit.prevent="handleSubmit">
              <!-- Card Element -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Card Information
                </label>
                <div 
                  id="card-element" 
                  class="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500"
                >
                  <!-- Stripe Card Element will be mounted here -->
                </div>
              </div>

              <!-- Security Note -->
              <div class="mb-6">
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <Icon name="heroicons:lock-closed" class="w-4 h-4" />
                  <span>Your payment information is secured by Stripe</span>
                </div>
              </div>

              <!-- Buttons -->
              <div class="flex gap-4">
                <NuxtLink 
                  to="/profile/payments/deposit"
                  class="flex flex-1 items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </NuxtLink>
                
                <button 
                  type="submit"
                  class="flex-1 primary-button cursor-pointer"
                  :disabled="isLoading"
                >
                  <div class="flex items-center justify-center gap-2">
                    <Loader v-if="isLoading" width="12" height="12" />
                    <span>{{ isLoading ? 'Adding...' : 'Add Card' }}</span>
                  </div>
                </button>
              </div>
            </form>
          </div>

          <!-- Cards Accepted -->
          <div class="mt-6 text-center">
            <p class="text-sm text-gray-500 mb-2">We accept the following cards</p>
            <div class="flex justify-center gap-2">
              <Icon name="fa:cc-visa" class="w-8 h-8 text-[#1A1F71]" />
              <Icon name="fa:cc-mastercard" class="w-8 h-8 text-[#FF5F00]" />
              <Icon name="fa:cc-amex" class="w-8 h-8 text-[#2E77BC]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
