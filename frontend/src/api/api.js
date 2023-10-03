const BASE_URL = 'https://ecommerce-acc-api.onrender.com/';

async function fetchProductList() {
  try {
    const response = await fetch(`${BASE_URL}/`);
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const data = await response.json();
    setProducts(data.data);
  } catch (error) {
    console.error("Error fetching product list:", error);
  }
}