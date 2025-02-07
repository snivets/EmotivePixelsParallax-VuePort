<script setup lang="ts">
defineProps<{
  title: string
  date: string
  description: string
  seasonString?: string | null
}>()
</script>

<template>
  <div
    class="relative h-full group overflow-hidden rounded-2xl"
    :style="
      seasonString
        ? {
            backgroundImage: `url('/images/${seasonString}.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }
        : {}
    "
  >
    <!-- Gradient overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300"
    ></div>

    <!-- Content -->
    <div class="relative h-full p-6 flex flex-col justify-end min-h-[16rem]">
      <!-- Title and date -->
      <div class="transform transition-all duration-300 group-hover:translate-y-0 translate-y-8">
        <h2 class="text-2xl font-bold text-white mb-2 line-clamp-2">{{ title }}</h2>
        <time class="text-sm text-white/75 block mb-4">{{ date.toUpperCase() }}</time>

        <!-- Description (hidden by default, shown on hover) -->
        <div
          class="prose prose-invert max-w-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style="
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          "
        >
          <p v-html="description"></p>
        </div>
      </div>
    </div>

    <!-- Fallback background if no image -->
    <div
      v-if="!seasonString"
      class="absolute inset-0 bg-gradient-to-br from-purple-900 to-pink-900 -z-10"
    ></div>
  </div>
</template>

<style scoped>
.prose :deep(p) {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.75);
}
</style>
