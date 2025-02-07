import { defineStore } from 'pinia'

interface PodcastState {
  rssData: string | null
  isLoading: boolean
  error: string | null
  episodes: PodcastEpisode[]
}

interface PodcastEpisode {
  title: string
  description: string
  audioUrl?: string
  imageUrl?: string | null
  seasonNumber?: number
  episodeNumber?: number
  seasonString?: string | null
  episodeDate: string
  isBonus: boolean
  length: string | null
}

export const usePodcastStore = defineStore('podcast', {
  state: (): PodcastState => ({
    rssData: null,
    isLoading: false,
    error: null,
    episodes: [],
  }),

  actions: {
    async fetchRssFeed() {
      this.isLoading = true
      this.error = null

      try {
        const response = await fetch('https://anchor.fm/s/4cba81a4/podcast/rss')
        if (!response.ok) {
          throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`)
        }
        const xmlString = await response.text()
        this.rssData = xmlString
        this.parseRssData(xmlString)
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch podcast data'
        console.error('Podcast fetch failed:', error)
      } finally {
        this.isLoading = false
      }
    },

    parseRssData(xmlString: string) {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml')
      const items = xmlDoc.querySelectorAll('item')

      const parsedEpisodes = Array.from(items)
        .map((item) => {
          const title = item.querySelector('title')?.textContent || ''
          const audioUrl = item.getElementsByTagName('enclosure')[0].getAttribute('url')?.toString()
          const description = item.querySelector('description')?.textContent || ''
          const pubDate = item.querySelector('pubDate')?.textContent || ''
          const duration = item.querySelector('itunes\\:duration')?.textContent || null
          const dateStr = item.querySelector('pubDate')?.textContent
          let date = ''
          if (dateStr) {
            date = new Date(dateStr).toLocaleDateString('en-us', { year: 'numeric', month: 'long' })
          }
          console.log(date)
          let imageUrl = null
          const image = item.getElementsByTagName('itunes:image')[0]
          if (image) {
            imageUrl = image.getAttribute('href')
          }

          // The colon seems to throw querySelector.
          const length = item.getElementsByTagName('itunes:duration')[0]?.textContent || null
          const season = item.getElementsByTagName('itunes:season')[0]
          const episode = item.getElementsByTagName('itunes:episode')[0]
          const isBonus =
            item.getElementsByTagName('itunes:episodeType')[0]?.textContent === 'bonus'
          let seasonNumber: number | undefined
          if (season && season.textContent) {
            seasonNumber = parseInt(season.textContent)
          }
          let episodeNumber: number | undefined
          if (episode && episode.textContent) {
            episodeNumber = parseInt(episode.textContent)
          }
          const seasonString = isBonus ? null : `s${seasonNumber}e${episodeNumber}`

          if (!title || !description) return null

          const episodeData: PodcastEpisode = {
            title,
            description,
            audioUrl,
            imageUrl,
            seasonNumber,
            episodeNumber,
            seasonString,
            episodeDate: date,
            isBonus,
            length,
          }

          return episodeData
        })
        .filter((episode): episode is PodcastEpisode => episode !== null)

      this.episodes = parsedEpisodes
    },
  },

  getters: {
    hasData: (state) => !!state.rssData,
    hasError: (state) => !!state.error,
  },
})
