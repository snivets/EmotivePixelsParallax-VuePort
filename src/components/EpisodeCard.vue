<script setup lang="ts">
defineProps<{
  title: string
  date: string
  description: string
}>()
</script>

<template>
  <div
    class="w-[85vw] h-[85vh] bg-black backdrop-blur-sm rounded-3xl p-8 flex flex-col justify-center items-center relative shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
  >
    <div class="w-full text-center">
      <p class="text-lg mb-8 leading-relaxed" v-html="description"></p>
    </div>

    <div class="absolute bottom-8 left-8 text-left">
      <h2 class="text-2xl font-bold">{{ title }}</h2>
      <time class="text-sm opacity-75">{{ date.toUpperCase() }}</time>
    </div>
  </div>
</template>
