<script setup lang="ts">
const props = defineProps({
  placeholder: {
    type: String,
  },
  selectedOption: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const selected: Ref<String> = ref("");
const showDropdown: Ref<Boolean> = ref(false);

const selectedCountry = computed(() => {
  return countries().find((country) => country.code == props.selectedOption);
});

const countriesList: Ref = ref(countries());

const search = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  countriesList.value = countries().filter((country) =>
    country.name.toLowerCase().includes(value.toLowerCase())
  );
};

watch(
  () => selected.value,
  (value: any) => {
    emit("update:modelValue", value);
  }
);
</script>

<template>
  <div
    class="relative"
    @click="showDropdown = true"
    v-click-outside="() => (showDropdown = false)"
  >
    <div
      class="bg-white cursor-pointer flex gap-2 items-center justify-between w-full border rounded-md p-3 min-h-[46px] sm:min-h-[50px]"
    >
      <span v-if="placeholder && selected.length == 0 && !selectedOption">{{
        placeholder
      }}</span>

      <span v-else>
        {{ selectedCountry?.emoji }} {{ selectedCountry?.name }}
      </span>

      <font-awesome icon="chevron-down" />
    </div>

    <div
      class="flex flex-col absolute w-full bg-white border-x rounded-t-sm shadow-lg z-10 overflow-hidden"
      :class="
        showDropdown
          ? 'max-h-[300px]'
          : 'max-h-[0]'
      "
    >
      <input
        type="text"
        name="search"
        placeholder="Search country by name"
        class="p-3 border-b"
        autocomplete="off"
        @input="search"
      />

      <div class="flex flex-col overflow-y-scroll">
        <label
          :for="country.code"
          v-for="(country, index) in countriesList"
          :key="index"
          class="p-3 text-sm border-b cursor-pointer hover:bg-gray-100/50 transition-all duration-300"
          :class="{ 'bg-gray-100/50': selected == country.code }"
          @click="showDropdown != showDropdown"
        >
          <span> {{ country.emoji }} {{ country.name }} </span>

          <input
            type="radio"
            :name="country.name"
            :id="country.code"
            :value="country.code"
            v-model="selected"
            :checked="selected == country.code"
            class="hidden"
            @change="showDropdown = false"
          />
        </label>
      </div>
    </div>
  </div>
</template>