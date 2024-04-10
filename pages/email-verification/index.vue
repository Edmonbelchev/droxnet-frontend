<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const toast: any = useNuxtApp().$toast;
const loadingCodeVerify: Ref<Boolean> = ref(false);

const verifyCode = async (code: any) => {
  loadingCodeVerify.value = true;
  const response = await validateEmail(code);

  if (response.data.value.status === true) {
    return navigateTo('/');
  } else {
    toast.error("Failed to verify email");
  }
  loadingCodeVerify.value = false;
}
</script>

<template>
  <NuxtLayout layout="default">
    <div class="bg-[--background-color] py-10 px-4 md:px-10 md:py-20 flex justify-center">
      <div
        class="flex flex-col justify-center items-center p-5 lg:p-8 max-w-[730px] w-full bg-white rounded-md"
      >
        <h2 class="text-xl lg:text-2xl text-gray-800 font-bold text-center">
            You're Almost There
        </h2>
        <span class="text-sm lg:text-base text-center mb-4  max-w-[500px]">
          Consectetur adipisicing elit sed dotem eiusmod tempor incune utnaem
          labore etdolore maigna aliqua enim poskina
        </span>
        <RegisterThirdStep @verifyCode="verifyCode($event)" :loadingCodeVerify="loadingCodeVerify" />
      </div>
    </div>
  </NuxtLayout>
</template>