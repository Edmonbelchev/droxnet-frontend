<script setup lang="ts">
const emit = defineEmits(["updateForm"]);

const skillStore = useSkillStore();

const skills: Ref<any> = ref([]);
const selectedSkill: Ref<any> = ref([]);
const skillRate: Ref<Number | String | null> = ref(null);
const userSkills: Ref<Object> = ref([{}]);
const openedSkill: Ref<any> = ref({ id: null });
const openedSkillRate: Ref<Number | null> = ref(null);
// Define loaders
const loadingSkills = ref(true);
const loadingSearch = ref(false);

const retrieveSkills = async ($event: any = "") => {
  loadingSearch.value = true;

  const excludedSkills = userSkills.value.map((skill: any) => skill.id);

  const response: any = await fetchSkills(25, 1, $event, excludedSkills);

  if (response.status.value === "success") {
    skills.value = response.data.value.data.map((skill: any) => {
      return {
        value: skill.id,
        label: skill.name,
      };
    });
  }

  // Update the skill store
  skillStore.storeValues(skills.value);

  loadingSearch.value = false;
};

const retrieveUserSkills = async () => {
  const response: any = await fetchUserSkills();

  if (response.status.value === "success") {
    userSkills.value = response.data.value.data.map((skill: any) => {
      return {
        name: skill.name,
        id: skill.id,
        rate: skill.rate,
      };
    });

    // Update the skill store
    skillStore.storeValues(userSkills.value, true);

    emit("updateForm", userSkills.value);

    return userSkills.value;
  }
};

const addSkill = () => {
  if (
    selectedSkill.value.length != 0 &&
    skillRate.value != null &&
    skillRate.value != ""
  ) {
    const formatObject: any = {
      name: selectedSkill.value.label,
      id: selectedSkill.value.value,
      rate: skillRate.value,
    };

    userSkills.value.push(formatObject);

    // Update the skill store
    skillStore.storeValues(userSkills.value, true);

    emit("updateForm", userSkills.value);

    // Remove the element from skills
    skills.value = skills.value.filter(
      (skill: any) => skill.value !== selectedSkill.value.value
    );

    selectedSkill.value.length = 0;
    skillRate.value = null;
  }

  return;
};

const openSkill = (id: number) => {
  openedSkill.value.id = id;
  openedSkillRate.value = userSkills.value.find(
    (skill: any) => skill.id === id
  ).rate;
};

const deleteSkill = (id: number) => {
  // Return to skills
  skills.value.push({
    value: id,
    label: userSkills.value.find((skill: any) => skill.id === id).name,
  });

  // Remove the element from userSkills
  userSkills.value = userSkills.value.filter((skill: any) => skill.id !== id);

  // Update the skill store
  skillStore.storeValues(userSkills.value, true);

  emit("updateForm", userSkills.value);
};

const saveSkill = (id: number) => {
  const skill = userSkills.value.find((skill: any) => skill.id === id);

  if (skill) {
    skill.rate = openedSkillRate.value;
  }

  openedSkill.value.id = null;
};

onMounted(async () => {
  if (skillStore.userSkills.length > 0) {
    userSkills.value = skillStore.userSkills;

    emit("updateForm", skillStore.userSkills);
  } else {
    await retrieveUserSkills();
  }

  if (skillStore.skills.length > 0) {
    skills.value = skillStore.skills;
  } else {
    await retrieveSkills();
  }

  loadingSkills.value = false;
});
</script>

<template>
  <h4
    class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-4 border-l-4 border-[--primary-color] text-base"
  >
    My Skills
  </h4>

  <div v-if="!loadingSkills">
    <div class="flex flex-col gap-2 mb-4 md:px-6 md:flex-row">
      <div class="flex flex-col md:flex-row gap-2 md:gap-0 flex-1">
        <div class="flex-1">
          <FormElementsSearchSelect
            v-model="selectedSkill"
            placeholder="Select a skill"
            :select="skills"
            asyncSearch="true"
            :loading="loadingSearch"
            @searchMethod="retrieveSkills($event)"
            className="bg-white cursor-pointer min-h-[46px] sm:min-h-[50px] flex gap-2 items-center justify-between w-full border md:border-r-0 rounded-md md:rounded-r-none p-3"
          />
        </div>
        <div class="flex-1">
          <FormElementsInput
            v-model="skillRate"
            type="number"
            placeholder="Rate Your Skill (0% to 100)"
            name="skill_rate"
            inputClass="px-4 py-2 min-h-[49px] sm:min-h-[50px] border rounded-md md:rounded-l-none focus:border-[--primary-color] transition-all duration-300 w-full"
          />
        </div>
      </div>

      <button
        type="button"
        class="primary-button max-h-[50px]"
        :class="{
          'cursor-not-allowed opacity-50':
            skillRate == null || skillRate == 0 || selectedSkill.length == 0,
        }"
        @click="addSkill()"
      >
        Add skills
      </button>
    </div>

    <div
      class="flex flex-col md:px-6 mb-6"
      v-if="userSkills && userSkills.length > 0"
    >
      <div
        class="bg-[#fcfcfc] p-3 md:px-6 border-x border-t flex justify-between items-center relative"
        :class="{
          'border-b': index == userSkills.length - 1,
          'bg-white': openedSkill.id == skill.id,
        }"
        v-for="(skill, index) in userSkills"
        :key="index"
      >
        <div v-if="openedSkill.id != skill.id">
          {{ skill.name }} ({{ skill.rate }}%)
        </div>

        <input
          class="flex-1 absolute top-0 left-0 w-full h-full z-0 pl-6 pr-[100px]"
          type="number"
          v-model="openedSkillRate"
          v-else
        />

        <div class="flex gap-2" v-if="openedSkill.id != skill.id">
          <button
            type="button"
            class="text-[--text-color] bg-[--light-blue] w-8 h-8 text-white rounded-[3px] text-xs hover:bg-[--primary-color] duration-300"
            @click="openSkill(skill.id)"
          >
            <Icon name="fa-solid:pen" />
          </button>
          <button
            type="button"
            class="text-white w-8 h-8 rounded-[3px] bg-[--primary-color] hover:bg-orange-600 duration-300"
            @click="deleteSkill(skill.id)"
          >
            <Icon name="fa-solid:trash" />
          </button>
        </div>

        <div class="flex gap-2 relative z-1 ml-auto" v-else>
          <button
            type="button"
            class="text-white rounded-[3px] w-8 h-8 bg-[--green-color] text-base hover:bg-[--primary-color] duration-300"
            @click="saveSkill(skill.id)"
          >
            <Icon name="fa6-solid:check" />
          </button>
          <button
            type="button"
            class="text-white rounded-[3px] w-8 h-8 bg-gray-300 text-xs hover:bg-gray-500 duration-300"
            @click="openedSkill.id = null"
          >
            <Icon name="icomoon-free:cross" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else>Loading...</div>
</template>