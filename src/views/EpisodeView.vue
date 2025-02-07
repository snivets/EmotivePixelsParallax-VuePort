<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import EpisodeCard from '@/components/EpisodeCard.vue'

const route = useRoute()
const episode = ref<{
  id: string
  title: string
  date: string
  description: string
} | null>(null)

onMounted(async () => {
  // This is where you'll fetch the specific episode data from your RSS feed
  // using the route.params.id (which will be something like 's5e1')
  episode.value = {
    id: route.params.id as string,
    title: 'Example Episode',
    date: 'February 7, 2025',
    description: `Episode ${route.params.id}`,
  }
})
</script>

<template>
  <main class="w-screen min-h-screen">
    <!-- Fixed background that will show through the cards -->
    <div class="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"></div>
    <!-- Background dimming overlay -->
    <div class="fixed inset-0 bg-black opacity-30"></div>

    <!-- Episode Card -->
    <div v-if="episode" class="w-full min-h-screen flex justify-center items-center">
      <EpisodeCard
        :title="episode.title"
        :date="episode.date"
        :description="episode.description"
        :season-string="episode.id"
      />
    </div>
  </main>
</template>
