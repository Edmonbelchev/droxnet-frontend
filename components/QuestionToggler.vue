<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const showContentIndex = ref(null);
const toggleContent = (index) => {
    showContentIndex.value = showContentIndex.value === index ? null : index;
};

const hiddenContent = [
    {
        firstSectionHeading: "Adipisicing elit, sed do eiusmod tempor incididunt?",

        underHeading: "Digital Marketing",
        description: "Consectetur adipisicing elit sed aeiusmisuod tempor incididunt labore dolore ma alaeiqua enim ade minim veniam quis nostr xecitation ullamcoaris nisi ut aliquipa extaea coedmmmodo equate irure dolawor in reprehenderit.",
        questions: "Did you find this useful? ",

    },
    {
        secondSectionHeading: "Dolore magna aliqua enim ad minim veniam?",

        underHeading: "Digital Marketing",
        description: "Consectetur adipisicing elit sed aeiusmisuod tempor incididunt labore dolore ma alaeiqua enim ade minim veniam quis nostr xecitation ullamcoaris nisi ut aliquipa extaea coedmmmodo equate irure dolawor in reprehenderit.",
        questions: "Did you find this useful? ",
    },
    {
        thirdSectionHeading: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo?",

        underHeading: "Digital Marketing",
        description: "Consectetur adipisicing elit sed aeiusmisuod tempor incididunt labore dolore ma alaeiqua enim ade minim veniam quis nostr xecitation ullamcoaris nisi ut aliquipa extaea coedmmmodo equate irure dolawor in reprehenderit.",
        questions: "Did you find this useful? ",
    }

]
</script>

<template>
    <div>
        <ul>
            <li v-for="(content, index) in hiddenContent" :key="index" class="" @click="toggleContent(index)">
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













<!-- <ul>
        <li class="border" @click="show = !show">Adipisicing elit, sed do eiusmod tempor incididunt?
            <div :style="{ height: show ? '200px' : '0' }" class="content" :class="{ 'block': show }">
                <h2>Digital Marketing</h2>
                <p>Consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore eta dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.</p>
                <div>
                    <span>Did you find this useful?</span>
                </div>
            </div>
        </li>
        <li class="border" @click="secondShow = !secondShow">Dolore magna aliqua enim ad minim veniam?
            <div :style="{ height: secondShow ? '200px' : '0' }" class="content" :class="{ 'block': secondShow }">
                <h2>Digital Marketing</h2>
                <p>Consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore eta dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.</p>
                <div>
                    <span>Did you find this useful?</span>
                </div>
            </div>
        </li>
        <li class="border" @click="thirdShow = !thirdShow">Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo?
            <div :style="{ height: thirdShow ? '200px' : '0' }" class="content" :class="{ 'block': thirdShow }">
                <h2>Digital Marketing</h2>
                <p>Consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore eta dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.</p>
                <div>
                    <span>Did you find this useful?</span>
                </div>
            </div>
        </li>
    </ul> -->