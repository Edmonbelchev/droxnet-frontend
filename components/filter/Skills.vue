<script setup lang="ts">
const emits = defineEmits(["update:modelValue"]);

const skills = ref();
const search = ref("");
const selectedSkills = ref([]);
const loadingSkills = ref(true);
const disabledSearch = ref(true);

const retrieveSkills = async () => {
  loadingSkills.value = true;

  const response = await fetchSkills(15, 1, search.value);

  if (response.status.value === "success") {
    skills.value = response.data.value.data;
  }

  loadingSkills.value = false;
};

watch(selectedSkills, () => {
  emits("update:modelValue", selectedSkills.value);
});

const submit = () => {
  disabledSearch.value = true;

  retrieveSkills();
};

watch(() => search.value, (newValue: String, oldValue: String) => {
  if (newValue === "" && oldValue === "") {
    disabledSearch.value = true;
  } else {
    disabledSearch.value = false;
  }
}, { deep: true })

onMounted(() => {
  retrieveSkills();
});
</script>

<template>
  <div class="p-6 flex flex-col bg-white rounded-md">
    <h2 class="text-lg text-[--text-color] pb-3 mb-6 border-b">Categories</h2>

    <div class="flex">
      <input
        type="text"
        class="border-y border-l rounded-l p-3 w-full flex-1"
        placeholder="Search Category"
        v-model="search"
      />

      <button
        type="button"
        class="p-2 border-[--primary-color] rounded-r w-[50px] flex items-center justify-center bg-[--primary-color]"
        :class="
          loadingSkills || disabledSearch
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer'
        "
        @click="submit"
        :disabled="disabledSearch"
      >
        <Icon name="simple-line-icons:magnifier" class="text-sm text-white" />
      </button>
    </div>

    <div
        class="flex gap-2 mt-4 items-center bg-white/90"
        v-if="loadingSkills"
      >
        <Loader width="20" height="20" />
        Loading...
    </div>

    <div
      class="relative flex flex-col gap-3 mt-4 max-h-[160px] overflow-y-auto"
      v-if="!loadingSkills"
    >
      <div
        v-for="skill in skills"
        :key="skill.id"
        class="flex items-center"
      >
        <FormElementsCheckbox
          :id="skill.id"
          :label="skill.name"
          :value="skill.id"
          v-model="selectedSkills"
        >
          <template #content>
            <span class="text-[--gray-color]">{{ skill.name }}</span>
          </template>
        </FormElementsCheckbox>
      </div>
    </div>
  </div>
</template>
