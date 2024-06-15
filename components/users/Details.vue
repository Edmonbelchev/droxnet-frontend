<script setup lang="ts">
import { defineProps, ref } from 'vue';

const showMoreDescription = ref(false);
const toggleDescription = () => {
    showMoreDescription.value = !showMoreDescription.value;
};

defineProps({
    user: {
        type: Object,
        required: true
    },

});
</script>

<template>
    <div class="relative -z-[10]">
        <img class="absolute" src="http://amentotech.com/htmls/worktern/images/bannerimg/img-03.jpg" alt="">
    </div>
    <div class="flex justify-center z-1 bg-gray-800 bg-opacity-40 py-20 px-4">

        <div class="lg:flex lg:justify-center max-w-[1240px] bg-white rounded-lg">
            <div class="w-full flex flex-col items-center w-[28%] py-[30px] sm:w-full">
                <div class="mb-6">
                    <div class="relative">
                        <div
                            class="rounded-[50%] absolute -top-[6px] -right-[6px] bg-[#57E50C] w-[20px] h-[20px] border-[3px] border-white">
                        </div>
                    </div>

                    <img class="w-[280px] rounded-md" :src="user.avatar" alt="User Avatar" />
                </div>
                <div class="leading-7 text-center">
                    <h2 class="text-[18px] text-black mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                            <path fill="#00cc8d" fill-rule="evenodd"
                                d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z"
                                clip-rule="evenodd" />
                        </svg>
                        {{ user.name }}
                    </h2>
                    <span>
                        {{ user.feedback }}
                        <a href="#" style="color: #55acee;">(860 Feedback)</a>
                    </span>
                    <p>{{ user.since }}</p>
                    <a href="#" style="color: #55acee;">{{ user.mail }}</a>
                    <p class="text-red-400"><a href="#">
                            {{ user.report }}
                        </a></p>
                </div>
            </div>
            <!-- div 2  -->
            <div class="w-full sm:w-full sm:text-center lg:text-start w-[50%] md:px-[100px] px-[30px] py-[30px] lg:px-[30px] lg:py-[30px]">
                <p class="text-lg text-center lg:text-start sm:text-2xl md:text-2xl font-bold text-black">{{ user.informations.title }}</p>
                <div class="grid justify-center sm:justify-center lg:justify-start sm:flex gap-2 py-3 text-[16px] lg:text-[13px]">

                    <span class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36">
                            <path fill="currentColor"
                                d="M32 8H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2m0 6a4.25 4.25 0 0 1-3.9-4H32Zm0 1.62v4.83A5.87 5.87 0 0 0 26.49 26h-17A5.87 5.87 0 0 0 4 20.44V15.6A5.87 5.87 0 0 0 9.51 10h17A5.87 5.87 0 0 0 32 15.6ZM7.9 10A4.25 4.25 0 0 1 4 14v-4ZM4 22.06A4.25 4.25 0 0 1 7.9 26H4ZM28.1 26a4.25 4.25 0 0 1 3.9-3.94V26Z"
                                class="clr-i-outline clr-i-outline-path-1" />
                            <path fill="currentColor"
                                d="M18 10.85c-3.47 0-6.3 3.21-6.3 7.15s2.83 7.15 6.3 7.15s6.3-3.21 6.3-7.15s-2.83-7.15-6.3-7.15m0 12.69c-2.59 0-4.7-2.49-4.7-5.55s2.11-5.55 4.7-5.55s4.7 2.49 4.7 5.55s-2.11 5.56-4.7 5.56Z"
                                class="clr-i-outline clr-i-outline-path-2" />
                            <path fill="none" d="M0 0h36v36H0z" />
                        </svg>
                        {{ user.informations.perHour }}</span>
                    <span class="flex items-center border-r-[1px] border-l-[1px] sm:px-[15px] gap-2">
                        <div>
                            <img src="http://amentotech.com/htmls/worktern/images/flag/img-02.png" alt="">
                        </div>
                        {{ user.informations.country }}
                    </span>
                    <span class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128">
                            <path fill="#db0a28"
                                d="M64.8 120.71c3.68 0 32.11-24.18 48.7-44.07c15.96-19.14 10.2-41.74 6.69-48.03c-4.15-7.43-56.94 17.01-56.94 17.01S14.07 17.99 10.39 23.99C5.4 32.13-1.59 53.54 12.52 73.45C27.5 94.6 60.85 120.71 64.8 120.71" />
                            <path fill="#ff262e"
                                d="M64.55 114.2s52.26-38.68 56.75-62.3c4.25-22.37-4.45-33.22-15.16-38.45C78.99.19 65.29 26.21 64 26.21S49.95.14 23.7 11.42C9.24 17.63 3.18 34.53 8.91 53.57c8.41 27.94 55.64 60.63 55.64 60.63" />
                        </svg>
                        {{ user.informations.like }}</span>
                </div>

                <div class="relative">
                    <ul class="text-[18px]">
                        <li class="py-4">{{ user.informations.descriptionOne }}</li>
                        <li class="py-4">{{ user.informations.descriptionTwo }}</li>
                        <li v-if="showMoreDescription" class="py-4">{{ user.informations.descriptionThre }}</li>
                        <li v-if="showMoreDescription" class="py-4">{{ user.informations.descriptionFor }}</li>
                    </ul>
                    <div class="absolute inset-0 bg-cover bg-no-repeat"
                        style="background-image: url('http://amentotech.com/htmls/worktern/images/bg-img.png');"></div>

                </div>
                <div class="flex justify-end">
                    <button @click="toggleDescription">{{ showMoreDescription ? 'Less' : 'Read More' }}</button>

                </div>

            </div>
            <!-- // div 3 -->
            <div
                class="w-full sm:w-full sm:px-[30px] sm:py-[30px] lg:py-0 lg:px-0 text-center w-[22%] border-l border-gray-100">
                <div class="flex">
                    <div class="bg-gray-100 py-9 px-2.5 w-1/2">
                        <h3 class="text-xl font-bold text-green-500">{{ user.informationsTwo.ongoing }}</h3>
                        <h4>{{ user.informationsTwo.ongoingInfo }}</h4>
                    </div>

                    <div class="py-9 px-2.5 w-1/2">
                        <h3 class="text-xl font-bold text-blue-500">{{ user.informationsTwo.completed }}</h3>
                        <h4>{{ user.informationsTwo.completedInfo }}</h4>
                    </div>
                </div>
                <!-- 2 -->
                <div class="flex">
                    <div class="py-9 px-2.5 w-1/2">
                        <h3 class="text-xl font-bold text-yellow-600">{{ user.informationsTwo.cancelled }}</h3>
                        <h4>{{ user.informationsTwo.cancelledInfo }}</h4>
                    </div>

                    <div class="bg-gray-100 py-9 px-2.5 w-1/2">
                        <h3 class="text-xl font-bold text-purple-700">{{ user.informationsTwo.saved }}</h3>
                        <h4>{{ user.informationsTwo.SavedInfo }}</h4>
                    </div>
                </div>

                <div>
                    <p class="py-5">
                        {{ user.informationsTwo.text }}
                    </p>
                    <a href="" class="primary-button">{{ user.informationsTwo.sendOfferBtn }}</a>
                </div>
            </div>
        </div>
    </div>
</template>
