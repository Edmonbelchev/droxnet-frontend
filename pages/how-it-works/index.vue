<script setup>
const informations = [
  {
    title: "How To Start Hiring",
    subTitle: "Start Today For a Great Future",
    description:
      "Dotem eiusmod tempor incune utnaem labore etdolore maigna aliqua eniina ilukita ylokem lokateise ination voluptate velite esse cillum dolore eu fugnulla pariatur lokaim urianewce animid ",
    learn: "Learn more",

    img: "https://amentotech.com/htmls/worktern/images/work/img-01.jpg",
    questions: [
      {
        title:
          "Adipisicing elit, sed do eiusmod tempor incididunt?",

        contentTitle: "Digital Marketing",
        description:
          "Consectetur adipisicing elit sed aeiusmisuod tempor incididunt labore dolore ma alaeiqua enim ade minim veniam quis nostr xecitation ullamcoaris nisi ut aliquipa extaea coedmmmodo equate irure dolawor in reprehenderit.",
        questions: "Did you find this useful? ",
      },
      {
        title: "Dolore magna aliqua enim ad minim veniam?",

        contentTitle: "Digital Marketing",
        description:
          "Consectetur adipisicing elit sed aeiusmisuod tempor incididunt labore dolore ma alaeiqua enim ade minim veniam quis nostr xecitation ullamcoaris nisi ut aliquipa extaea coedmmmodo equate irure dolawor in reprehenderit.",
        questions: "Did you find this useful? ",
      },
      {
        title: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo?",
          contentTitle: "Digital Marketing",
        description:
          "Consectetur adipisicing elit sed aeiusmisuod tempor incididunt labore dolore ma alaeiqua enim ade minim veniam quis nostr xecitation ullamcoaris nisi ut aliquipa extaea coedmmmodo equate irure dolawor in reprehenderit.",
        questions: "Did you find this useful? ",
      },
    ],
  },
  {
    title: "Getting Into Business",
    subTitle: "Focus on Your Work & Team",
    description:
      "Dotem eiusmod tempor incune utnaem labore etdolore maigna aliqua eniina ilukita ylokem lokateise ination voluptate velite esse cillum dolore eu fugnulla pariatur lokaim urianewce animid ",
    learn: "Learn more",
    img: "https://amentotech.com/htmls/worktern/images/work/img-02.jpg",
    questions: [
      {
        title:
          "Adipisicing elit, sed do eiusmod tempor incididunt?",

        contentTitle: "Digital Marketing",
        description:
          "Consectetur adipisicing elit sed aeiusmisuod tempor incididunt labore dolore ma alaeiqua enim ade minim veniam quis nostr xecitation ullamcoaris nisi ut aliquipa extaea coedmmmodo equate irure dolawor in reprehenderit.",
        questions: "Did you find this useful? ",
      },
      {
        title: "Dolore magna aliqua enim ad minim veniam?",

        contentTitle: "Digital Marketing",
        description:
          "Consectetur adipisicing elit sed aeiusmisuod tempor incididunt labore dolore ma alaeiqua enim ade minim veniam quis nostr xecitation ullamcoaris nisi ut aliquipa extaea coedmmmodo equate irure dolawor in reprehenderit.",
        questions: "Did you find this useful? ",
      },
      {
        title: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo?",
          contentTitle: "Digital Marketing",
        description:
          "Consectetur adipisicing elit sed aeiusmisuod tempor incididunt labore dolore ma alaeiqua enim ade minim veniam quis nostr xecitation ullamcoaris nisi ut aliquipa extaea coedmmmodo equate irure dolawor in reprehenderit.",
        questions: "Did you find this useful? ",
      },
    ],
  },
  {
    title: "Making Serious Profit",
    subTitle: "Manage Your Profitable Account",
    description:
      "Dotem eiusmod tempor incune utnaem labore etdolore maigna aliqua eniina ilukita ylokem lokateise ination voluptate velite esse cillum dolore eu fugnulla pariatur lokaim urianewce animid ",
    learn: "Learn more",
    img: "https://amentotech.com/htmls/worktern/images/work/img-03.jpg",
    questions: [
      {
        title:
          "Adipisicing elit, sed do eiusmod tempor incididunt?",

        contentTitle: "Digital Marketing",
        description:
          "Consectetur adipisicing elit sed aeiusmisuod tempor incididunt labore dolore ma alaeiqua enim ade minim veniam quis nostr xecitation ullamcoaris nisi ut aliquipa extaea coedmmmodo equate irure dolawor in reprehenderit.",
        questions: "Did you find this useful? ",
      },
      {
        title: "Dolore magna aliqua enim ad minim veniam?",

        contentTitle: "Digital Marketing",
        description:
          "Consectetur adipisicing elit sed aeiusmisuod tempor incididunt labore dolore ma alaeiqua enim ade minim veniam quis nostr xecitation ullamcoaris nisi ut aliquipa extaea coedmmmodo equate irure dolawor in reprehenderit.",
        questions: "Did you find this useful? ",
      }
    ],
  },
];
</script>

<template>
  <NuxtLayout name="default">
    <div class="bg-[--background-color] flex justify-center py-10 lg:py-20 px-4">
        <div class="bg-white max-w-[1140px] flex flex-col">
            <InformationCard
              :information="information"
              v-for="(information, index) of informations"
              :key="index"
              :className="{ 'flex-row-reverse': index % 2 === 1 }"
              class="px-6 py-8 sm:p-10 lg:py-20 border-b"
            />
        </div>
    </div>
  </NuxtLayout>
</template>
