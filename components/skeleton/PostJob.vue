<template>
  <div
    class="bg-[--background-color] py-8 px-4 md:py-10 md:px-16 md:min-h-[1200px]"
  >
    <div
      class="flex flex-col max-w-[730px] mx-auto shadow-lg bg-white rounded-md mb-4"
    >
      <div class="flex flex-col rounded-md w-full">
        <h2
          class="border-b p-4 md:p-6 text-[--text-color] text-base md:text-lg"
        >
          Post a job
        </h2>
      </div>

      <div class="flex flex-col p-4 md:p-6 gap-2">
        <h4
          class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-4 border-l-4 border-[--primary-color] text-base"
        >
          Job Details
        </h4>
        <div class="px-4 flex flex-col gap-2 mb-4">
          <Skeleton class="w-24 h-[50px] rounded" />

          <div
            class="relative flex flex-col sm:flex-row gap-2"
            v-for="n in 4"
            :key="n"
          >
            <Skeleton class="w-1/2 h-[50px] rounded" />
            <Skeleton class="w-1/2 h-[50px] rounded" />
          </div>
        </div>

        <h4
          class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-4 border-l-4 border-[--primary-color] text-base"
        >
          Skills Required
        </h4>

        <div class="flex flex-col gap-2 mb-4 md:px-6 md:flex-row">
            <Skeleton class="w-full h-[50px] rounded md:w-3/4" />
            <Skeleton class="w-full h-[50px] rounded md:w-1/3" />
        </div>

        <div class="flex flex-col mb-4">
            <div
                v-for="n in 4"
                :key="n"
                class="bg-[#fcfcfc] p-3 md:px-6 border-x border-t flex justify-between items-center relative"
                :class="{ 'border-b': n == 4 }"
            >
                <Skeleton class="w-1/2 h-[50px] rounded" />
            </div>
        </div>

        <h4
          class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-4 border-l-4 border-[--primary-color] text-base"
        >
          Job Description
        </h4>

        <div class="px-4 flex flex-col gap-2 mb-4">
          <Skeleton class="w-24 h-[90px] rounded" />
        </div>

        <div
          class="flex justify-between bg-[--background-color] text-[--text-color] border-l-4 border-[--primary-color] py-3 px-4 my-4"
        >
          <h4 class="text-base">Attachments</h4>
        </div>

        <Skeleton class="w-24 h-[90px] rounded" />
      </div>
    </div>
  </div>
</template>