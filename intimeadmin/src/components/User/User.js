import React from "react";

function User({ user }) {
  return (
    <div>
      <h2>{user.username}</h2>
      <h3>{user.email}</h3>
    </div>
  );
}

export default User;
