import { Button, Container, Navbar, Modal } from 'react-bootstrap';
import Link from 'next/link';
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartProduct from './CartProduct';

function NavbarComponent() {
  const cart = useContext(CartContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const checkout = async () => {
    console.log('cart items at checkout', cart.items);
    const data = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cart.items }),
    });

    const json = await data.json();

    if (json.url) {
      // forwards to stripe checkout
      window.location.assign(json.url);
    } else {
      console.log('There was an error creating the checkout session');
    }
  };
  return (
    <>
      <Navbar expand="sm">
        <Link href="/">
          <Navbar.Brand>Perko Lures</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Cart ({productsCount} items)</Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              <p>Items in your cart:</p>
              {cart.items.map((currentProduct, idx) => (
                <CartProduct
                  id={currentProduct.id}
                  quantity={currentProduct.quantity}
                  key={idx}
                ></CartProduct>
              ))}
              <h1>Total: ${cart.getTotalCost().toFixed(2)}</h1>
              <Button variant="success" onClick={checkout}>
                Purchase Items
              </Button>
            </>
          ) : (
            <h2>there are no items in your cart!</h2>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarComponent;
