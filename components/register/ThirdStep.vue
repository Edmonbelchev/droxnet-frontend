
<script>
const verificationCode = ref('');
</script>

<template>
  <div class="flex flex-col gap-2">
    <img
      src="~/assets/images/envelope.webp"
      class="w-50 mx-auto my-6"
      alt="Envelope Image"
    />

    <span class="font-light">
        We've sent verification code on your email. 
        <a href="#" class="text-[--blue-color]">Why I need code?</a>
    </span>

    <FormElementsInput
      v-model="verificationCode"
      type="text"
      placeholder="Enter Verification Code"
      name="verification_Code"
    />

    <button type="button" class="primary-button uppercase w-fit">Verify now</button>
  </div>
</template>