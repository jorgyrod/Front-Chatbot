import type { ChatResponse } from "../types";
import type { Turn } from "../types";
const API_URL = import.meta.env.VITE_API_URL;

export async function asking(
  userId: string,
  message: string,
  history: Turn[] = [],
): Promise<ChatResponse> {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, message, history }),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(data?.error || "Failed to fetch response from API");
  }

  return (await response.json()) as ChatResponse;
}
