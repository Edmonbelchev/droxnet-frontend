<script setup lang="ts">
const props = defineProps({
  reportable_type: {
    type: String,
    required: true,
  },
  reportable_id: {
    type: Object,
    required: true,
  },
  reported: {
    type: Boolean,
    required: true,
  },
});

const toast: any = useNuxtApp().$toast;

const reasonOptions = [
  {
    label: "Spam",
    value: "spam",
  },
  {
    label: "Scam",
    value: "scam",
  },
  {
    label: "Other",
    value: "other",
  },
];

const form: Ref<Object> = ref({
  reportable_type: props.reportable_type,
  reportable_id: props.reportable_id,
  reason: reasonOptions[0].value,
  description: "",
});

const disabled = ref(false);

const loading: Ref<boolean> = ref(false);

const submit = async () => {
  loading.value = true;
  const response = await storeReport(form);

  if (response.status.value == "error") {
    toast.error(response.error);
  } else {
    toast.success("Report submitted successfully");
    disabled.value = true;
  }

  loading.value = false;
};
</script>

<template>
  <form @submit.prevent="submit" class="flex flex-col gap-4">
    <FormElementsSelect
      label="Reason"
      name="reason"
      :selectOptions="reasonOptions"
      selectClass="p-3 text-lg rounded-md min-w-[255px] z-10 relative text-sm"
      wrapperClass="absolute w-full flex flex-col bg-white rounded-b-md top-10 lg:top-16 max-h-0 overflow-hidden transition-all duration-300 shadow-lg z-10"
      optionClass="p-3 text-sm"
      v-model="form.reason"
    />

    <FormElementsTextarea
      label="Description"
      name="description"
      v-model="form.description"
      :resizable="false"
    />

    <button
      type="submit"
      class="primary-button-sm flex items-center justify-center gap-2 w-fit text-white px-10 py-1 rounded-md"
      :disabled="loading || reported || disabled"
      :class="{ 'opacity-50 pointer-events-none': loading || reported || disabled }"
    >
      <Loader v-if="loading" width="12" height="12" />
      Submit
    </button>

    <div v-if="reported" class="text-red-500 flex items-center gap-1">
        <Icon name="heroicons:exclamation-circle" class="text-lg" />
        <p>You have already reported this {{ props.reportable_type }}.</p>
    </div>
  </form>
</template>
