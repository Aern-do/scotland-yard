<script setup lang="ts">
import { Button } from '@/components/ui/button'
<<<<<<< HEAD
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
=======
import { Card, CardContent } from '@/components/ui/card'
>>>>>>> 007f0d62ac1b0dd8eb82cc02bb2574278d223083
import { useRouter } from 'vue-router'
import Navigation from '@/components/Navigation.vue'

const router = useRouter()

<<<<<<< HEAD
=======
const logout = () => {
  localStorage.removeItem('currentUser')
  router.push('/')
}
>>>>>>> 007f0d62ac1b0dd8eb82cc02bb2574278d223083

const goToLobby = () => navigateTo('/lobby')
const goToPublic = () => navigateTo('/public-game')

const navigateTo = (route) => {
  router.push(route);
};
<<<<<<< HEAD

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
=======
</script>

<template>
  <div class="flex flex-col h-screen w-screen items-center justify-center bg-[url('https://cdn-imgix.headout.com/media/images/f41bdd0b95a2fc1fa8aff71725ffe5e3-2963-london-evening-cruise-on-river-thames-04.JPG')] bg-cover bg-center bg-black/50 bg-blend-darken">
    
    <div class="flex justify-center items-center">
      <div class="bg-[url(./assets/image.webp)] bg-size-[360px] bg-no-repeat bg-center h-56 w-96">
      </div>
    </div>

    <Card class="relative w-[420px] border-2 border-slate-200 bg-white/95 backdrop-blur-sm shadow-2xl">
      
>>>>>>> 007f0d62ac1b0dd8eb82cc02bb2574278d223083
      <CardContent class="space-y-4">
        <div class="flex flex-col gap-3">
          <Button 
            @click="goToLobby" 
            class="w-full py-6 shadow-xl" 
            variant="default"
          >
            Create Lobby
          </Button>
<<<<<<< HEAD
          <Button @click="goToPublic" class="w-full" variant="secondary">
            Join Lobby
          </Button>
=======
          
          <Button 
            @click="goToLobby" 
            class="w-full py-6 shadow-xl" 
            variant="secondary"
          >
            Join Lobby
          </Button>
          
          <Button 
            @click="logout" 
            class="w-full py-6 shadow-xl" 
            variant="destructive"
          >
          Logout
          </Button>
>>>>>>> 007f0d62ac1b0dd8eb82cc02bb2574278d223083
        </div>
      </CardContent>
    </Card>
  </div>
</template>