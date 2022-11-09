import { createContext, useState } from 'react';
import { productsArray, getProductData } from '../data/products';

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  function getProductQuantity(id) {
    let quantity = cartProducts.find((product) => product.id === id)?.quantity;
    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  }

  function addOneToCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      setCartProducts([...cartProducts, { id: id, quantity: 1 }]);
    } else {
      setCartProducts(
        cartProducts.map((product) => {
          console.log('product quantity', product.quantity);
          return product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product;
        })
      );
    }
  }

  function deleteFromCart(id) {
    setCartProducts(cartProducts.filter((product) => product.id !== id));
  }

  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function getTotalCost() {
    let totalCost = 0;
    cartProducts.map((cartItem) => {
      let productData = getProductData(cartItem.id);
      totalCost += productData.price * cartItem.quantity;
    });
    return totalCost;
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartContextProvider;
