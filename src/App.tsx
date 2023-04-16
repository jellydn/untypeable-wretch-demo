import { signal } from "@preact/signals-react";
import { Toaster, toast } from "sonner";

import "./App.css";
import PostList from "./PostList";
import UserSearch from "./UserSearch";
import { Post } from "./api-client";
import { fetcher, mutation } from "./api-client";

const posts = signal<Post[]>([]);

function App() {
  return (
    <div>
      <h1>Untypeable + Wretch</h1>
      <div className="card">
        <h2>Search Posts By User ID</h2>
        <button
          onClick={async () => {
            toast("Fetching posts...");
            const result = await fetcher("/posts");
            posts.value = result;
          }}
        >
          Fetch Posts
        </button>
        <button
          onClick={() => {
            mutation("/posts", {
              userId: Date.now(),
              title: `Test ${Date.now()}`,
              body: `New post`,
            })
              .then((result) => {
                posts.value = [...posts.value, result];
                toast("Post added");
              })
              .catch((error) => toast(error.message));
          }}
        >
          Add new post
        </button>
      </div>
      <div>
        <h2>Search Users By ID</h2>
        <UserSearch
          onSubmit={async (userId) => {
            toast("Fetching posts for user...");
            const result = await fetcher("/posts", {
              userId: userId ? parseInt(userId) : undefined,
            });
            posts.value = result;
          }}
        />
      </div>
      <h3>Posts</h3>

      <PostList posts={posts.value} />

      <hr />
      <div>
        <p>
          <a
            href="https://github.com/total-typescript/untypeable"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Untypeable
          </a>
          {" | "}
          <a
            href="https://github.com/elbywan/wretch"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Wretch
          </a>
        </p>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
