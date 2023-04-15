import "./PostList.css";
import type { Post } from "./api-client";

function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.id} className="post-item">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-body">{post.body}</p>
          <p className="post-author">Author: User #{post.userId}</p>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
