<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const router = useRouter()
const playerCount = ref<number | null>(null)
const picked = ref('Public')

const startGame = () => {
  if (!playerCount.value || playerCount.value < 2) {
    alert('Please enter a valid number of players (2 or more)')
    return
  }
  router.push(`/board/${playerCount.value}`)
}


</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center bg-muted">
    <Card class="w-[350px] shadow-lg">
      <CardHeader>
        <CardTitle class="text-center text-2xl font-bold">
          Lobby
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
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
        <Label for="playerCount">Game privacy</Label>

        <div class="space-y-2 flex gap-4">
          <div>
            <input type="radio" id="public" value="Public" v-model="picked"/>
            <label for="one">Public</label>            
          </div>

          <div>
            <input type="radio" id="private" value="Private" v-model="picked"/>
            <label for="two">Private</label>            
          </div>

        </div>
        <Button class="w-full" @click="startGame">
          Start Game
        </Button>
      </CardContent>
    </Card>
  </div>
</template>
