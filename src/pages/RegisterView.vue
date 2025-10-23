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
const confirmPassword = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

const handleRegister = () => {
  error.value = ''
  success.value = ''
  loading.value = true

  setTimeout(() => {
    loading.value = false

    if (!username.value || !password.value) {
      error.value = 'Please fill in all fields'
      return
    }

    if (password.value !== confirmPassword.value) {
      error.value = 'Passwords do not match'
      return
    }

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const userExists = existingUsers.some((u: any) => u.username === username.value)

    if (userExists) {
      error.value = 'Username already exists'
      return
    }

    existingUsers.push({
      username: username.value,
      password: password.value
    })
    localStorage.setItem('users', JSON.stringify(existingUsers))

    success.value = 'Account created successfully!'
    setTimeout(() => router.push('/'), 1500)
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
          <Input
            id="username"
            v-model="username"
            placeholder="Enter a username"
            autocomplete="username"
          />
        </div>

        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter a password"
            autocomplete="new-password"
          />
        </div>

        <div class="space-y-2">
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            autocomplete="new-password"
          />
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </div>
        <div v-if="success" class="text-green-500 text-sm text-center">
          {{ success }}
        </div>
      </CardContent>

      <CardFooter class="flex flex-col gap-3">
        <Button @click="handleRegister" :disabled="loading" class="w-full" variant="default">
          <span v-if="!loading">Register</span>
          <span v-else>Loading...</span>
        </Button>

        <Button @click="router.push('/')" class="w-full" variant="secondary">
          Back to Login
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>