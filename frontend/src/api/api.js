const apiUrl = 'https://ecommerce-acc-api.onrender.com';

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
}

fetchProductList();


async function login(username, password) {
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`Login failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}


export { login };