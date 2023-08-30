
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';

function Items() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/items');
        const data = await response.json();
        setProducts(data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <Row className="row-spacing">
        {products.map((product) => { 
          return (
            <Col key={product.id} md={3}>
              <Card className="equal-card item-card" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product.imageurl} />
                <Card.Body>
                  <Card.Title>{product.itemname}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>{product.price}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Link to={`/items/${product.id}`} className="card-link">View Item</Link>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  );
}

export default Items;
