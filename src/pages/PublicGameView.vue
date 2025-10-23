<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useRouter } from 'vue-router'
import Navigation from '@/components/Navigation.vue'

const router = useRouter()
const username = ref('')
const inviteCode = ref('')

const goBack = () => {
  router.back()
}

interface Game {
  id: string
  name: string
  players: number
  maxPlayers: number
  inviteCode?: string
}

const publicGames = ref<Game[]>([])
const isLoading = ref(true)

const fetchPublicGames = () => {
  isLoading.value = true
  try {
    const data = JSON.parse(localStorage.getItem('publicGames') || '[]')
    publicGames.value = data
  } catch (error) {
    console.error('Failed to load games:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
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

  fetchPublicGames()
})

const joinGame = (gameId: string) => {
  localStorage.setItem('selectedGameId', gameId)
  router.push(`/game/${gameId}`)
}

const joinByInvite = () => {
  const code = inviteCode.value.trim()
  if (!code) return

  const privateGames = JSON.parse(localStorage.getItem('privateGames') || '[]')
  const found = privateGames.find((g: Game) => g.inviteCode === code)

  if (found) {
    router.push(`/game/${found.inviteCode}`)
  } else {
    alert('Invalid invite code!')
  }
}

</script>

<template>
    <Navigation />

  <div class="flex h-screen items-center justify-center bg-muted">
    
    <Card class="w-[400px] shadow-lg">
      <CardHeader class="text-center">
        <CardTitle class="text-2xl font-bold">Scotland Yard Lobby</CardTitle>
        <p class="text-sm text-muted-foreground mt-1">
          Welcome, <span class="font-semibold text-foreground">{{ username }}</span>
        </p>
      </CardHeader>

      <CardContent class="space-y-4">
        <div class="space-y-2">
          <Label for="invite">Join via Invite Code</Label>
          <div class="flex gap-2">
            <Input id="invite" v-model="inviteCode" placeholder="Enter invite code" />
            <Button @click="joinByInvite">Join</Button>
          </div>
        </div>

        <div>
          <h3 class="font-semibold mb-2">Public Games</h3>
          <div v-if="isLoading" class="text-center text-sm text-muted-foreground">
            Loading games...
          </div>
          <div v-else-if="!publicGames.length" class="text-center text-sm text-muted-foreground">
            No public games available
          </div>
          <div v-else class="flex flex-col gap-2 max-h-60 overflow-y-auto">
            <div
              v-for="game in publicGames"
              :key="game.id"
              class="flex justify-between items-center border rounded-lg p-2 bg-background hover:bg-accent transition"
            >
              <div>
                <p class="font-medium">{{ game.name }}</p>
                <p class="text-xs text-muted-foreground">
                  {{ game.players }}/{{ game.maxPlayers }} players
                </p>
              </div>
              <Button size="sm" @click="joinGame(game.id)">Join</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
