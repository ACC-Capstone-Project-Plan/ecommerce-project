import React from "react";

function Profile({ user }) {
  return (
    <div className="center-container">
      <div className="profile-content">
        <h1>Welcome, {user.name.firstname}!</h1>
        <p>Username: {user.username}</p>
        <p>
          Name: {user.name.firstname} {user.name.lastname}
        </p>
        <p>Phone: {user.phone}</p>
        <p>
          Address: {user.address.city}, {user.address.street},{" "}
          {user.address.number}
        </p>
        <p>Zipcode: {user.address.zipcode}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
}

export default Profile;
