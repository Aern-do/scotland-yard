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
        </Button>
      </CardContent>
    </Card>
  </div>
</template>