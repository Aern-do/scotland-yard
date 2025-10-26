<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useRouter } from 'vue-router'
import Navigation from '@/components/Navigation.vue'

const router = useRouter()


const goToLobby = () => navigateTo('/lobby')
const goToPublic = () => navigateTo('/public-game')

const navigateTo = (route) => {
  router.push(route);
};

</script>

<template>
  <Navigation />

  <div class="flex h-screen items-center justify-center bg-muted">
    <Card class="w-[350px] shadow-lg">
      <CardHeader>
        <CardTitle class="text-center text-2xl font-bold">
          Scotland Yard
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex flex-col gap-3">
          <Button 
            @click="goToLobby" 
            class="w-full py-6 shadow-xl" 
            variant="default"
          >
            Create Lobby
          </Button>
          <Button @click="goToPublic" class="w-full" variant="secondary">
            Join Lobby
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>