<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

const router = useRouter()

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  setTimeout(() => {
    loading.value = false
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const user = storedUsers.find((u: any) => u.username === username.value && u.password === password.value)

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      router.push('/home')
    } else {
      error.value = 'Invalid username or password'
    }
  }, 1000)
}
</script>

<template>
  <div
    class="flex flex-col h-screen w-screen items-center justify-center bg-[url('https://cdn-imgix.headout.com/media/images/f41bdd0b95a2fc1fa8aff71725ffe5e3-2963-london-evening-cruise-on-river-thames-04.JPG')] bg-cover bg-center bg-black/50 bg-blend-darken">
    <div class="flex justify-center items-center">
      <div class="bg-[url(./assets/image.webp)] bg-size-[360px] bg-no-repeat bg-center h-56 w-96">
      </div>
    </div>
    <Card class="w-[360px] shadow-lg">
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <Label for="username">Username</Label>
          <Input id="username" v-model="username" placeholder="Enter your username" autocomplete="username" />
        </div>

        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input id="password" v-model="password" type="password" placeholder="Enter your password"
            autocomplete="current-password" />
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </div>
      </CardContent>

      <CardFooter class="flex flex-col gap-3">
        <Button @click="handleLogin" :disabled="loading" class="w-full" variant="default">
          <span v-if="!loading">Log In</span>
          <span v-else>Loading...</span>
        </Button>

        <Button @click="router.push('/register')" class="w-full" variant="secondary">
          Create Account
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
