
import { useEffect, useState } from "react";

import "../styles/Github.css";

// GitHub data that we need
const fields = [
  "avatar_url",
  "name",
  "login",
  "bio",
  "followers",
  "following",
  "public_repos",
  "html_url",
];

// In-memory cache
let githubCache = null;

function Github() {
  // If cache already exists, use it as the initial state
  const [user, setUser] = useState(githubCache);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(
        "https://api.github.com/users/MAbdullah016"
      );

      const data = await response.json();

      // Create an object containing only the fields we need
      const selectedUser = {};

      fields.forEach((field) => {
        selectedUser[field] = data[field];
      });

      // Save only selected data in cache
      githubCache = selectedUser;

      // Save selected data in React state
      setUser(selectedUser);
    }

    // Only call API if cache doesn't exist
    if (!githubCache) {
      fetchUser();
    }
  }, []);

  console.log(user?.login);

  return (
    <div className="github-page">
      <h1>My GitHub Profile</h1>

      {user && (
        <div className="github-card">

          <img
            src={user.avatar_url}
            alt="GitHub Profile"
            width="120"
          />

          <h2>{user.name}</h2>

          <p>Username: {user.login}</p>

          <p>Bio: {user.bio}</p>

          <p>Followers: {user.followers}</p>

          <p>Following: {user.following}</p>

          <p>Public Repositories: {user.public_repos}</p>

          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit My GitHub
          </a>

        </div>
      )}
    </div>
  );
}

export default Github;

