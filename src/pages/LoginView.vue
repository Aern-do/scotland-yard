<script setup lang="ts">
import { useRouter } from "vue-router";
import { useMutation } from "@tanstack/vue-query";
import { useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { ref, watch } from "vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const router = useRouter();

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const { handleSubmit, errors, isSubmitting, resetForm, defineField } = useForm({
  validationSchema: toTypedSchema(loginSchema),
});

const [username, usernameAttrs] = defineField("username");
const [password, passwordAttrs] = defineField("password");

const { isPending, mutateAsync } = useMutation({
  mutationKey: ["login"],
  mutationFn: async (data: { username: string; password: string }) => {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Invalid credentials");
    }

    return res.json();
  },
  onSuccess: (data) => {
    localStorage.setItem("token", data.token);
    router.push("/home");
  },
});

watch(isPending, (n, o) => console.log(`Z: ${n} ${o}`))

const errorMessage = ref<string | null>(null);

const onSubmit = handleSubmit(async (values) => {
  errorMessage.value = null;
  try {
    await mutateAsync(values);
    resetForm();
  } catch (err: any) {
    errorMessage.value = err.message;
  }
});
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
      class="w-full max-w-sm rounded-lg bg-white/90 shadow-lg backdrop-blur-md sm:w-[360px]"
    >
      <CardContent class="space-y-4 p-6">
        <div class="space-y-2">
          <Label for="username">Username</Label>
          <Input
            id="username"
            v-model="username"
            v-bind="usernameAttrs"
            placeholder="Enter your username"
            autocomplete="username"
          />
          <p v-if="errors.username" class="text-sm text-red-500">
            {{ errors.username }}
          </p>
        </div>

        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            v-model="password"
            v-bind="passwordAttrs"
            type="password"
            placeholder="Enter your password"
            autocomplete="current-password"
          />
          <p v-if="errors.password" class="text-sm text-red-500">
            {{ errors.password }}
          </p>
        </div>

        <div v-if="errorMessage" class="text-center text-sm text-red-600">
          {{ errorMessage }}
        </div>
      </CardContent>

      <CardFooter class="flex flex-col gap-3 p-6 pt-0">
        <Button
          @click="onSubmit"
          :disabled="isSubmitting || isPending"
          class="w-full"
          variant="default"
        >
          <span v-if="isPending">Loading...</span>
          <span v-else>Log In</span>
        </Button>

        <Button
          @click="router.push('/register')"
          class="w-full"
          variant="secondary"
        >
          Create Account
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
