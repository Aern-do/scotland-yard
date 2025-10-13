<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'


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
          <Label for="username">Player count</Label>
          <Input
            id="Player count"
            placeholder="Enter player count"
          />
        </div>
      </CardContent>
    </Card>
  </div>
</template>
