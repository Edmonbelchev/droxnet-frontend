<template>
  <div class="bg-[--background-color] p-4 lg:p-20">
    <div class="max-w-[730px] w-full mx-auto flex flex-col gap-8">
      <div
        class="p-4 md:p-8 rounded-lg flex bg-white justify-between items-center gap-4">
        <div class="flex flex-col w-full">
          <Skeleton
            className="animate-pulse w-full h-[50px] rounded-md block mb-4"
          />

          <div class="flex flex-col md:flex-row md:gap-4">
            <Skeleton
              className="animate-pulse w-1/3 lg:w-1/6 h-[20px] rounded-md block"
              v-for="n in 4"
              :key="n"
              :class="{ 'mb-2 lg:mb-0': n !== 4 }"
            />
          </div>
        </div>
      </div>

      <div class="p-4 md:p-8 rounded-lg flex flex-col bg-white gap-4"
      >
        <Skeleton
          className="animate-pulse w-full h-[300px] rounded-md block"
        />

        <Skeleton
          className="animate-pulse w-full h-[100px] rounded-md block"
        />

        <Skeleton
          className="animate-pulse w-full h-[100px] rounded-md block"
        />

        <Skeleton
          className="animate-pulse w-full h-[40px] rounded-md block"
        />
      </div>
    </div>
  </div>
</template>  