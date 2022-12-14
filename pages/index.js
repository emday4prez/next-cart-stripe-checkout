import Head from 'next/head';
import NavbarComponent from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Store from '../components/Store';
import CartContextProvider from '../context/CartContext';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CartContextProvider>
          <Container>
            <NavbarComponent />
            <Store />
          </Container>
        </CartContextProvider>
      </main>
    </div>
  );
}
