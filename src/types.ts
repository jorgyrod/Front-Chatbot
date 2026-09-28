export type Source = {
  doucmentId: string;
  documentName: string;
  chunkIndex: number;
  distance: number;
};

export type Message = {
  author: "user" | "assistant";
  text: string;
  sources?: Source[];
  searchLikely?: string;
};

export type ChatResponse = {
  answer: string;
  sources?: Source[];
  searchedFor: string;
};

export type Turn = { role: "user" | "assistant"; content: string };
