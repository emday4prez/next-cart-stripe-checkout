import Button from 'react-bootstrap/Button';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import { getProductData } from '../data/products';

function CartProduct(props) {
  const cart = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;
  const productData = getProductData(id);

  return (
    <>
      <h3>{productData.title}</h3>
      <p>{quantity} total items</p>
      <p>${(quantity * productData.price).toFixed(2)}</p>
      <Button size="sm" onClick={() => cart.deleteFromCart(id)}>
        remove
      </Button>
      <hr />
    </>
  );
}

export default CartProduct;
