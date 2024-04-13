<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const showContentIndex = ref(null);
const toggleContent = (index) => {
    showContentIndex.value = showContentIndex.value === index ? null : index;
};

const hiddenContentTwo = [
    {
        firstSectionHeading: "Nostrud exercitation ullamco laboris nisi ut aliquip?",

        underHeading: "Digital Marketing",
        description: "Consectetur adipisicing elit sed aeiusmisuod tempor incididunt labore dolore ma alaeiqua enim ade minim veniam quis nostr xecitation ullamcoaris nisi ut aliquipa extaea coedmmmodo equate irure dolawor in reprehenderit.",
        questions: "Did you find this useful? ",

    },
    {
        secondSectionHeading: "Commodo consequat aute irure dolor in reprehenderit in voluptate velit?",

        underHeading: "Digital Marketing",
        description: "Consectetur adipisicing elit sed aeiusmisuod tempor incididunt labore dolore ma alaeiqua enim ade minim veniam quis nostr xecitation ullamcoaris nisi ut aliquipa extaea coedmmmodo equate irure dolawor in reprehenderit.",
        questions: "Did you find this useful? ",
    },
    {
        thirdSectionHeading: "Cillum dolore eu fugiat nulla pariatur?",

        underHeading: "Digital Marketing",
        description: "Consectetur adipisicing elit sed aeiusmisuod tempor incididunt labore dolore ma alaeiqua enim ade minim veniam quis nostr xecitation ullamcoaris nisi ut aliquipa extaea coedmmmodo equate irure dolawor in reprehenderit.",
        questions: "Did you find this useful? ",
    }

]
</script>

<template>
    <div>
        <ul>
            <li v-for="(content, index) in hiddenContentTwo" :key="index" class="" @click="toggleContent(index)">
                <h2 class="border border-gray p-4 text-black">
                    {{ content.firstSectionHeading }}
                    {{ content.secondSectionHeading }}
                    {{ content.thirdSectionHeading }}
                </h2>
                <!-- second  -->
                <div :style="{ height: showContentIndex === index ? '200px' : '0' }" class="content-center content px-6"
                    :class="{ 'block': showContentIndex === index }" @click.stop>
                    <h2 class="text-lg text-black mb-2">{{ content.underHeading }}</h2>
                    <p class="mb-4">{{ content.description }}</p>
                    <div class="flex gap-3">
                        <span class="text-black">{{ content.questions }}</span>
                        <!-- i want icon here -->
                        <div class="flex">
                            <span class="border-black border-r-[1px] pr-2 py-1">
                                <Icon icon="fa-solid:thumbs-up" class="text-green-500" />
                            </span>
                            <span class="pl-2 py-1">
                                <icon icon="fa:thumbs-down" class="text-red-500" />
                            </span>
                        </div>
                    </div>
                </div>
            </li>

        </ul>
    </div>
</template>


<style scoped>
.content {
    overflow: hidden;
    transition: height 0.3s ease-in-out;
}
</style>