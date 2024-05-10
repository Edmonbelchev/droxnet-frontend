<script setup>
const user = ref(
    {
        avatar: "http://amentotech.com/htmls/worktern/images/profile/img-01.jpg",
        name: "Valentine Mehring",
        feedback: '5.0/5',
        since: 'Member since May 30, 2013',
        mail: '@valentine20658',
        report: 'Report User',

        informations:
        {
            title: "Classified Posting, Data Entry, Typing Expert",
            perHour: '$44.00 / hr',
            country: 'United States',
            like: 'Save',
            descriptionOne: 'Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia deserunt mollit anim id est laborum. Seden utem perspiciatis undesieu omnis iste natus error sit voluptatem.',
            descriptionTwo: 'Accusantium doque laudantium, totam rem aiam eaqueiu ipsa quae ab illoion inventore veritatisetm quasitea architecto beataea dictaed quia couuntur magni dolores eos quist ratione vtatem seque nesnt. Neque porro quamest quioremas ipsum quiatem dolor sitem amet conctetur adipisci velit sedate quianon.',
            descriptionThre: 'Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia deserunt mollit anim id est laborum. Seden utem perspiciatis undesieu omnis iste natus error sit voluptatem.',
            descriptionFor: 'Accusantium doque laudantium, totam rem aiam eaqueiu ipsa quae ab illoion inventore veritatisetm quasitea architecto beataea dictaed quia couuntur magni dolores eos quist ratione vtatem seque nesnt. Neque porro quamest quioremas ipsum quiatem dolor sitem amet conctetur adipisci velit sedate quianon.',
        },
        informationsTwo:
        {
            ongoing: '3',
            ongoingInfo: 'Ongoing Projects',
            completed: '1,503',
            completedInfo: 'Completed Projects',
            cancelled: '2',
            cancelledInfo: 'Cancelled Projects',
            saved: '25 K',
            SavedInfo: 'Saved Hours',
            text: '* Adpsicing elit sed do eiusmod tempor incididunt ut labore et dolore.',
            sendOfferBtn: 'Send Offer'
        },
    }
);

</script>

<template>
    <NuxtLayout name="default">
        <UsersDetails :user="user" />
    </NuxtLayout>
</template>
