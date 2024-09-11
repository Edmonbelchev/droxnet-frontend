<script setup lang="ts">
const props = defineProps<{
  appliedFilters: {
    countries: string[];
    languages: string[];
    skills: string[];
    type: string[];
    hourly_rate: {
      start: number;
      end: number;
    };
    budget: {
      start: number;
      end: number;
    },
    budget_type: string;
    language: string[];
    duration: string[];
  };
}>();

const emit = defineEmits(["clearAll", "removeFilter"]);

const skillStore = useSkillStore();

const selectedFilters = computed(() => {
  const filters = [];
  for (const [key, value] of Object.entries(props.appliedFilters)) {
    if (Array.isArray(value) && value.length > 0) {
      filters.push(...value.map((v) => ({ key, value: v })));
    } else if (key === "hourly_rate" || key === "budget" && (value.start > 0 || value.end < 100)) {
      filters.push({ key, value: `$${value.start} - $${value.end}` });
    }
  }
  return filters;
});

const filtersApplied = computed(() => selectedFilters.value.length > 0);

const countries = fetchCountries();
const languages = retrieveLanguages();
const skills = ref(skillStore.skills);

const clearAllFilters = () => {
  emit("clearAll");
};

const removeFilter = (filter: { key: string; value: any }) => {
  emit("removeFilter", filter);
};
</script>

<template>
  <div class="flex flex-wrap items-center gap-2 mb-4" v-if="filtersApplied">
    <button
      type="button"
      @click="clearAllFilters"
      class="flex relative items-center h-[32px]"
    >
      <div
        class="h-full flex items-center gap-1 bg-[--primary-color] text-white px-4"
      >
        <Icon name="mdi:close-thick" class="text-xs" />
        <span class="text-xs">Clear All Filters</span>
      </div>

      <div
        class="w-0 h-0 border-l-[15px] border-t-[16px] border-b-[16px] border-t-transparent border-b-transparent border-l-[--primary-color]"
      ></div>
    </button>

    <button
      type="button"
      v-for="filter in selectedFilters"
      :key="`${filter.key}-${filter.value}`"
      class="relative border rounded-[30px] px-4 py-1 flex items-center gap-1 text-xs h-[32px] duration-300 group overflow-hidden hover:pl-6 hover:border-[--primary-color] hover:text-[--primary-color]"
      @click="removeFilter(filter)"
    >
      <Icon name="mdi:close-thick" class="text-xs -left-[100%] absolute duration-300 group-hover:left-2" />
    
      <span v-if="filter.key === 'skills'">
        {{ skills.find((skill) => skill.id === filter.value).name }}
      </span>

      <span v-else-if="filter.key === 'countries'">
        {{ countries.find((country) => country.code === filter.value).name }}
      </span>

      <span v-else-if="filter.key === 'languages'">
        {{ languages.find((language) => language.code === filter.value).name }}
      </span>

      <span v-else-if="filter.key === 'duration'">
        {{ retrieveDurationOptions().find((duration) => duration.value === filter.value).label }}
      </span>

      <span v-else-if="filter.key === 'budget_type'">
        {{ retrieveBudgetTypes().find((budget) => budget.value === filter.value).label }}
      </span>

      <span v-else>{{ filter.value }}</span>
    </button>
  </div>
</template>
