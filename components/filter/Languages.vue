<script setup lang="ts">
defineProps({
  form: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue"]);

const languageOptions: Ref<Array<Object>> = ref(retrieveLanguages());

const search = ref("");
const disabledSearch = ref(true);

const submit = () => {
  disabledSearch.value = true;

  const response = retrieveLanguages();

  languageOptions.value = response.filter((language: any) =>
    language.name.toLowerCase().includes(search.value.toLowerCase())
  );
};

watch(
  () => search.value,
  (newValue: String, oldValue: String) => {
    if (newValue === "" && oldValue === "") {
      disabledSearch.value = true;
    } else {
      disabledSearch.value = false;
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="p-6 flex flex-col bg-white rounded-md">
    <h2 class="text-lg text-[--text-color] pb-3 mb-6 border-b">Languages</h2>

    <div class="flex flex-col gap-3">
      <div class="flex">
        <input
          type="text"
          class="border-y border-l rounded-l p-3 w-full flex-1"
          placeholder="Search Location"
          v-model="search"
        />

        <button
          type="button"
          class="p-2 border-[--primary-color] rounded-r w-[50px] flex items-center justify-center bg-[--primary-color]"
          :class="{
            'cursor-not-allowed opacity-50': disabledSearch,
          }"
          @click="submit"
          :disabled="disabledSearch"
        >
          <Icon name="simple-line-icons:magnifier" class="text-sm text-white" />
        </button>
      </div>

      <div class="flex flex-col gap-3 mt-4 max-h-[160px] overflow-y-auto">
        <FormElementsCheckbox
          v-model="form.languages"
          name="language"
          :options="languageOptions"
          :label="language.name"
          :value="language.code"
          v-for="(language, index) in languageOptions"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>