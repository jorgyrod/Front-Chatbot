<template>
  <form class="chat-input-form" @submit.prevent="send">
    <input
      v-model="value"
      type="text"
      placeholder="Escribe tu pregunta sobre fideicomisos..."
      :disabled="isLoading"
      autofocus
    />
    <button type="submit">{{ isLoading ? "..." : "Enviar" }}</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isLoading = ref(false);
const value = ref("");

const props = defineProps<{
  isLoading: boolean;
}>();

const emit = defineEmits<{
  send: [value: string];
}>();

function send() {
  const cleaner = value.value.trim();
  if (cleaner == "" || props.isLoading) return;
  emit("send", cleaner);
  value.value = "";
}
</script>

<style scoped>
.chat-input-form {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid #e2e2e2;
  background: #ffffff;
}

input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
}

input:focus {
  outline: 2px solid #2563eb;
  outline-offset: -1px;
}

input:disabled {
  background: #f5f5f5;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}
</style>
