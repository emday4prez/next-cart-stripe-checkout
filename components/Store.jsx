import { Row, Col } from 'react-bootstrap';
import { productsArray } from '../data/products';
import ProductCard from '../components/ProductCard';

function Store() {
  return (
    <>
      <h2 align="center" className="p-3">
        welcome to our online store
      </h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {productsArray.map((product, idx) => (
          <Col align="center" key={idx}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Store;
