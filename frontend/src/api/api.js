const apiUrl = 'https://ecommerce-acc-api.onrender.com/';

async function login(loginData) {
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error(`Login failed with status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, user: data }; // Assuming your server returns user data
  } catch (error) {
    return { success: false, error: 'An error occurred during login.' };
  }
}

async function fetchProductList() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    displayProductList(data);
  } catch (error) {
    console.error('Error fetching product list:', error);
  }
}

function displayProductList(products) {
  // Implement the logic to display product data here
}

export { login, fetchProductList };
