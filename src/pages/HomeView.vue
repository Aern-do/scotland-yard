<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useRouter } from 'vue-router'


const router = useRouter()
const goToTest = () => navigateTo('/test-1')

const navigateTo = (route) => {
  router.push(route);
};

const username = ref('')
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center bg-muted">
    <Card class="w-[350px] shadow-lg">
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
            placeholder="Enter your name"
          />
        </div>

        <div class="flex flex-col gap-3">
          <Button @click="goToTest" class="w-full" variant="default">
            Create Lobby
          </Button>
          <Button class="w-full" variant="secondary">
            Join Lobby
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>