//prime suspect api id price_1LzPobFL077YjrVlWJkQlFnD
//grid search api id price_1LzPqNFL077YjrVlv6VIyWoF
//hit man glide api id price_1LzPsJFL077YjrVlO60STjzV

const productsArray = [
  { id: 'price_1LzPsJFL077YjrVlO60STjzV', title: 'Hit Man Glide', price: 75 },
  { id: 'price_1LzPqNFL077YjrVlv6VIyWoF', title: 'Grid Search', price: 100 },
  { id: 'price_1LzPobFL077YjrVlWJkQlFnD', title: 'Prime Suspect', price: 75 },
];

function getProductData(id) {
  let productData = productsArray.find((product) => product.id === id);
  if (productData === undefined) {
    console.error('Product not found -- product.js');
    return undefined;
  }
  return productData;
}

export { productsArray, getProductData };
