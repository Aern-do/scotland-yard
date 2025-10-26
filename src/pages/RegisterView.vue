<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMutation } from "@tanstack/vue-query";
import { useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const router = useRouter();

const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password confirmation required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const {
  handleSubmit,
  errors,
  isSubmitting,
  resetForm,
  defineField,
} = useForm({
  validationSchema: toTypedSchema(registerSchema),
});

const [username, usernameAttrs] = defineField("username");
const [password, passwordAttrs] = defineField("password");
const [confirmPassword, confirmPasswordAttrs] = defineField("confirmPassword");

const { isPending, mutateAsync } = useMutation({
  mutationKey: ["register"],
  mutationFn: async (data: { username: string; password: string }) => {
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Registration failed");
    }

    return res.json();
  },
  onSuccess: () => {
    router.push("/");
  },
});

const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);

const onSubmit = handleSubmit(async (values) => {
  errorMessage.value = null;
  successMessage.value = null;

  try {
    await mutateAsync({
      username: values.username,
      password: values.password,
    });
    successMessage.value = "Account created successfully!";
    resetForm();

    setTimeout(() => router.push("/"), 500);
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
            placeholder="Choose a username"
            autocomplete="username"
          />
          <p v-if="errors.username" class="text-red-500 text-sm">
            {{ errors.username }}
          </p>
        </div>

        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            v-model="password"
            v-bind="passwordAttrs"
            placeholder="Create a password"
            autocomplete="new-password"
          />
          <p v-if="errors.password" class="text-red-500 text-sm">
            {{ errors.password }}
          </p>
        </div>

        <div class="space-y-2">
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
            v-bind="confirmPasswordAttrs"
            placeholder="Confirm your password"
            autocomplete="new-password"
          />
          <p v-if="errors.confirmPassword" class="text-red-500 text-sm">
            {{ errors.confirmPassword }}
          </p>
        </div>

        <div v-if="errorMessage" class="text-sm text-center text-red-600">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="text-sm text-center text-green-600">
          {{ successMessage }}
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
          <span v-else>Register</span>
        </Button>

        <Button
          @click="router.push('/')"
          class="w-full"
          variant="secondary"
        >
          Back to Login
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>