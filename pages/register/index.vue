<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

definePageMeta({
  middleware: "auth",
});

const toast: any = useNuxtApp().$toast;

// Access the auth store
const authStore: any = useAuthStore();
const isLoading: Ref<Boolean> = ref(false);

const formData: Ref<Object> = ref({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: "",
  country: "",
  city: "",
  role: "freelancer",
  company_name: "",
  terms: false,
});

// Set first step as visible by default
const visibleStep: Ref<Number> = ref(1);
const loadingCodeVerify: Ref<Boolean> = ref(false);

const register = async () => {
  isLoading.value = true;

  const response = await authStore.signUp(formData.value);

  if (response.status.value != "error") {
    toast.success("Registration successful");
    visibleStep.value = 3;

    authStore.authenticated();
  } else {
    toast.error(response.errorMessage, {
      autoClose: false,
      position: "bottom-right",
    });
  }

  isLoading.value = false;
};

const verifyCode = async (code: any) => {
  loadingCodeVerify.value = true;
  const response = await validateEmail(code);

  if (response.data.value.status === true) {
    visibleStep.value = 4;
  } else {
    toast.error("Failed to verify email");
  }
  loadingCodeVerify.value = false;
}
</script>

<template>
  <NuxtLayout name="default">
    <div class="flex justify-center bg-[--background-color] px-4 py-10 lg:px-10 lg:py-20">
      <div class="max-w-[730px] w-full bg-white rounded-md">
        <div class="flex flex-col gap-4 p-5 lg:p-8">
          <div class="lg:px-8 flex flex-col gap-4">
            <h2 class="text-xl lg:text-2xl text-gray-800 font-bold text-center">
              <span v-if="visibleStep == 3"> You're Almost There </span>
              <span v-else>Congratulations!</span>
            </h2>

            <span class="text-sm lg:text-base text-center mb-4">
              Consectetur adipisicing elit sed dotem eiusmod tempor incune
              utnaem labore etdolore maigna aliqua enim poskina
            </span>

            <div class="flex justify-center items-center gap-2 lg:gap-4">
              <RegisterStepsIndicator
                :currentStep="visibleStep"
                :step="1"
                @changeStep="visibleStep = $event"
              />

              <RegisterStepsIndicator
                :currentStep="visibleStep"
                :step="2"
                lineIndicator="true"
                @submit="register"
                @changeStep="visibleStep = $event"
              />
              <RegisterStepsIndicator
                :currentStep="visibleStep"
                :step="3"
                lineIndicator="true"
                @changeStep="visibleStep = $event"
              />
              <RegisterStepsIndicator
                :currentStep="visibleStep"
                :step="4"
                lineIndicator="true"
              />
            </div>
          </div>

          <RegisterFirstStep
            :form="formData"
            @changeStep="visibleStep = $event"
            v-if="visibleStep == 1"
          />

          <RegisterSecondStep
            :form="formData"
            @register="register"
            @changeStep="visibleStep = $event"
            :isLoading="isLoading"
            v-if="visibleStep == 2"
          />

          <RegisterThirdStep 
            @verifyCode="verifyCode($event)"
            :loadingCodeVerify="loadingCodeVerify"
            v-if="visibleStep == 3" 
          />
        </div>

        <div class="border-t py-6" v-if="visibleStep !== 4">
          <p class="text-center text-xs md:text-sm text-gray-500">
            Already have an account?
            <NuxtLink to="/login" class="text-[--blue-color]">
              Login Now
            </NuxtLink>
          </p>
        </div>

        <div class="border-t py-6" v-else>
          <p class="text-center text-xs md:text-sm text-gray-500">
            <NuxtLink to="/profile" class="primary-button">
              View Profile
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>