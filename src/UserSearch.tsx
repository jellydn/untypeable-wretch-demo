import React, { useState } from "react";

import "./UserSearch.css";

type UserSearchProps = {
  onSubmit: (userId: string) => void;
};

function UserSearch({ onSubmit }: UserSearchProps) {
  const [userId, setUserId] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(userId);
  };

  return (
    <form className="user-search-form" onSubmit={handleSubmit}>
      <label className="user-search-label">
        Filter By User ID:
        <input
          className="user-search-input"
          type="text"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}

export default UserSearch;
