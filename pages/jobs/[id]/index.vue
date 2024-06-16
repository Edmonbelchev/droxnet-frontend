<script lang="ts" setup>
const companyInfo =
{
  backgroundImg: "https://amentotech.com/htmls/worktern/images/bannerimg/banner.jpg",
  creativeImg: "https://amentotech.com/htmls/worktern/images/company/img-01.png",
  verifiedTitle: "Verified Company",
  angryTitle: "Angry Creative Studio",
  titleDescription: "About “Angry Crative Studio”",
  description: "Excepteur sint occaecat cupidatat non proident, saeunt in culpa qui officia deserunt mollit anim laborum. Seden utem perspiciatis undesieu omnis voluptatem accusantium doque laudantium, totam rem aiam eaqueiu ipsa quae ab illoion inventore veritatisetm quasitea architecto beataea dictaed quia couuntur magni dolores eos aquist ratione vtatem seque nesnt. Neque porro quamest quioremas ipsum quiatem dolor sitem ameteism conctetur adipisci velit sedate quianon.",
  secondDescription: "Laborum sed ut perspiciatis unde omnis iste natus error sitems voluptatem accusantium doloremque laudantium, totam rem aiam eaque ipsa quae ab illo inventore veritatis etna quasi architecto beatae vitae dictation explicabo. nemo enim ipsam fugit.",

}

</script>




<template>
  <NuxtLayout name="default">

    <div class="max-w-[1110px] mx-auto">
      <EmployerDetails :employer="companyInfo" />


    </div>

  </NuxtLayout>
</template>
