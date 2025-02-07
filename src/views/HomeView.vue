<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import EpisodeCard from '@/components/EpisodeCard.vue'
import { usePodcastStore } from '@/stores/podcastStore'

const router = useRouter()
const podcastStore = usePodcastStore()

onMounted(async () => {
  await podcastStore.fetchRssFeed()
})

const { episodes } = podcastStore
</script>

<template>
  <div class="min-h-screen w-full relative">
    <!-- Fixed background -->
    <div
      class="fixed inset-0 pointer-events-none bg-[url('/images/epbg.png')] bg-cover bg-center bg-no-repeat"
    ></div>

    <!-- Landing Section (Fixed) -->
    <section class="relative h-screen flex items-center justify-center px-4">
      <div class="text-center text-white max-w-4xl">
        <h1 class="text-6xl font-bold mb-6 fade-in">Welcome to Emotive Pixels</h1>
        <div class="text-2xl mb-12 fade-in-delay space-y-6">
          <p>
            Emotive Pixels is a videogame podcast. We typically discuss (and spoil!) a single game -
            playing along is optional. Sometimes, we have multi-game episodes we call Pixel Arrays
            where we talk around the table about things we've been enjoying.
          </p>
          <p class="fade-in-delay">
            In our tenth year, we are inspecting the current state of AAA gaming, asking what its
            relevance is in a world of indies of ever-increasing scope.
          </p>
        </div>
        <div class="flex justify-center space-x-8 mt-8">
          <a
            href="https://podcasts.apple.com/us/podcast/emotive-pixels-10-years-of-friendship-and-videogames/id888205890"
            target="_blank"
            rel="noopener noreferrer"
            class="opacity-80 hover:opacity-100 transition-opacity"
          >
            <img src="/images/apple-podcasts-icon.svg" alt="Apple Podcasts" class="w-8 h-8" />
          </a>
          <a
            href="https://open.spotify.com/show/0DWpmFcqfxQpxZwXyPF2KO"
            target="_blank"
            rel="noopener noreferrer"
            class="opacity-80 hover:opacity-100 transition-opacity"
          >
            <img src="/images/spotify-icon.svg" alt="Spotify" class="w-8 h-8" />
          </a>
          <a
            href="https://pca.st/gbxx2for"
            target="_blank"
            rel="noopener noreferrer"
            class="opacity-80 hover:opacity-100 transition-opacity"
          >
            <img src="/images/pocket-casts-icon.svg" alt="Pocket Casts" class="w-8 h-8" />
          </a>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 text-white text-center w-full">
        <p class="text-sm mb-2 opacity-75">Scroll to explore episodes</p>
        <div class="w-8 h-12 mx-auto border-2 border-white/50 rounded-full relative">
          <div
            class="w-2 h-2 bg-white rounded-full absolute left-1/2 top-2 -translate-x-1/2 animate-scroll"
          ></div>
        </div>
      </div>
    </section>

    <!-- Episodes Section (Scrollable Grid) -->
    <section class="relative min-h-screen bg-black/80 backdrop-blur-sm py-16 px-8">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 aspect-square">
        <div
          v-for="episode in episodes"
          :key="episode.audioUrl"
          class="aspect-square transform transition-all duration-300 hover:scale-[1.02]"
        >
          <EpisodeCard
            :title="episode.title"
            :date="episode.episodeDate"
            :description="episode.description"
            :seasonString="episode.seasonString"
            class="cursor-pointer h-full"
            @click="router.push(`/${episode.seasonString}`)"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fade-in {
  animation: fadeIn 1s ease-out;
}

.fade-in-delay {
  animation: fadeIn 1s ease-out 0.5s both;
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

@keyframes scroll {
  0% {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  75% {
    transform: translate(-50%, 24px);
    opacity: 0;
  }
  76% {
    transform: translate(-50%, 0);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

.animate-scroll {
  animation: scroll 2s ease-in-out infinite;
}
</style>
