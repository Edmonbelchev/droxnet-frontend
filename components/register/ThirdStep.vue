
<script setup lang="ts">
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

defineProps({
  loadingCodeVerify: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["verifyCode"]);

const toast: any = useNuxtApp().$toast;
const verificationCode: Ref<String> = ref("");
const loadingCodeResend: Ref<Boolean> = ref(false);

const submit = async () => {
  v$.value.$validate();

  if (!v$.value.$error) {
    emit("verifyCode", verificationCode.value);
  }
};

const resendCode = async () => {
  loadingCodeResend.value = true;
  const response = await sendEmailVerification();

  if (response.status.value === "success") {
    toast.success("Verification code sent successfully");
  } else {
    toast.error("Failed to send verification code");
  }
  loadingCodeResend.value = false;
};

const rules = computed(() => {
  return {
    verification_code: {
      required: helpers.withMessage(
        "The verification code field is required",
        required
      ),
      minLength: helpers.withMessage(
        "The verification code field must be at least 6 characters",
        minLength(6)
      ),
      maxLength: helpers.withMessage(
        "The verification code field must be at most 6 characters",
        maxLength(6)
      ),
    },
  };
});

const v$ = useVuelidate(rules, { verification_code: verificationCode });
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <img
      src="/images/envelope.webp"
      class="w-44 md:w-50 mx-auto my-6"
      alt="Envelope Image"
    />

    <span class="text-xs md:text-sm font-light">
      We've sent verification code on your email.<br/>
      <a href="#" class="text-[--blue-color]">Why I need code?</a>
    </span>

    <FormElementsInput
      v-model="verificationCode"
      type="text"
      placeholder="Enter Verification Code"
      name="verification_code"
      :error="v$.verification_code.$error"
      :valid="!v$.verification_code.$invalid"
      :errorMessages="v$.verification_code.$errors"
      @touch="v$.verification_code.$touch"
    />

    <button
      type="button"
      class="primary-button uppercase w-fit mb-4 flex items-center gap-2"
      @click="submit"
    >
      Verify now <Loader width="12" v-if="loadingCodeVerify" />
    </button>

    <span class="text-xs md:text-sm flex gap-1">
      Didn't receive the code?
      <button
        type="button"
        class="text-[--blue-color] flex gap-1 items-center"
        @click="resendCode"
      >
        Resend Code <Loader width="14" v-if="loadingCodeResend" />
      </button>
    </span>
  </div>
</template>