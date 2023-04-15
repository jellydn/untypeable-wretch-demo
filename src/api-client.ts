import { createTypeLevelClient, initUntypeable } from "untypeable";
import wretch from "wretch";

// Initialize untypeable
const u = initUntypeable();

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

// Create a router
const fetcherRouter = u.router({
  "/posts": u
    .input<{
      userId?: number;
    }>()
    .output<Post[]>(),
});

const BASE_URL = "https://jsonplaceholder.typicode.com";

const externalApi = wretch(BASE_URL, { mode: "cors" }).errorType("json");

// TODO: support mutations (POST, PUT, DELETE)
export const fetcher = createTypeLevelClient<typeof fetcherRouter>(
  async (path, input) => {
    const res = externalApi.get(`${path}?${new URLSearchParams(input)}`);
    return res.json();
  }
);
