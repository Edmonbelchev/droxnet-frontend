<template>
  <div class="relative z-0">
    <div
      class="absolute w-full h-full min-h-[250px] md:min-h-[400px] object-cover bg-gray-200"
    ></div>
  </div>

  <div class="relative z-1 flex justify-center pt-40 md:pt-20 px-4 mb-10">
    <div
      class="flex flex-col items-center max-w-[510px] md:items-start md:max-w-[1110px] bg-white rounded-lg p-6 md:p-4 lg:p-6 md:flex-row md:justify-between w-full gap-4 md:gap-10"
    >
      <div class="flex flex-col h-[400px]">
        <Skeleton
          className="animate-pulse w-[255px] h-[255px] rounded-md block mb-4"
        />

        <div class="flex flex-col">
          <Skeleton
            className="animate-pulse w-full h-[30px] rounded-md block mb-4"
          />
          <Skeleton
            className="animate-pulse w-full h-[30px] rounded-md block"
          />
        </div>
      </div>

      <div class="flex flex-col w-full">
        <Skeleton
          className="animate-pulse w-full h-[70px] rounded-md block mb-4"
        />
        <Skeleton
          className="w-full h-[15px] md:h-[30px] rounded-md block mb-4"
          v-for="index in 5"
          :key="index"
        />
      </div>

      <Skeleton
        className="animate-pulse w-[255px] h-[200px] md:h-[400px] rounded-md block mb-4"
      />
    </div>
  </div>

  <div class="px-4 py-8">
    <div
      class="flex flex-col lg:flex-row justify-between max-w-[1110px] gap-8 w-full mx-auto"
    >
      <div class="lg:max-w-[730px] flex flex-col gap-6">
        <div class="bg-white rounded-md p-6">
          <Skeleton className="animate-pulse w-full h-[30px] mb-6 rounded-md" />

          <div class="flex flex-wrap text-center gap-4">
            <Skeleton
              className="animate-pulse w-full h-[200px] sm:w-[200px] sm:h-[200px] rounded-md block"
            />
            <Skeleton
              className="animate-pulse w-full h-[200px] sm:w-[200px] sm:h-[200px] rounded-md block"
            />
            <Skeleton
              className="animate-pulse w-full h-[200px] sm:w-[200px] sm:h-[200px] rounded-md block"
            />
          </div>
        </div>

        <div class="bg-white rounded-md p-6">
          <Skeleton className="animate-pulse w-full h-[30px] mb-6 rounded-md" />

          <div class="flex flex-col gap-6">
            <Skeleton
              className="animate-pulse w-full h-[100px] rounded-md block"
            />
            <Skeleton
              className="animate-pulse w-full h-[100px] rounded-md block"
            />
            <Skeleton
              className="animate-pulse w-full h-[100px] rounded-md block"
            />
          </div>
        </div>

        <div class="bg-white rounded-md p-6">
          <Skeleton className="animate-pulse w-full h-[30px] mb-6 rounded-md" />

          <div class="flex flex-col gap-6">
            <Skeleton
              className="animate-pulse w-full h-[100px] rounded-md block"
            />
            <Skeleton
              className="animate-pulse w-full h-[100px] rounded-md block"
            />
            <Skeleton
              className="animate-pulse w-full h-[100px] rounded-md block"
            />
          </div>
        </div>
      </div>

      <div class="max-w-[580px] lg:max-w-[350px] w-full">
        <div class="flex flex-col bg-white p-6 rounded-md">
          <Skeleton className="animate-pulse w-full h-[30px] mb-6 rounded-md" />

          <div class="flex flex-col gap-6">
            <Skeleton
              className="animate-pulse w-full h-[100px] rounded-md block"
            />
            <Skeleton
              className="animate-pulse w-full h-[100px] rounded-md block"
            />
            <Skeleton
              className="animate-pulse w-full h-[100px] rounded-md block"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>