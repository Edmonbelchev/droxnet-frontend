<script setup lang="ts">
const getRandomIntInclusive = (min: number, max: number) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  console.log(Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled))
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
</script>

<template>
  <div class="px-4 py-4 flex flex-col animate-[fadeIn_300ms_ease-in_forwards]">
    <div class="flex flex-col min-h-[450px] max-h-[500px] overflow-y-auto gap-4 pb-4">
      <div
        class="flex items-center gap-4"
        v-for="n in 5"
        :key="n"
        :class="[n % 2 === 0 ? 'ml-auto flex-row-reverse' : 'mr-auto']"
      >
        <Skeleton
          className="w-[50px] h-[50px] rounded-full"
        />
          <div class="flex flex-col gap-2" v-if="n == 3">
            <Skeleton
              :className="`h-[60px] rounded-md w-[250px]`"
            />
            <Skeleton
              :className="`h-[20px] rounded-md w-[250px]`"
            />
          </div>

          <div class="flex flex-col gap-2" v-else-if="n == 4">
            <Skeleton
              :className="`h-[20px] rounded-md w-[250px]`"
            />
            <Skeleton
              :className="`h-[20px] rounded-md w-[300px]`"
            />
          </div>

          <div class="flex flex-col gap-2" v-else>
            <Skeleton
              :className="`h-[20px] rounded-md w-[250px]`"
            />
            <Skeleton
              :className="`h-[15px] rounded-md w-[200px]`"
            />
            <Skeleton
              :className="`h-[20px] rounded-md w-[300px]`"
            />
          </div>
      </div>
    </div>

    <div class="flex flex-col mt-auto">
      <FormElementsTextarea
        inputClass="px-4 py-2 min-h-[200px] rounded-t border focus:border-[--primary-color] focus-visible:outline-none transition-all duration-300 w-full pointer-events-none opacity-50"
        placeholder="Type your message here..."
        :resizable="false"
      />
      <div class="border-x border-b class flex justify-end p-2 opacity-50 pointer-events-none">
        <button type="button" class="primary-button-sm w-fit ml-auto flex items-center gap-2">
          <Loader width="12" />
          Loading...
        </button>
      </div>
    </div>
  </div>
</template>
