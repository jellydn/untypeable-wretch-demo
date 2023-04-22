import {
  createSafeClient,
  createTypeLevelClient,
  initUntypeable,
} from "untypeable";
import wretch from "wretch";
import { z } from "zod";

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

const mutationRouter = u.router({
  "/posts": u
    .input(
      z.object({
        title: z.string(),
        body: z.string(),
        userId: z.number(),
      })
    )
    .output(
      z.object({
        id: z.number(),
        title: z.string(),
        body: z.string(),
        userId: z.number(),
      })
    ),
});

const BASE_URL = "https://jsonplaceholder.typicode.com";

const externalApi = wretch(BASE_URL, { mode: "cors" }).errorType("json");

// TODO: support mutations (PUT, PATCH, DELETE), refer to https://github.com/total-typescript/untypeable#pusharg
export const fetcher = createTypeLevelClient<typeof fetcherRouter>(
  async (path, input) => {
    const res = externalApi.get(`${path}?${new URLSearchParams(input)}`);
    return res.json();
  }
);

export const mutation = createSafeClient(mutationRouter, async (path, body) => {
  const res = externalApi.url(path).post(body);
  return res.json();
});
