<template>
  <div class="flex flex-col bg-white p-4 rounded-md animate-pulse">
    <div class="flex gap-4 lg:gap-4 w-full mb-4">
      <Skeleton
        class="w-[100px] h-[100px] bg-[--background-color] rounded-md overflow-hidden"
      />

      <div class="flex flex-col w-full max-w-[450px]">
        <Skeleton class="w-20 h-4 bg-[--background-color] rounded mb-2" />
        <Skeleton class="w-20 h-4 bg-[--background-color] rounded mb-4" />
        <div class="flex gap-2">
            <Skeleton class="w-[40px] h-4 bg-[--background-color] rounded" />
            <Skeleton class="w-[40px] h-4 bg-[--background-color] rounded" />
            <Skeleton class="w-[40px] h-4 bg-[--background-color] rounded" />
        </div>
      </div>

      <div class="flex flex-col items-center gap-1 ml-auto flex-1">
        <Skeleton class="w-20 h-[50px] bg-[--background-color] rounded" />
        <Skeleton class="w-20 h-20 bg-[--background-color] rounded" />
        <Skeleton class="w-20 h-20 bg-[--background-color] rounded" />
      </div>
    </div>

    <div class="flex flex-col justify-center mt-4">
      <Skeleton class="w-full h-14 bg-[--background-color] rounded mb-2" />

      <Skeleton class="w-full h-10 bg-[--background-color] rounded" />
    </div>
  </div>
</template>