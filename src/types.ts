export type Source = {
  doucmentId: string;
  documentName: string;
  chunkIndex: number;
  distance: number;
};

export type Message = {
  author: "user" | "bot";
  text: string;
  sources?: Source[];
  searchWith?: string;
};

export type ChatResponse = {
  answer: string;
  sources?: Source[];
};
