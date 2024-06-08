<script setup lang="ts">
const props: any = defineProps({
  user: {
    type: Object,
    required: true,
  },
  form: {
    type: Array,
    required: true,
  },
  v$: {
    type: Object,
    required: true,
  },
  loaded: {
    type: Boolean,
    required: true,
  },
  submitting: {
    type: Boolean,
  },
});

const emit = defineEmits(["update", "loaded"]);
const projectStore = useProjectStore();

const retrieveUserProjects = async () => {
  //   Fetch user projects
  const response = await fetchUserProjects(props.user.id);
  if (response.status.value === "success") {
    const result = response.data.value.data.map((project: any) => {
      return {
        id: project.id,
        title: project.title,
        url: project.url,
        files: project.files.map((file: any) => {
          return file.url;
        }),
        opened: false,
      };
    });

    // Update the project store
    projectStore.storeValues(result);

    emit("update", result);

    setTimeout(() => {
      emit("loaded", true);
    }, 100);
  }
};

const addProject = () => {
  props.form.push({
    id: null,
    title: "",
    url: "",
    files: [],
    opened: false,
  });

  // Update the project store
  projectStore.storeValues(props.form);
};

const removeProject = (index: Number) => {
  // Remove the object from the array
  props.form.splice(index, 1);

  // Update the project store
  projectStore.storeValues(props.form);
};

const itemMainImage = (files: Array<String | File>) => {
  // Placeholder image URL
  const placeholderImage = "/images/image-placeholder.webp";

  // List of common image MIME types
  const imageMimeTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
  // List of common image extensions
  const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"];

  // Iterate over the files array
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // If the element is a File instance
    if (file instanceof File && imageMimeTypes.includes(file.type)) {
      const blob = new Blob([file], { type: file.type });
      return URL.createObjectURL(blob);
    }
    // If the element is a string and ends with a valid image extension
    else if (
      typeof file === "string" &&
      imageExtensions.some((extension) => file.endsWith(extension))
    ) {
      return file;
    }
  }

  // If no valid image is found, return the placeholder image
  return placeholderImage;
};

onMounted(async () => {
  // If project store have value, load the data from it
  if (projectStore.projects.length > 0) {
    emit("update", projectStore.projects);
    emit("loaded", true);
  } else {
    await retrieveUserProjects();
  }

  emit("loaded", true);
});
</script>

<template>
  <div class="mb-2" v-if="loaded">
    <div
      class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-4 border-l-4 border-[--primary-color] text-base flex justify-between"
    >
      <div class="flex items-center">
        <div class="flex items-center gap-2" v-if="submitting">
          <Loader width="16" />
          <h4>Submitting...</h4>
        </div>

        <h4 v-else>Add Your Projects</h4>
      </div>

      <button
        type="button"
        class="text-blue-400 text-sm font-medium"
        @click="addProject()"
        v-if="!submitting"
      >
        Add new
      </button>
    </div>

    <div class="px-4" v-for="(item, index) in form" :key="index">
      <div
        class="py-4 px-6 border-x border-t rounded-sm flex justify-between items-center rounded-t-sm"
        :class="{
          'border-red-500': !item.opened && v$[index].$error,
          'rounded-t-md': index === 0,
          'rounded-b-md border-b': index === form.length - 1 && !item.opened,
          'border-b': item.opened,
        }"
      >
        <div
          class="flex gap-1 text-[--text-color] items-center"
          v-if="item.title"
        >
          <img
            :src="itemMainImage(item.files)"
            class="w-14 h-14 object-cover rounded-md mr-2 image-preview"
          />

          {{ item.title }}
        </div>

        <div v-else>
          <p class="text-[--gray-color]">No project added yet</p>
        </div>

        <div class="flex gap-2">
          <button
            type="button"
            class="text-[--text-color] flex items-center justify-center bg-[--light-blue] w-8 h-8 text-white rounded-[3px] text-xs hover:bg-[--primary-color] duration-300"
            @click="item.opened = !item.opened"
          >
            <Icon name="fa-solid:pen" />
          </button>

          <button
            type="button"
            class="text-white flex items-center justify-center w-8 h-8 rounded-[3px] bg-[--primary-color] hover:bg-orange-600 duration-300"
            @click="removeProject(index)"
          >
            <Icon name="fa-solid:trash" />
          </button>
        </div>
      </div>

      <div
        class="overflow-hidden transition-all duration-300"
        :class="item.opened ? 'max-h-[999px]' : 'max-h-0'"
      >
        <div
          class="flex flex-col gap-2 p-6 bg-[--background-color] overflow-hidden"
          :class="{ 'rounded-b-md': index === form.length - 1 }"
        >
          <div class="flex gap-2">
            <FormElementsInput
              v-model="item.title"
              type="text"
              placeholder="Project Title"
              :error="v$[index].title.$error"
              :valid="!v$[index].title.$invalid"
              :errorMessages="v$[index].title.$errors"
              @touch="v$[index].title.$touch"
            />

            <FormElementsInput
              v-model="item.url"
              type="text"
              placeholder="Project Url"
              name="url"
              :error="v$[index].url.$error"
              :valid="!v$[index].url.$invalid && item.url.length > 0"
              :errorMessages="v$[index].url.$errors"
              @touch="v$[index].url.$touch"
            />
          </div>

          <div class="flex flex-col">
            <FormElementsMultipleFileUpload
              v-model="item.files"
              :previewFiles="item.files"
              name="files[]"
              id="files"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-col mb-2" v-else>
    <Skeleton className="h-12 mb-4" />

    <div class="px-4 mb-4 flex flex-col gap-3">
      <Skeleton className="h-16" v-for="index in 3" :key="index" />
    </div>
  </div>
</template>