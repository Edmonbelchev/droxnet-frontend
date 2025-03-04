<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore();
const toast: any = useNuxtApp().$toast;

const walletIsLoading = ref(false);
const wallet = ref<any>(null);

const transactionsIsLoading = ref(true);
const transactions = ref<any[]>([]);
const page = ref(1);
const perPage = ref(3);
const total = ref(0);
const isLoadingPagination = ref(false);

const payoutInterval = ref<'daily' | 'weekly' | 'monthly'>('weekly');
const payoutIsLoading = ref(false);
const loading = ref(false);

const connectStripeAccount = async () => {
  loading.value = true;
  const response = await getStripeAccountLink();

  if(response.status.value === 'success') {
    window.location.href = response.data.value.data.url;
  }

  loading.value = false;
};

const updatePayoutSchedule = async () => {
  payoutIsLoading.value = true;
  const response = await configurePayouts(payoutInterval.value);
  
  if(response.status.value === 'success') {
    toast.success('Payout schedule updated successfully');
  } else {
    const errorMessage = response.error._object[response.error._key].data.message;
    toast.error(errorMessage);
  }

  payoutIsLoading.value = false;
};

const retrieveWallet = async () => {
  walletIsLoading.value = true;
  const response = await getWallet();

  if(response.status.value === 'success') {
    wallet.value = response.data.value.data;
  }

  walletIsLoading.value = false;
};

const retrieveTransactions = async () => {
  if(!isLoadingPagination.value) transactionsIsLoading.value = true;
  
  const response = await getTransactions(page.value, perPage.value);
  
  if(response.status.value === 'success') {
    transactions.value = response.data.value.data;
    total.value = response.data.value.meta.total;
  }

  if(transactionsIsLoading.value) transactionsIsLoading.value = false;
};

// Format currency with 2 decimal places
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: wallet.value?.currency || 'USD'
  }).format(amount);
};

// Get transaction status color
const getStatusColor = (status: string) => {
  const colors = {
    completed: 'text-green-600',
    pending: 'text-yellow-600',
    failed: 'text-red-600',
    disputed: 'text-orange-600'
  };
  return colors[status] || 'text-gray-600';
};

// Get transaction type display text
const getTransactionTypeText = (type: string) => {
  const types = {
    deposit: 'Deposit',
    withdrawal: 'Withdrawal',
    escrow_hold: 'Escrow Hold',
    escrow_release: 'Payment Release',
    refund: 'Refund'
  };
  return types[type] || type;
};

watch(page, async () => {
  isLoadingPagination.value = true;
  await retrieveTransactions();
  isLoadingPagination.value = false;
});

onMounted(async () => {
  await retrieveWallet();
  await retrieveTransactions();
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="relative">
      <ProfileSidebarMenu :user="authStore.user" />

      <div class="bg-[--background-color] py-8 px-4 md:py-10 md:px-16 md:min-h-[1200px]">
        <!-- Payments Content -->
        <div class="payments-page max-w-4xl mx-auto">
          <!-- Header Section -->
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900 mb-2">Payment Settings</h1>
            <p class="text-gray-600">Manage your payment methods and view transaction history</p>
          </div>

          <!-- Wallet Overview Skeleton -->
          <div v-if="walletIsLoading" class="grid md:grid-cols-3 gap-6 mb-6">
            <div v-for="i in 3" :key="i" class="bg-white rounded-lg shadow-sm p-6">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-32" />
            </div>
          </div>

          <!-- Wallet Overview -->
          <div v-else-if="wallet" class="grid md:grid-cols-3 gap-6 mb-6">
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-sm font-medium text-gray-500 mb-1">Available Balance</h3>
              <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(wallet.balance) }}</p>
            </div>
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-sm font-medium text-gray-500 mb-1">Escrow Balance</h3>
              <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(wallet.escrow_balance) }}</p>
            </div>
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-sm font-medium text-gray-500 mb-1">Pending Balance</h3>
              <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(wallet.pending_balance) }}</p>
            </div>
          </div>

          <!-- Connect Stripe Account Section Skeleton -->
          <div v-if="walletIsLoading" class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <Skeleton className="h-6 w-48 mb-4" />
            <div class="border border-dashed rounded-lg p-6 text-center">
              <div class="mb-4">
                <Skeleton className="h-14 w-14 rounded-full mx-auto" />
              </div>
              <Skeleton className="h-6 w-64 mx-auto mb-2" />
              <Skeleton className="h-4 w-48 mx-auto mb-4" />
              <Skeleton className="h-10 w-48 mx-auto" />
            </div>
          </div>

          <!-- Connect Stripe Account Section -->
          <div v-else-if="!wallet?.stripe_connect_id" class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 class="text-xl font-semibold mb-4">Connect Stripe Account</h2>
            
            <div class="border border-dashed rounded-lg p-6 text-center">
              <div class="mb-4">
                <div class="mx-auto h-14 w-14 flex items-center justify-center rounded-full bg-gray-100">
                  <Icon name="fa:cc-stripe" class="h-9 w-9 text-[#635BFF]" />
                </div>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-1">Connect Your Stripe Account</h3>
              <p class="text-gray-500 mb-4">Set up your Stripe account to receive payments</p>
              <button 
                class="btn-primary" 
                :class="{ 'opacity-75 cursor-not-allowed': loading }"
                :disabled="loading"
                @click="connectStripeAccount"
              >
                <div class="flex items-center justify-center gap-2">
                  <Loader v-if="loading" width="12" height="12" />
                  <span v-if="loading">Connecting...</span>
                  <span v-else>Connect Stripe Account</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Payout Settings -->
          <div v-else-if="wallet?.stripe_connect_id" class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 class="text-xl font-semibold mb-4">Payout Settings</h2>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Payout Schedule
                </label>
                <select 
                  v-model="payoutInterval"
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <button 
                class="primary-button w-full flex justify-center items-center gap-2"
                :class="{ 'opacity-75 cursor-not-allowed': payoutIsLoading }"
                :disabled="payoutIsLoading"
                @click="updatePayoutSchedule"
              >
                <Loader v-if="payoutIsLoading" width="12" height="12" />
                <span v-if="payoutIsLoading">Updating...</span>
                <span v-else>Update Payout Schedule</span>
              </button>
            </div>
          </div>

          <!-- Transaction History Skeleton -->
          <div v-if="transactionsIsLoading" class="bg-white rounded-lg shadow-sm p-6">
            <Skeleton className="h-6 w-48 mb-6" />
            <div class="space-y-4">
              <div v-for="i in 3" :key="i" class="flex justify-between items-center py-4">
                <div class="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div class="text-right space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          </div>

          <!-- Transaction History -->
          <div v-else class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold mb-4">Transaction History</h2>
            
            <!-- Empty State -->
            <div v-if="!transactions.length" class="text-center py-6">
              <div class="mb-4">
                <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
                  <Icon name="fa:history" class="h-6 w-6 text-gray-600" />
                </div>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-1">No transactions yet</h3>
              <p class="text-gray-500">Your transaction history will appear here</p>
            </div>

            <!-- Transaction List -->
            <div v-else class="divide-y relative">
              <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center" v-if="isLoadingPagination">
                <div class="absolute w-full h-full bg-white opacity-50 animate-pulse"></div>
                <Loader width="20" height="20" />
              </div>

              <div 
                v-for="transaction in transactions" 
                :key="transaction.id" 
                class="py-4 flex items-center justify-between"
              >
                <div>
                  <p class="font-medium">
                    {{ getTransactionTypeText(transaction.type) }}
                    <span v-if="transaction.job" class="text-gray-500">
                      - {{ transaction.job.title }}
                    </span>
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ new Date(transaction.created_at).toLocaleDateString() }}
                  </p>
                </div>
                <div class="text-right">
                  <p class="font-medium">{{ formatCurrency(transaction.amount) }}</p>
                  <p :class="[getStatusColor(transaction.status), 'text-sm capitalize']">
                    {{ transaction.status }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div v-if="total > perPage" class="mt-4 flex justify-center space-x-2">
              <Pagination
                :page="page"
                :perPage="perPage"
                :total="total"
                @update:currentPage="page = $event"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
