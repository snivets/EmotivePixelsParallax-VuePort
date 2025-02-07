<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import EpisodeCard from '@/components/EpisodeCard.vue'
import { usePodcastStore } from '@/stores/podcastStore'

const router = useRouter()
const dimBackground = ref(false)
const welcomeCard = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      // If welcome card is not intersecting (not visible), dim the background
      dimBackground.value = !entries[0].isIntersecting
    },
    {
      threshold: 0.5, // Trigger when 50% of the element is visible/hidden
    },
  )

  if (welcomeCard.value) {
    observer.observe(welcomeCard.value)
  }

  onUnmounted(() => {
    observer.disconnect()
  })
})

const { episodes } = usePodcastStore()
</script>

<template>
  <div
    class="h-screen w-full overflow-y-scroll snap-y snap-mandatory touch-pan-y focus:outline-none"
  >
    <!-- Fixed background that will show through the cards -->
    <div
      class="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 pointer-events-none"
    ></div>
    <!-- Background dimming overlay with transition -->
    <div
      class="fixed inset-0 bg-black transition-opacity duration-500 pointer-events-none"
      :class="dimBackground ? 'opacity-30' : 'opacity-0'"
    ></div>

    <!-- Welcome Card -->
    <div class="h-screen w-full flex justify-center items-center snap-center">
      <div class="text-center text-white px-4 pointer-events-none">
        <h1 class="text-6xl font-bold mb-6 fade-in">Welcome to Emotive Pixels</h1>
        <p class="text-2xl mb-12 fade-in-delay">
          In Season 5, we're exploring what big-budget 'AAA' gaming means in an era of increasing
          technological democratization.
        </p>
      </div>

      <div
        class="absolute bottom-8 flex flex-col items-center justify-center animate-bounce pointer-events-none"
      >
        <p class="text-sm text-white/90">Scroll down to see episodes</p>
        <svg
          class="w-6 h-6 mx-auto mt-2 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>

    <!-- Episode Cards -->
    <div
      v-for="episode in episodes"
      :key="episode.audioUrl"
      class="h-screen w-full flex justify-center items-center snap-center"
    >
      <EpisodeCard
        :title="episode.title"
        :date="episode.episodeDate"
        :description="episode.description"
        class="cursor-pointer"
        @click="router.push(`/${episode.seasonString}`)"
      />
    </div>
  </div>
</template>

<style>
.fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.fade-in-delay {
  animation: fadeIn 1s ease-out 0.5s forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hide scrollbar but keep functionality */
::-webkit-scrollbar {
  display: none;
}

* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
