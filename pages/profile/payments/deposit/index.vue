<script setup lang="ts">
import { getPaymentMethods, createDeposit } from '~/composables/useStripe';

interface PaymentMethod {
  id: number;
  payment_method_id: string;
  is_default: boolean;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  created_at: string;
  updated_at: string;
}

definePageMeta({
  middleware: "auth",
});

const toast: any = useNuxtApp().$toast;
const isLoading = ref(false);
const authStore = useAuthStore();
const amount = ref<number | null>(null);
const selectedPaymentMethod = ref<string | null>(null);
const paymentMethods = ref<PaymentMethod[]>([]);
const isLoadingPaymentMethods = ref(false);

const loadPaymentMethods = async () => {
  isLoadingPaymentMethods.value = true;
  try {
    const { data, status, error } = await getPaymentMethods();
    
    if (status === 'error') {
      throw new Error(error?._object?.[error._key]?.message || 'Failed to load payment methods');
    }

    paymentMethods.value = data.value.data;
    
    // If there's a default payment method, select it
    const defaultMethod = paymentMethods.value.find(pm => pm.is_default);
    if (defaultMethod) {
      selectedPaymentMethod.value = defaultMethod.payment_method_id;
    }
  } catch (error: any) {
    toast.error(error.message);
  } finally {
    isLoadingPaymentMethods.value = false;
  }
};

// Format card details for display
const formatCardDetails = (pm: PaymentMethod) => {
  return `•••• ${pm.last4} | Expires ${pm.exp_month}/${pm.exp_year}`;
};

// Get card brand icon
const getCardIcon = (brand: string) => {
  const icons: Record<string, string> = {
    visa: 'fa:cc-visa',
    mastercard: 'fa:cc-mastercard',
    amex: 'fa:cc-amex',
    discover: 'fa:cc-discover',
    default: 'fa:credit-card'
  };
  return icons[brand?.toLowerCase()] || icons.default;
};

onMounted(() => {
  loadPaymentMethods();
});

const handleDeposit = async () => {
  if (!amount.value || !selectedPaymentMethod.value) {
    toast.error("Please enter an amount and select a payment method");
    return;
  }

  isLoading.value = true;

  try {
    const response = await createDeposit(
      amount.value,
      selectedPaymentMethod.value
    );

    if (response.status._value === 'error') {
      const errorMessage = response.error?._object?.[response.error._key]?.data?.message || 'Failed to process deposit';

      toast.error(errorMessage);
    } else {
      toast.success('Deposit successful!');
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
            <h1 class="text-2xl font-bold text-gray-900 mb-2">Deposit Funds</h1>
            <p class="text-gray-600">Add money to your wallet</p>
          </div>

          <!-- Deposit Form -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <form @submit.prevent="handleDeposit">
              <!-- Amount Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Deposit
                </label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    v-model="amount"
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

              <!-- Payment Methods Section -->
              <div class="mb-6">
                <div class="flex justify-between items-center mb-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Select Payment Method
                  </label>
                  <NuxtLink 
                    to="/profile/payments/add-payment-method"
                    class="text-sm text-blue-600 hover:text-blue-500"
                  >
                    + Add new card
                  </NuxtLink>
                </div>
                
                <!-- Payment Methods Loading Skeleton -->
                <div v-if="isLoadingPaymentMethods" class="space-y-3">
                  <div v-for="i in 3" :key="i" class="relative flex items-center p-4 border rounded-lg">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="ml-4 h-8 w-8" />
                    <div class="ml-3 flex-1">
                      <Skeleton className="h-5 w-48" />
                    </div>
                  </div>
                </div>

                <!-- Empty State -->
                <div v-else-if="paymentMethods.length === 0" class="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <Icon name="heroicons:credit-card" class="mx-auto h-12 w-12 text-gray-400" />
                  <h3 class="mt-2 text-sm font-medium text-gray-900">No payment methods</h3>
                  <p class="mt-1 text-sm text-gray-500">Add a payment method to make deposits.</p>
                  <div class="mt-6">
                    <NuxtLink 
                      to="/profile/payments/add-payment-method"
                      class="btn-primary inline-flex items-center"
                    >
                      <Icon name="heroicons:plus" class="w-5 h-5 mr-2" />
                      Add Payment Method
                    </NuxtLink>
                  </div>
                </div>

                <!-- Payment Methods List -->
                <div v-else class="space-y-3">
                  <div 
                    v-for="pm in paymentMethods" 
                    :key="pm.id"
                    class="relative flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200"
                    :class="selectedPaymentMethod === pm.payment_method_id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'"
                    @click="selectedPaymentMethod = pm.payment_method_id"
                  >
                    <input
                      type="radio"
                      :value="pm.payment_method_id"
                      v-model="selectedPaymentMethod"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <Icon 
                      :name="getCardIcon(pm.brand)"
                      class="ml-4 h-8 w-8"
                      :class="{
                        'text-[#1A1F71]': pm.brand === 'visa',
                        'text-[#FF5F00]': pm.brand === 'mastercard',
                        'text-[#2E77BC]': pm.brand === 'amex',
                        'text-gray-400': !pm.brand
                      }"
                    />
                    <span class="ml-3 flex items-center gap-2">
                      <span class="text-sm font-medium text-gray-900">
                        {{ formatCardDetails(pm) }}
                      </span>
                      <span v-if="pm.is_default" class="text-xs text-blue-600 font-medium">
                        (Default)
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit"
                class="w-full primary-button cursor-pointer"
                :disabled="isLoading || !selectedPaymentMethod || !amount"
              >
                <div class="flex items-center justify-center gap-2">
                  <Loader v-if="isLoading" width="12" height="12" />
                  <span>{{ isLoading ? 'Processing...' : 'Deposit Funds' }}</span>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>