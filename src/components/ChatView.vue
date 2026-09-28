<template>
  <div class="chat">
    <header>
      <h1>Chat consulta de documentos</h1>
      <label>
        Usuario:
        <select v-model="userId" :disabled="isLoading" @change="changeUser">
          <option value="USR001">USR001 (contrato + reglamento)</option>
          <option value="USR002">USR002 (otro contrato)</option>
          <option value="USR003">USR003 (sin documentos)</option>
        </select>
      </label>
    </header>

    <main class="conversation">
      <p v-if="messages.length === 0 && !isLoading" class="empty">
        Pregunta algo sobre tus documentos<br />
        Por ejemplo: «Que debo pagar si quiero retirarme de mi fideicomiso?»<br />
      </p>

      <ChatMessage
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
      />

      <div v-if="isLoading" class="loading">Consultando tus documentos...</div>

      <p v-if="error" class="error">{{ error }}</p>
    </main>

    <ChatInput @send="sendMessage" :is-loading="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Message } from "../types";
import { asking } from "../service/api";
import ChatMessage from "./ChatMessage.vue";
import ChatInput from "./ChatInput.vue";

const userId = ref("USR001");

const messages = ref<Message[]>([]);
const isLoading = ref(false);
const error = ref("");

async function sendMessage(text: string) {
  error.value = "";

  messages.value.push({
    author: "user",
    text,
  });

  isLoading.value = true;

  try {
    const response = await asking(userId.value, text);

    messages.value.push({
      author: "bot",
      text: response.answer,
      sources: response.sources || [],
    });
  } catch (err) {
    error.value = (err as Error).message;
  } finally {
    isLoading.value = false;
  }
}

function changeUser() {
  messages.value = [];
  userId.value = "";
}
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  background: #fafafa;
  border-left: 1px solid #e2e2e2;
  border-right: 1px solid #e2e2e2;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  background: #ffffff;
  border-bottom: 1px solid #e2e2e2;
}

h1 {
  margin: 0;
  font-size: 17px;
}

header label {
  font-size: 13px;
  color: #555;
}

select {
  margin-left: 6px;
  padding: 5px 8px;
  border: 1px solid #d4d4d4;
  border-radius: 6px;
  font-size: 13px;
  font-family: inherit;
}

.conversation {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.empty {
  color: #888;
  text-align: center;
  margin-top: 60px;
  line-height: 1.8;
}

.loading {
  color: #666;
  font-style: italic;
  padding: 8px 4px;
}

.error {
  color: #b91c1c;
  background: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 10px 12px;
}
</style>
