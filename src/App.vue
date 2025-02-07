<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { usePodcastStore } from './stores/podcastStore'

const podcastStore = usePodcastStore()

onMounted(() => {
  podcastStore.fetchRssFeed()
})
</script>

<template>
  <RouterView />
</template>
