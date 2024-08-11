<script setup lang="ts">
const props: any = defineProps({
  addedSkills: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["updateForm"]);

const skills: Ref<any> = ref([]);
const selectedSkills: Ref<any> = ref([]);
const addedSkills: Ref<any> = ref([]);
const selectedSkillsKey: Ref<number> = ref(0);

// Define loaders
const loadingSkills = ref(true);
const loadingSearch = ref(false);

const retrieveSkills = async ($event: any = "") => {
  loadingSearch.value = true;

  const response: any = await fetchSkills(25, 1, $event, props?.addedSkills);

  if (response.status.value === "success") {
    skills.value = response.data.value.data.map((skill: any) => {
      return {
        value: skill.id,
        label: skill.name,
      };
    });
  }

  loadingSearch.value = false;
};

const addSkill = () => {
  if (selectedSkills.value.length != 0) {
    addedSkills.value = selectedSkills.value.map((skill: any) => {
      return skill.value;
    });

    skills.value = skills.value.filter(
      (skill: any) =>
        !addedSkills.value.includes(skill.value) &&
        !props.addedSkills.includes(skill.value)
    );

    emit("updateForm", addedSkills.value);
  }

  return;
};

const removeSkill = (skill: any) => {
  addedSkills.value = addedSkills.value.filter(
    (addedSkill: any) => addedSkill !== skill
  );

  emit("updateForm", addedSkills.value);

  selectedSkills.value.splice(
    selectedSkills.value.findIndex(
      (selectedSkill: any) => selectedSkill.value === skill
    ),
    1
  );

  selectedSkillsKey.value += 1;
};

onMounted(async () => {
  await retrieveSkills();
  loadingSkills.value = false;
});
</script>

<template>
  <h4
    class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-4 border-l-4 border-[--primary-color] text-base"
  >
    Skills Required
  </h4>

  <div v-if="!loadingSkills">
    <div class="flex flex-col gap-2 mb-4 md:px-6 md:flex-row">
      <div class="flex flex-col md:flex-row gap-2 md:gap-0 md:w-3/4">
        <FormElementsMultiSelect
          v-model="selectedSkills"
          placeholder="Select a skill"
          :options="skills"
          asyncSearch="true"
          :loading="loadingSearch"
          @searchMethod="retrieveSkills($event)"
          className="bg-white cursor-pointer min-h-[46px] sm:min-h-[50px] flex gap-2 items-center justify-between w-full border rounded-md p-3 sm:max-w-[425px]"
        />
      </div>

      <button
        type="button"
        class="primary-button max-h-[50px] min-w-[200px] md:w-1/3"
        :class="{
          'cursor-not-allowed opacity-50': selectedSkills.length == 0,
        }"
        @click="addSkill()"
      >
        Add skills
      </button>
    </div>
  </div>

  <div v-else>Loading...</div>

  <div class="flex flex-col">
    <div
      v-for="(skill, index) in addedSkills"
      :key="index"
      class="bg-[#fcfcfc] p-3 md:px-6 border-x border-t flex justify-between items-center relative"
      :class="{
        'border-b': index == addedSkills.length - 1,
      }"
    >
      <span
        v-if="
          selectedSkills.find((selectedSkill) => selectedSkill.value === skill)
        "
      >
        {{
          selectedSkills.find((selectedSkill) => selectedSkill.value === skill)
            .label
        }}
      </span>

      <button
        @click="removeSkill(skill)"
        type="button"
        class="text-white w-8 h-8 rounded-[3px] bg-[--primary-color] hover:bg-orange-600 duration-300"
      >
        <Icon name="fa-solid:trash" />
      </button>
    </div>
  </div>
</template>