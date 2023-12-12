<script lang="ts" setup>
  const submissions = useState("submissions");
</script>

<template>
  <div
    class="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 max-w-4xl"
  >
    <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
      Список заявок
    </h2>
    <ul
      class="list-disc list-inside bg-white shadow-lg rounded-lg p-6 divide-y divide-gray-200"
    >
      <li v-for="submission in submissions" :key="submission.id" class="py-4">
        <span class="font-semibold text-blue-600">ID:</span> {{ submission.id }}
        <br />
        <span class="font-semibold text-blue-600">Name:</span>
        {{ submission.name }}
      </li>
    </ul>
    <p class="mt-6 text-gray-700 text-lg">
      Nuxt provides the useState composable to create a reactive and
      SSR-friendly shared state across components.
    </p>

    <p class="mt-4 text-gray-700 text-lg">
      useState is an SSR-friendly ref replacement. Its value will be preserved
      after server-side rendering (during client-side hydration) and shared
      across all components using a unique key.
    </p>
  </div>
</template>

<style scoped></style>
