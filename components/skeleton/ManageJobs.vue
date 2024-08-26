<template>
  <div
    class="flex flex-col order-2 md:order-1 w-full md:w-[1014px] shadow-lg bg-white rounded-md"
  >
    <div class="flex flex-col rounded-md w-full">
      <h2 class="border-b p-4 md:p-6 text-[--text-color] text-base md:text-lg">
        Manage Jobs
      </h2>

      <div class="flex flex-col p-4 md:p-6 gap-2">
        <h4
          class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-4 border-l-4 border-[--primary-color] text-base"
        >
          Posted Jobs
        </h4>

        <div class="flex flex-col gap-4 px-4 mb-4 relative">
          <div
            v-for="index in 8"
            :key="index"
            class="w-full h-34 bg-gray-200 p-6 rounded mb-2 animate-pulse flex gap-4"
          >
            <div class="flex flex-col w-3/4 gap-4">
              <Skeleton class="h-4 rounded" />
              <Skeleton class="h-8 rounded mb-8" />

              <Skeleton class="h-8 w-28 rounded ml-auto" />
            </div>

            <div class="flex flex-col w-1/4 gap-4">
              <Skeleton class="h-4 rounded" />
              <Skeleton class="h-4 rounded" />
              <Skeleton class="h-8 rounded mt-auto" />
            </div>
          </div>

          <div class="flex justify-center">
            <Pagination
              :page="1"
              :perPage="15"
              :total="0"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full order-1 md:order-2 md:w-[275px] flex flex-col gap-4">
    <div class="flex bg-white shadow rounded-md p-6">
      <div class="flex h-[100px] gap-2 w-full">
        <Skeleton class="w-24 h-full rounded" />

        <div class="flex flex-col justify-center w-full gap-2">
          <Skeleton class="w-20 h-8 rounded" />
          <Skeleton class="w-20 h-4 rounded" />
        </div>
      </div>
    </div>

    <div class="flex bg-white shadow rounded-md p-6">
      <div class="flex h-[100px] gap-2 w-full">
        <Skeleton class="w-24 h-full rounded" />

        <div class="flex flex-col justify-center w-full gap-2">
          <Skeleton class="w-20 h-8 rounded" />
          <Skeleton class="w-20 h-4 rounded" />
        </div>
      </div>
    </div>

    <div class="flex bg-white shadow rounded-md p-6">
      <div class="flex h-[100px] gap-2 w-full">
        <Skeleton class="w-24 h-full rounded" />

        <div class="flex flex-col justify-center w-full gap-2">
          <Skeleton class="w-20 h-8 rounded" />
          <Skeleton class="w-20 h-4 rounded" />
        </div>
      </div>
    </div>
  </div>
</template>