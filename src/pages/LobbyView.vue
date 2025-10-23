<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Navigation from '@/components/Navigation.vue'

const router = useRouter()
const playerCount = ref<number | null>(null)
const picked = ref<'Public' | 'Private'>('Public')
const name = ref('')


const generateInviteCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}


const savePublicGame = (game: any) => {
  const existing = JSON.parse(localStorage.getItem('publicGames') || '[]')
  existing.push(game)
  localStorage.setItem('publicGames', JSON.stringify(existing))
}


const savePrivateGame = (game: any) => {
  const existing = JSON.parse(localStorage.getItem('privateGames') || '[]')
  existing.push(game)
  localStorage.setItem('privateGames', JSON.stringify(existing))
}

const startGame = () => {
  if (!playerCount.value || playerCount.value < 2) {
    alert('Please enter a valid number of players (2 or more)')
    return
  }

  const gameId = Date.now().toString()
  const baseGame = {
    id: gameId,
    name: name.value || `Game ${gameId}`,
    players: 1,
    maxPlayers: playerCount.value,
    
  }

  if (picked.value === 'Public') {
    savePublicGame(baseGame)
    router.push(`/game/${gameId}`)
  } else {
    const inviteCode = generateInviteCode()
    const privateGame = { ...baseGame, inviteCode }
    savePrivateGame(privateGame)
    alert(`Your private game code is: ${inviteCode}`)
    router.push(`/game/${inviteCode}`)
  }
}
</script>

<template>

  <Navigation />
  <div class="flex h-screen items-center justify-center bg-muted">
    <Card class="w-[350px] shadow-lg">
      <CardHeader>
        <CardTitle class="text-center text-2xl font-bold">
          Create Game
        </CardTitle>
      </CardHeader>

      <CardContent class="space-y-4">
        <div class="space-y-2">
          <Label for="name">Game name</Label>
          <Input
            id="name"
            type="string"
            v-model.string="name"
            placeholder="Enter game name"
          />
        </div>
        <div class="space-y-2">
          <Label for="playerCount">Player count</Label>
          <Input
            id="playerCount"
            type="number"
            v-model.number="playerCount"
            placeholder="Enter player count"
            min="2"
            max="6"
          />
        </div>

        <Label for="privacy">Game privacy</Label>
        <div class="flex gap-4">
          <div>
            <input type="radio" id="public" value="Public" v-model="picked" />
            <label for="public" class="ml-1">Public</label>
          </div>
          <div>
            <input type="radio" id="private" value="Private" v-model="picked" />
            <label for="private" class="ml-1">Private</label>
          </div>
        </div>

        <Button class="w-full" @click="startGame">
          Start Game
        </Button>
      </CardContent>
    </Card>
  </div>
</template>
