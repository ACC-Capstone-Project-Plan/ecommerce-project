import React, { useState, useEffect } from "react";

function UserCart({ userId }) {
  const [userCart, setUserCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await fetch(`/my-cart/${userId}`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch user cart data: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        if (data.userCart) {
          setUserCart(data.userCart);
        } else {
          setUserCart(null);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user cart:", error.message);
        setLoading(false);
      }
    };

    fetchUserCart();
  }, [userId]);

  return (
    <div>
      <h2>Your Cart</h2>
      {loading && <p>Loading...</p>}
      {!loading && userCart && userCart.products ? (
        <div>
          <h3>Cart Date: {userCart.date}</h3>
          <ul>
            {userCart.products.map((cartItem) => (
              <li key={cartItem.productId}>
                Product ID: {cartItem.productId}, Quantity: {cartItem.quantity}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No cart items found.</p>
      )}
    </div>
  );
}

export default UserCart;
