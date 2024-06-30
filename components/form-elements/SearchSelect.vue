<script setup lang="ts">
const props = defineProps({
  placeholder: {
    type: String,
  },
  select: {
    type: Object,
    required: true,
  },
  asyncSearch: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default:
      "bg-white cursor-pointer flex gap-2 items-center justify-between w-full border rounded-md p-3 min-h-[46px] sm:min-h-[50px]",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "update:modelValue",
  "updateSearchValue",
  "searchMethod",
]);

const selected: Ref = ref();
const showDropdown: Ref<Boolean> = ref(false);

const search: Ref<String> = debouncedRef("", 300, false);

watch(search, (value: any) => {
  if (props.asyncSearch) {
    emit("searchMethod", value);
  } else {
    props.select = props.select.filter((element: any) =>
      element.label.toLowerCase().includes(value.toLowerCase())
    );
  }
});

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
    <div :class="className">
      <span class="flex gap-2 items-center" v-if="loading">
        <Loader /> Loading...
      </span>

      <div v-else>
        <span v-if="placeholder && (!selected || selected.length == 0)">{{
          placeholder
        }}</span>
  
        <span v-else>
          {{ selected.label }}
        </span>
      </div>

      <font-awesome icon="chevron-down" />
    </div>

    <div
      class="flex flex-col absolute w-full bg-white border-x rounded-t-sm shadow-lg z-10 overflow-hidden"
      :class="showDropdown ? 'max-h-[300px]' : 'max-h-[0]'"
    >
      <input
        type="text"
        name="search"
        placeholder="Search skills by name"
        class="p-3 border-b"
        autocomplete="off"
        v-model="search"
      />

      <div class="flex flex-col overflow-y-scroll" v-if="select.length > 0">
        <label
          :for="option.value"
          v-for="option in select"
          :key="option.value"
          class="p-3 text-sm border-b cursor-pointer hover:bg-gray-100/50 transition-all duration-300"
          :class="{ 'bg-gray-100/50': selected == option.value }"
          @click="showDropdown != showDropdown"
        >
          <span> {{ option.label }} </span>

          <input
            type="radio"
            :name="option.label"
            :id="option.value"
            :value="option"
            v-model="selected"
            :checked="selected == option.value"
            class="hidden"
            @change="showDropdown = false"
          />
        </label>
      </div>

      <div v-else>
        <div class="p-3 text-sm">No results found</div>
      </div>
    </div>
  </div>
</template>