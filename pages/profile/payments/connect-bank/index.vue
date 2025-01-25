<script setup lang="ts">
import { getStripeAccountLink } from '~/composables/useStripe';

definePageMeta({
  middleware: "auth",
});

const toast: any = useNuxtApp().$toast;
const authStore = useAuthStore();
const isLoading = ref(false);

const handleConnectBank = async () => {
  isLoading.value = true;
  try {
    const response = await getStripeAccountLink();

    if (response.status._value === 'error') {
      const errorMessage = response.error?._object?.[response.error._key]?.data?.message || 'Failed to create Stripe Connect account';
      toast.error(errorMessage);
    }

    // Redirect to Stripe Connect onboarding
    if (response.data?.value?.data?.url) {
      window.location.href = response.data.value.data.url;
    } else {
      throw new Error('No redirect URL received');
    }

  } catch (error: any) {
    toast.error(error.message);
  } finally {
    isLoading.value = false;
  }
};
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
                to="/profile/payments/withdraw"
                class="text-gray-500 hover:text-gray-700"
              >
                <Icon name="heroicons:arrow-left" class="w-5 h-5" />
              </NuxtLink>
              <h1 class="text-2xl font-bold text-gray-900">Connect Bank Account</h1>
            </div>
            <p class="text-gray-600 ml-9">Set up your bank account to receive payments</p>
          </div>

          <!-- Connect Bank Card -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="text-center">
              <!-- Icon -->
              <div class="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Icon name="heroicons:building-library" class="h-6 w-6 text-blue-600" />
              </div>

              <!-- Title -->
              <h2 class="text-lg font-medium text-gray-900 mb-2">
                Set up your bank account
              </h2>

              <!-- Description -->
              <p class="text-gray-500 mb-6 max-w-md mx-auto">
                You'll be redirected to Stripe to securely connect your bank account. This is required to receive withdrawals.
              </p>

              <!-- Features List -->
              <div class="mb-8">
                <div class="max-w-sm mx-auto">
                  <div class="flex items-start gap-3 mb-4 text-left">
                    <div class="flex-shrink-0 mt-1">
                      <Icon name="heroicons:check-circle" class="h-5 w-5 text-green-500" />
                    </div>
                    <p class="text-sm text-gray-600">
                      Secure connection through Stripe's platform
                    </p>
                  </div>
                  <div class="flex items-start gap-3 mb-4 text-left">
                    <div class="flex-shrink-0 mt-1">
                      <Icon name="heroicons:check-circle" class="h-5 w-5 text-green-500" />
                    </div>
                    <p class="text-sm text-gray-600">
                      Receive payments directly to your bank account
                    </p>
                  </div>
                  <div class="flex items-start gap-3 text-left">
                    <div class="flex-shrink-0 mt-1">
                      <Icon name="heroicons:check-circle" class="h-5 w-5 text-green-500" />
                    </div>
                    <p class="text-sm text-gray-600">
                      Fast and secure withdrawals within 1-3 business days
                    </p>
                  </div>
                </div>
              </div>

              <!-- Connect Button -->
              <button 
                @click="handleConnectBank"
                class="w-full sm:w-auto primary-button"
                :disabled="isLoading"
              >
                <div class="flex items-center justify-center gap-2">
                  <Loader v-if="isLoading" width="12" height="12" />
                  <Icon 
                    v-else
                    name="heroicons:arrow-right-circle" 
                    class="h-5 w-5"
                  />
                  <span>{{ isLoading ? 'Connecting...' : 'Connect with Stripe' }}</span>
                </div>
              </button>

              <!-- Security Note -->
              <div class="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <Icon name="heroicons:lock-closed" class="w-4 h-4" />
                <span>Your banking information is secured by Stripe</span>
              </div>
            </div>
          </div>

          <!-- FAQ Section -->
          <div class="mt-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-900 mb-1">Is my banking information secure?</h4>
                <p class="text-sm text-gray-500">Yes, all banking information is handled securely by Stripe, a leading payment processor. We never store your banking details directly.</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 mb-1">How long does it take to receive payments?</h4>
                <p class="text-sm text-gray-500">Once your bank account is connected, withdrawals typically process within 1-3 business days.</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 mb-1">What information do I need to connect my bank?</h4>
                <p class="text-sm text-gray-500">You'll need your bank account number and routing number. Some banks also allow instant verification through your online banking credentials.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>