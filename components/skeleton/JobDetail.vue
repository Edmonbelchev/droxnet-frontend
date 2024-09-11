<template>
  <div class="bg-[--background-color] p-4 lg:p-20">
    <div class="max-w-[1100px] w-full mx-auto flex flex-col gap-4 lg:gap-8">
      <div class="flex-col lg:flex-row rounded-lg flex bg-white justify-between gap-4 p-6 md:p-8">
        <div class="flex flex-col w-full lg:w-3/4">
          <Skeleton
            className="animate-pulse w-full h-[50px] rounded-md block mb-4"
          />

          <div class="flex flex-col md:flex-row md:gap-4">
            <Skeleton
              className="animate-pulse w-1/3 lg:w-1/6 h-[20px] rounded-md block"
              v-for="n in 4"
              :key="n"
              :class="{ 'mb-2 lg:mb-0' : n !== 4 }"
            />
          </div>
        </div>

        <Skeleton
          className="animate-pulse w-full lg:w-1/4 h-[50px] rounded-md block"
        />
      </div>

      <div class="flex flex-col md:flex-row gap-4 lg:gap-8">
        <div class="w-full md:w-4/5 bg-white p-6 lg:p-8 rounded-md">
          <Skeleton
            className="animate-pulse w-full h-[50px] rounded-md block mb-4"
          />

          <Skeleton
            className="animate-pulse w-full h-[300px] rounded-md block mb-8"
          />

          <Skeleton
            className="animate-pulse w-full h-[50px] rounded-md block mb-4"
          />

          <div class="flex flex-wrap gap-4 mb-8">
            <Skeleton
              className="animate-pulse w-[150px] h-[35px] rounded-full block"
              v-for="n in 7"
              :key="n"
            />
          </div>

          <Skeleton
            className="animate-pulse w-full h-[50px] rounded-md block mb-4"
          />

          <Skeleton
            className="animate-pulse w-full h-[150px] rounded-md block"
          />
        </div>

        <div class="w-full md:w-2/5 flex flex-col gap-4 lg:gap-8">
          <div class="bg-white rounded-md p-6 lg:p-8">
            <Skeleton
              className="animate-pulse w-full h-[200px] rounded-md block"
            />
          </div>

          <div class="bg-white rounded-md p-6 lg:p-8">
            <Skeleton
              className="animate-pulse w-full h-[200px] rounded-md block"
            />
          </div>

          <div class="bg-white rounded-md p-6 lg:p-8">
            <Skeleton
              className="animate-pulse w-full h-[200px] rounded-md block"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
