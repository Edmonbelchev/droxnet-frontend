<script setup>
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const toast = useNuxtApp().$toast;

// Access the auth store
const authStore = useAuthStore();
const isLoading = ref(false);

const form = ref({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
});

const register = async () => {

};
</script>

<template>
  <NuxtLayout name="default">
    <div class="bg-[--background-color] px-10 py-20 flex justify-center">
      <div class="max-w-[730px] w-full bg-white rounded-md p-10">
        <form class="flex flex-col gap-4" @submit.prevent="register">
          <h2 class="text-2xl text-gray-800 font-bold text-center">
            Join For a Good Start
          </h2>

         <RegisterFirstStep :form="form" />
        </form>

        <h4>Join Now With</h4>
        <p>
          Use a social account for faster login or easy registration to directly
          get in to your account and start a good business
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>