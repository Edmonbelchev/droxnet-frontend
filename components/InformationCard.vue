<script>
export default {
    props: {
        informations: {
            type: Array,
            required: true
        },
    },

};
</script>

<template>
    <div v-for="(info, index) in informations" :key="index" class="flex justify-center">

        <div class="columns-1">
            <div class="flex w-[1250px] px-10 justify-center py-[80px]">
                <div class="w-3/5">
                    <h2 class="text-4xl text-gray-800 font-bold mb-3">{{ info.divTitleOne }}</h2>
                    <h3 class="text-lg mb-6">{{ info.underTitleOne }}</h3>
                    <span class="border-b-4 w-[160px] border-orange-700 absolute"></span>
                    <p class="pt-14 text-base mb-6">{{ info.description }}
                        <a class="text-blue-400" :href="info.learn">{{ info.learn }}</a>
                    </p>
                    <QuestionToggler :hiddenContent="hiddenContent" />
                </div>
                <div class="w-2/5">
                    <img :src="info.img" alt="Information Image">
                </div>
            </div>
            <!-- //column 2 -->
            <div class="flex w-[1250px]">
                <div class="flex px-10 justify-center py-[80px] border-b-[1px]">
                    <div class="w-2/5">
                        <img :src="info.imgTwo" alt="Information Image">
                    </div>

                    <div class="w-3/5">
                        <h2 class="text-4xl text-gray-800 font-bold mb-3">{{ info.divTitleTwo }}</h2>
                        <h3 class="text-lg mb-6">{{ info.underTitleTwo }}</h3>
                        <span class="border-b-4 w-[160px] border-orange-700 absolute"></span>
                        <p class="pt-14 text-base mb-6">{{ info.description }}
                            <a class="text-blue-400" :href="info.learn">{{ info.learn }}</a>
                        </p>
                        <QuestionTogglerTwo />
                    </div>

                </div>
            </div>
            <!-- //column 3 -->
            <div class="flex w-[1250px] px-10 justify-center py-[80px]">
                <div class="w-3/5">
                    <h2 class="text-4xl text-gray-800 font-bold mb-3">{{ info.divTitleThre }}</h2>
                    <h3 class="text-lg mb-6">{{ info.underTitleThre }}</h3>
                    <span class="border-b-4 w-[160px] border-orange-700 absolute"></span>
                    <p class="pt-14 text-base mb-6">{{ info.description }}
                        <a class="text-blue-400" :href="info.learn">{{ info.learn }}</a>
                    </p>
                    <QuestionTogglerThre :hiddenContent="hiddenContent" />
                </div>
                <div class="w-2/5">
                    <img :src="info.imgThre" alt="Information Image">
                </div>
            </div>
        </div>

    </div>

</template>