<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
<<<<<<< HEAD
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Navigation from '@/components/Navigation.vue'
=======
import { Card, CardContent } from '@/components/ui/card'
>>>>>>> 007f0d62ac1b0dd8eb82cc02bb2574278d223083

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
<<<<<<< HEAD

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
=======
  <div class="flex flex-col h-screen w-screen items-center justify-center bg-[url('https://cdn-imgix.headout.com/media/images/f41bdd0b95a2fc1fa8aff71725ffe5e3-2963-london-evening-cruise-on-river-thames-04.JPG')] bg-cover bg-center bg-black/50 bg-blend-darken">
    
    <div class="flex justify-center items-center">
      <div class="bg-[url(./assets/image.webp)] bg-size-[360px] bg-no-repeat bg-center h-56 w-96">
      </div>
    </div>

    <Card class="relative w-[420px] border-2 border-slate-200 bg-white/95 backdrop-blur-sm shadow-2xl">
      <CardContent class="space-y-6">
        <div class="space-y-3">
          <Label for="playerCount" class="text-sm font-medium text-slate-700">
            Number of Detectives
          </Label>
>>>>>>> 007f0d62ac1b0dd8eb82cc02bb2574278d223083
          <Input
            id="playerCount"
            type="number"
            v-model.number="playerCount"
            placeholder="2-6 players"
            min="2"
            max="6"
            class="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

<<<<<<< HEAD
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
=======
        <div class="space-y-3">
          <Label class="text-sm font-medium text-slate-700">
            Game Privacy
          </Label>
          <div class="flex gap-3">
            <label 
              for="public" 
              class="flex flex-1 cursor-pointer items-center gap-2 rounded-lg border-2 p-3 transition-all"
              :class="picked === 'Public' 
                ? 'border-blue-500 bg-blue-50 shadow-md' 
                : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50'"
            >
              <input 
                type="radio" 
                id="public" 
                value="Public" 
                v-model="picked"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span class="text-sm font-medium text-slate-900">Public</span>
            </label>

            <label 
              for="private" 
              class="flex flex-1 cursor-pointer items-center gap-2 rounded-lg border-2 p-3 transition-all"
              :class="picked === 'Private' 
                ? 'border-blue-500 bg-blue-50 shadow-md' 
                : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50'"
            >
              <input 
                type="radio" 
                id="private" 
                value="Private" 
                v-model="picked"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span class="text-sm font-medium text-slate-900">Private</span>
            </label>
          </div>
        </div>

        <Button 
          class="w-full" 
          @click="startGame"
        >
        Begin The Investigation
>>>>>>> 007f0d62ac1b0dd8eb82cc02bb2574278d223083
        </Button>
      </CardContent>
    </Card>
  </div>
</template>