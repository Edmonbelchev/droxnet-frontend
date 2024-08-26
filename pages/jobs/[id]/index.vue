<script setup>
const route = useRoute();

const job = ref();
const loading = ref(true);

const retrieveJob = async () => {
  const response = await fetchJob(route.params.id);

  if (response.status.value === "success") {
    job.value = response.data.value.data;
  }

  loading.value = false;
};

onMounted(() => {
  retrieveJob();
});
</script>

<template>
  <SkeletonJobSingle v-if="loading" />
  <div class="bg-gray-100 min-h-screen" v-else>
    <!-- Header Section -->
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-gray-800">{{ job.title }}</h1>
        <div class="flex items-center mt-2 text-sm text-gray-600">
          <span class="mr-4"
            ><i class="fas fa-briefcase mr-2"></i>{{ job.type }}</span
          >
          <span class="mr-4"
            ><i class="fas fa-map-marker-alt mr-2"></i>{{ job.location }}</span
          >
          <span><i class="far fa-clock mr-2"></i>{{ job.posted }}</span>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Main Content -->
        <div class="lg:w-2/3">
          <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-xl font-semibold mb-4">Job Description</h2>
            <div v-html="job.description"></div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-xl font-semibold mb-4">Skills Required</h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in job.skills"
                :key="skill"
                class="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4">Education + Experience</h2>
            <ul class="list-disc list-inside space-y-2">
              <li v-for="(item, index) in job.requirements" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:w-1/3">
          <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <button
              class="w-full bg-blue-600 text-white py-3 rounded-md font-semibold mb-4 hover:bg-blue-700 transition duration-300"
            >
              Apply Now
            </button>
            <ul class="space-y-4">
              <li class="flex justify-between">
                <span class="text-gray-600">Offered Salary:</span>
                <span class="font-semibold">{{ job.salary }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-gray-600">Career Level:</span>
                <span class="font-semibold">{{ job.careerLevel }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-gray-600">Experience:</span>
                <span class="font-semibold">{{ job.experience }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-gray-600">Industry:</span>
                <span class="font-semibold">{{ job.industry }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-gray-600">Qualification:</span>
                <span class="font-semibold">{{ job.qualification }}</span>
              </li>
            </ul>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-xl font-semibold mb-4">Job Overview</h2>
            <ul class="space-y-4">
              <li class="flex items-center">
                <i class="fas fa-calendar-alt text-blue-600 mr-3"></i>
                <div>
                  <span class="block text-gray-600">Date Posted:</span>
                  <span class="font-semibold">{{ job.datePosted }}</span>
                </div>
              </li>
              <li class="flex items-center">
                <i class="fas fa-hourglass-end text-blue-600 mr-3"></i>
                <div>
                  <span class="block text-gray-600">Expiration date:</span>
                  <span class="font-semibold">{{ job.expirationDate }}</span>
                </div>
              </li>
              <li class="flex items-center">
                <i class="fas fa-map-marker-alt text-blue-600 mr-3"></i>
                <div>
                  <span class="block text-gray-600">Location:</span>
                  <span class="font-semibold">{{ job.location }}</span>
                </div>
              </li>
              <li class="flex items-center">
                <i class="fas fa-user text-blue-600 mr-3"></i>
                <div>
                  <span class="block text-gray-600">Job Title:</span>
                  <span class="font-semibold">{{ job.title }}</span>
                </div>
              </li>
              <li class="flex items-center">
                <i class="fas fa-clock text-blue-600 mr-3"></i>
                <div>
                  <span class="block text-gray-600">Hours:</span>
                  <span class="font-semibold">{{ job.hours }}</span>
                </div>
              </li>
              <li class="flex items-center">
                <i class="fas fa-money-bill-alt text-blue-600 mr-3"></i>
                <div>
                  <span class="block text-gray-600">Rate:</span>
                  <span class="font-semibold">{{ job.rate }}</span>
                </div>
              </li>
              <li class="flex items-center">
                <i class="fas fa-briefcase text-blue-600 mr-3"></i>
                <div>
                  <span class="block text-gray-600">Salary:</span>
                  <span class="font-semibold">{{ job.salary }}</span>
                </div>
              </li>
            </ul>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4">Company Information</h2>
            <div class="flex items-center mb-4">
              <div>
                <h3 class="font-semibold text-lg">{{ job.name }}</h3>
                <p class="text-gray-600">{{ job.location }}</p>
              </div>
            </div>
            <p class="text-gray-700 mb-4">{{ job.description }}</p>
            <a href="#" class="text-blue-600 hover:underline"
              >View Company Profile</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>