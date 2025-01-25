<script setup lang="ts">
import { getWallet, withdrawFromWallet } from '~/composables/useWallet';

interface Wallet {
  balance: number;
  currency: string;
  stripe_connect_id: string | null;
}

definePageMeta({
  middleware: "auth",
});

const toast: any = useNuxtApp().$toast;
const authStore = useAuthStore();
const isLoading = ref(false);
const amount = ref<number | null>(null);
const wallet = ref<Wallet | null>(null);
const isLoadingWallet = ref(false);

const loadWallet = async () => {
  isLoadingWallet.value = true;
  try {
    const response = await getWallet();
    
    if (response.status._value === 'error') {
      const errorMessage = response.error?._object?.[response.error._key]?.data?.message || 'Failed to load wallet';
      toast.error(errorMessage);
    }

    wallet.value = response.data.value.data;
  } catch (error: any) {
    toast.error(error.message);
  } finally {
    isLoadingWallet.value = false;
  }
};

const handleWithdraw = async () => {
  if (!amount.value) {
    toast.error("Please enter an amount to withdraw");
    return;
  }

  if (amount.value > (wallet.value?.balance || 0)) {
    toast.error("Insufficient funds");
    return;
  }

  isLoading.value = true;

  try {
    const response = await withdrawFromWallet(amount.value);

    if (response.status._value === 'error') {
      const errorMessage = response.error?._object?.[response.error._key]?.data?.message || 'Failed to process withdrawal';
      toast.error(errorMessage);
    } else {
      toast.success('Withdrawal initiated successfully!');
      // Reload wallet to update balance
      await loadWallet();
      amount.value = null;
    }
  } catch (error: any) {
    toast.error(error.message);
  } finally {
    isLoading.value = false;
  }
};

// Load wallet on mount
onMounted(() => {
  loadWallet();
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
            <h1 class="text-2xl font-bold text-gray-900 mb-2">Withdraw Funds</h1>
            <p class="text-gray-600">Transfer money from your wallet to your bank account</p>
          </div>

          <!-- Current Balance Card Skeleton -->
          <div v-if="isLoadingWallet" class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div class="flex justify-between items-center">
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <div class="flex items-baseline gap-2">
                  <Skeleton className="h-8 w-40" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>
              <Skeleton className="h-8 w-8" />
            </div>
          </div>

          <!-- Current Balance Card -->
          <div v-else class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-sm font-medium text-gray-500">Available Balance</h2>
                <div class="mt-1 flex items-baseline">
                  <span class="text-2xl font-semibold text-gray-900">
                    ${{ wallet?.balance }}
                  </span>
                  <span class="ml-1 text-sm text-gray-500">USD</span>
                </div>
              </div>
              <Icon name="heroicons:banknotes" class="h-8 w-8 text-gray-400" />
            </div>
          </div>

          <!-- Withdraw Form -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <form @submit.prevent="handleWithdraw">
              <!-- Amount Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Withdraw
                </label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    v-model="amount"
                    :max="wallet?.balance"
                    min="1"
                    step="0.01"
                    required
                    class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm">USD</span>
                  </div>
                </div>
              </div>

              <!-- Bank Account Status Skeleton -->
              <div v-if="isLoadingWallet" class="mb-6">
                <div class="rounded-md bg-gray-50 p-4">
                  <div class="flex">
                    <Skeleton className="h-5 w-5" />
                    <div class="ml-3">
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-64 mb-4" />
                      <Skeleton className="h-9 w-40" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Bank Account Status -->
              <div v-else-if="!wallet?.stripe_connect_id" class="mb-6">
                <div class="rounded-md bg-yellow-50 p-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <Icon name="heroicons:exclamation-triangle" class="h-5 w-5 text-yellow-400" />
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-yellow-800">
                        Bank Account Required
                      </h3>
                      <div class="mt-2 text-sm text-yellow-700">
                        <p>You need to connect your bank account to receive withdrawals.</p>
                      </div>
                      <div class="mt-4">
                        <div class="-mx-2 -my-1.5 flex">
                          <NuxtLink
                            to="/profile/payments/connect-bank"
                            class="btn-primary text-sm px-4"
                          >
                            Connect Bank Account
                          </NuxtLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Submit Button Skeleton -->
              <div v-if="isLoadingWallet">
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-4 w-64 mx-auto" />
              </div>

              <!-- Submit Button -->
              <template v-else>
                <button 
                  type="submit"
                  class="w-full primary-button"
                  :class="isLoading || !amount || !wallet?.stripe_connect_id || amount > (wallet?.balance || 0) 
                  ? 'opacity-75 cursor-not-allowed'
                  : 'cursor-pointer'"
                  :disabled="isLoading || !amount || !wallet?.stripe_connect_id || amount > (wallet?.balance || 0)"
                >
                  <div class="flex items-center justify-center gap-2">
                    <Loader v-if="isLoading" width="12" height="12" />
                    <span>{{ isLoading ? 'Processing...' : 'Withdraw Funds' }}</span>
                  </div>
                </button>

                <!-- Processing Time Note -->
                <p class="mt-4 text-sm text-gray-500 text-center">
                  Withdrawals typically process within 1-3 business days
                </p>
              </template>
            </form>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>