<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'

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
    if (username.value === 'admin' && password.value === '1234') {
      router.push('/test-1')
    } else {
      error.value = 'Invalid username or password'
    }
  }, 1000)
}
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center bg-muted">
    <Card class="w-[360px] shadow-lg">
      <CardHeader>
        <CardTitle class="text-center text-2xl font-bold">
          Scotland Yard
        </CardTitle>
      </CardHeader>

      <CardContent class="space-y-4">
        <div class="space-y-2">
          <Label for="username">Username</Label>
          <Input
            id="username"
            v-model="username"
            placeholder="Enter your username"
            autocomplete="username"
          />
        </div>

        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            autocomplete="current-password"
          />
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
