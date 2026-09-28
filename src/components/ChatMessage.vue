<template>
  <div class="message" :class="message.author">
    <div class="burble">
      <p class="text">{{ message.text }}</p>

      <div v-if="message.sources && message.sources.length > 0" class="sources">
        <span class="sources-title">Fuentes:</span>
        <span
          class="source"
          v-for="source in message.sources"
          :key="source.doucmentId + source.chunkIndex"
        >
          {{ source.documentName }} (Chunk: {{ source.chunkIndex }}, Distance:
          <em>{{ source.distance }}</em
          >)
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from "../types";

defineProps<{
  message: Message;
}>();
</script>

<style scoped>
.message {
  display: flex;
  margin-bottom: 14px;
}

.message.user {
  justify-content: flex-end;
}

.burble {
  max-width: 75%;
  padding: 10px 14px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #e2e2e2;
}

.message.user .burble {
  background: #2563eb;
  border-color: #2563eb;
  color: #ffffff;
}

.text {
  margin: 0;
  white-space: pre-wrap;
  line-height: 1.5;
}

.sources {
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid #ececec;
  font-size: 12px;
  color: #666;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.sources-title {
  font-weight: 600;
}

.source {
  background: #f3f4f6;
  border-radius: 6px;
  padding: 2px 6px;
}
</style>
