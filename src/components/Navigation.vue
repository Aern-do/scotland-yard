<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'

const router = useRouter()
const username = ref('')

onMounted(() => {
  const storedUser = localStorage.getItem('currentUser')
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser)
      username.value = typeof parsed === 'string' ? parsed : parsed.username || ''
    } catch {
      username.value = storedUser
    }
  } else {
    router.push('/')
  }
})

const goBack = () => {
  router.back()
}

const logout = () => {
  localStorage.removeItem('currentUser')
  router.replace('/')
}
</script>

<template>
  <nav class="flex items-center justify-between bg-gray-200 p-3 shadow-md">
    <Button variant="outline" size="sm" @click="goBack">
      Back
    </Button>

    <div class="text-sm font-medium text-foreground">
      Logged in as: <span class="font-semibold">{{ username }}</span>
    </div>

    <Button variant="destructive" size="sm" @click="logout">
      Logout
    </Button>
  </nav>
</template>

