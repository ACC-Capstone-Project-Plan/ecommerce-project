import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = ({ user, onLogout }) => {
  const { userId } = useParams(); // Retrieve the userId from the URL
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://ecommerce-acc-api.onrender.com/user/${userId}`
        );

        if (response.ok) {
          const userData = await response.json();
          setUserInfo(userData.data);
        } else {
          // Handle error if user data retrieval fails
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        // Handle network or other errors
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="center-container">
      <div className="profile-content">
        {userInfo ? (
          <>
            <h1>Welcome, {userInfo.name.firstname}!</h1>
            <p>Username: {userInfo.username}</p>
            <p>
              Name: {userInfo.name.firstname} {userInfo.name.lastname}
            </p>
            <p>Phone: {userInfo.phone}</p>
            <p>
              Address: {userInfo.address.city}, {userInfo.address.street},{" "}
              {userInfo.address.number}
            </p>
            <p>Zipcode: {userInfo.address.zipcode}</p>
            <p>Email: {userInfo.email}</p>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
