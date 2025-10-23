<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navigation from '@/components/Navigation.vue'

const route = useRoute()
const router = useRouter()
const username = ref('')


const gameId = route.params.id as string
const game = ref<any>(null)

onMounted(() => {
  const publicGames = JSON.parse(localStorage.getItem('publicGames') || '[]')
  const privateGames = JSON.parse(localStorage.getItem('privateGames') || '[]')
    const storedUser = localStorage.getItem('currentUser')
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser)
      username.value = typeof parsed === 'string' ? parsed : parsed.username || ''
    } catch {
      username.value = storedUser
    }
  } else {
    router.push('/')
  }
  

  game.value =
    publicGames.find((g: any) => g.id === gameId) ||
    privateGames.find((g: any) => g.inviteCode === gameId)

  if (!game.value) {
    alert('Game not found!')
    router.push('/lobby')
  }
})
</script>

<template>
    <Navigation />
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Game: {{ game?.name }}</h1>

    <p>Players: {{ game?.players }} / {{ game?.maxPlayers }}</p>

    <div class="border rounded-lg p-4 mt-4">
      <p></p>
    </div>
  </div>
</template>
