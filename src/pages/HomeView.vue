<script setup lang="ts">
import { ref } from "vue";
import { useQuery, useMutation } from "@tanstack/vue-query";
import { useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const API_BASE = "http://localhost:3000";

const fetchWithAuth = (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
};

useQuery({
  queryKey: ["me"],
  queryFn: async () => {
    const res = await fetchWithAuth(`${API_BASE}/me`);
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
  },
});

const { data: publicGames, refetch: refetchGames } = useQuery({
  queryKey: ["publicGames"],
  queryFn: async () => {
    const res = await fetchWithAuth(`${API_BASE}/game/public`);
    if (!res.ok) throw new Error("Failed to fetch games");
    return res.json();
  },
});

const activeGame = ref<any | null>(null);

const createGameSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  isPublic: z.boolean(),
});

const {
  handleSubmit: handleCreateSubmit,
  errors: createErrors,
  defineField: defineCreateField,
  resetForm: resetCreateForm,
} = useForm({
  validationSchema: toTypedSchema(createGameSchema),
});

const [createName, createNameAttrs] = defineCreateField("name");
const [createIsPublic, createIsPublicAttrs] = defineCreateField("isPublic");

const { mutateAsync: createGame, isPending: isCreating } = useMutation({
  mutationKey: ["createGame"],
  mutationFn: async (data: { name: string; isPublic: boolean }) => {
    const res = await fetchWithAuth(`${API_BASE}/game/create`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to create game");
    }
    return res.json();
  },
  onSuccess: (res) => {
    activeGame.value = res.game;
    resetCreateForm();
  },
});

const joinSchema = z.object({
  inviteCode: z.string().min(3, "Invite code required"),
});

const {
  handleSubmit: handleJoinSubmit,
  errors: joinErrors,
  defineField: defineJoinField,
  resetForm: resetJoinForm,
} = useForm({
  validationSchema: toTypedSchema(joinSchema),
});

const [inviteCode, inviteCodeAttrs] = defineJoinField("inviteCode");

const { mutateAsync: joinPrivate, isPending: isJoining } = useMutation({
  mutationKey: ["joinPrivate"],
  mutationFn: async (data: { inviteCode: string }) => {
    const res = await fetchWithAuth(`${API_BASE}/game/join`, {
      method: "POST",
      body: JSON.stringify({ gameId: 0, inviteCode: data.inviteCode }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Invalid code");
    }
    return res.json();
  },
  onSuccess: (res) => {
    activeGame.value = res.game;
    resetJoinForm();
  },
});

const { mutateAsync: joinPublic, isPending: isJoiningPublic } = useMutation({
  mutationKey: ["joinPublic"],
  mutationFn: async (gameId: number) => {
    const res = await fetchWithAuth(`${API_BASE}/game/join`, {
      method: "POST",
      body: JSON.stringify({ gameId }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to join game");
    }
    return res.json();
  },
  onSuccess: (res) => {
    activeGame.value = res.game;
  },
});

const onCreate = handleCreateSubmit(async (values) => {
  await createGame(values);
});

const onJoinPrivate = handleJoinSubmit(async (values) => {
  await joinPrivate(values);
});

const tab = ref("create");

const leaveGame = () => {
  activeGame.value = null;
  refetchGames();
};

const startGame = () => {};
</script>

<template>
  <div
    class="flex min-h-screen w-full flex-col items-center justify-center bg-black/50 bg-[url('https://cdn-imgix.headout.com/media/images/f41bdd0b95a2fc1fa8aff71725ffe5e3-2963-london-evening-cruise-on-river-thames-04.JPG')] bg-cover bg-center p-4 bg-blend-darken"
  >
    <div class="mb-4 flex items-center justify-center">
      <div
        class="h-40 w-72 bg-[url(./assets/image.webp)] bg-contain bg-center bg-no-repeat sm:h-48 sm:w-96"
      ></div>
    </div>

    <Card
      v-if="activeGame"
      class="w-full max-w-sm rounded-lg bg-white/90 shadow-lg backdrop-blur-md sm:w-[420px]"
    >
      <CardHeader>
        <CardTitle class="text-center text-2xl font-bold">
          {{ activeGame.name }}
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-2 text-center text-base">
        <p><strong>Host:</strong> {{ activeGame.host?.username }}</p>
        <p>
          <strong>Visibility:</strong>
          {{ activeGame.isPublic ? "Public" : "Private" }}
        </p>
        <p v-if="!activeGame.isPublic">
          <strong>Invite Code:</strong> {{ activeGame.inviteCode }}
        </p>
      </CardContent>
      <CardFooter class="flex flex-col gap-3 p-6 pt-0">
        <Button variant="default" class="w-full" @click="startGame">
          Start Game
        </Button>
        <Button variant="secondary" class="w-full" @click="leaveGame">
          Leave Game
        </Button>
      </CardFooter>
    </Card>

    <Card
      v-else
      class="w-full max-w-md rounded-lg bg-white/90 shadow-lg backdrop-blur-md sm:w-[480px]"
    >
      <CardContent class="p-6">
        <Tabs v-model="tab">
          <TabsList class="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="create">Create Game</TabsTrigger>
            <TabsTrigger value="join">Join Private Game</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <form @submit.prevent="onCreate" class="space-y-4">
              <div>
                <Label for="name">Game Name</Label>
                <Input
                  id="name"
                  v-model="createName"
                  v-bind="createNameAttrs"
                  placeholder="Enter game name"
                />
                <p v-if="createErrors.name" class="text-sm text-red-500">
                  {{ createErrors.name }}
                </p>
              </div>

              <div class="flex items-center gap-2">
                <input
                  id="isPublic"
                  type="checkbox"
                  v-model="createIsPublic"
                  v-bind="createIsPublicAttrs"
                  class="h-4 w-4"
                />
                <Label for="isPublic">Public Game</Label>
              </div>

              <Button
                type="submit"
                class="w-full"
                :disabled="isCreating"
                variant="default"
              >
                <span v-if="isCreating">Creating...</span>
                <span v-else>Create Game</span>
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="join">
            <form @submit.prevent="onJoinPrivate" class="space-y-4">
              <div>
                <Label for="inviteCode">Invite Code</Label>
                <Input
                  id="inviteCode"
                  v-model="inviteCode"
                  v-bind="inviteCodeAttrs"
                  placeholder="Enter invite code"
                />
                <p v-if="joinErrors.inviteCode" class="text-sm text-red-500">
                  {{ joinErrors.inviteCode }}
                </p>
              </div>
              <Button
                type="submit"
                class="w-full"
                :disabled="isJoining"
                variant="default"
              >
                <span v-if="isJoining">Joining...</span>
                <span v-else>Join Private Game</span>
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div class="mt-6">
          <h3 class="mb-2 text-lg font-semibold">Public Games</h3>
          <div
            v-if="publicGames?.length"
            class="max-h-48 space-y-2 overflow-y-auto"
          >
            <div
              v-for="g in publicGames"
              :key="g.id"
              class="flex items-center justify-between rounded bg-gray-100 p-2"
            >
              <div>
                <span class="font-medium">{{ g.name }}</span>
                <span class="ml-1 text-xs text-gray-500"
                  >by {{ g.host?.username }}</span
                >
              </div>
              <Button
                variant="secondary"
                size="sm"
                @click="joinPublic(g.id)"
                :disabled="isJoiningPublic"
              >
                Join
              </Button>
            </div>
          </div>
          <p v-else class="text-sm text-gray-500">No public games available.</p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
