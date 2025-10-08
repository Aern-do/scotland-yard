<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

const router = useRouter()

async function register() {
  error.value = ''
  success.value = false

  // Validation
  if (!username.value || !password.value || !confirmPassword.value) {
    error.value = 'All fields are required.'
    return
  }

  if (username.value.length < 3) {
    error.value = 'Username must be at least 3 characters.'
    return
  }

  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters.'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }

  loading.value = true

  try {
    const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value.trim(),
        password: password.value,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Registration failed')
    }

    success.value = true
    
    // Store user data
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.user.token)

    console.log('✅ Registration successful:', data.user.username)
    
    setTimeout(() => router.push('/lobby'), 1200)
  } catch (err) {
    // @ts-ignore
    error.value = err.message || 'Something went wrong. Please try again.'
    console.error('❌ Registration error:', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center bg-[#0b1120] text-white">
    <div
      class="w-[380px] rounded-2xl bg-[#111a2b]/90 border border-[#1e2a44] p-8 shadow-2xl backdrop-blur-md"
    >
      <h1 class="text-center text-3xl font-extrabold text-blue-400 mb-8">Register</h1>

      <div class="space-y-5">
        <div>
          <Label for="username" class="text-slate-300 mb-1 block text-sm font-medium">Username</Label>
          <Input
            id="username"
            v-model="username"
            placeholder="your_username"
            class="w-full bg-[#1a2336] border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-2 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>

        <div>
          <Label for="password" class="text-slate-300 mb-1 block text-sm font-medium">Password</Label>
          <Input
            id="password"
            type="password"
            v-model="password"
            placeholder="••••••••"
            class="w-full bg-[#1a2336] border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-2 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>

        <div>
          <Label for="confirmPassword" class="text-slate-300 mb-1 block text-sm font-medium">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
            placeholder="••••••••"
            class="w-full bg-[#1a2336] border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-2 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>

        <Button
          class="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2.5 rounded-lg transition-all mt-4 shadow-lg"
          :disabled="loading"
          @click="register"
        >
          <span v-if="!loading">Sign Up</span>
          <span v-else>Registering...</span>
        </Button>

        <div v-if="error" class="text-red-400 text-sm text-center mt-3">
          {{ error }}
        </div>
        <div v-if="success" class="text-green-400 text-sm text-center mt-3">
          Registration successful! Redirecting...
        </div>

        <p class="text-center text-sm text-slate-400 mt-6">
          Already have an account?
          <RouterLink to="/login" class="text-blue-400 hover:underline">Log in</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #0b1120;
  font-family: 'Inter', sans-serif;
}
</style>