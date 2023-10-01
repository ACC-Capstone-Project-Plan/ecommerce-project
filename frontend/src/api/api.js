const apiUrl = 'https://ecommerce-acc-api.onrender.com/';


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

