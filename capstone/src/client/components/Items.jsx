import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"

function Items() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
      const response = await fetch('http://localhost:3000/api/items')
      console.log(response)
      const data = await response.json()
      setProducts(data.items)
      console.log(data.items)
    } catch (error) {
      console.error (error)
    }
  } 
  fetchProducts()
  }, []
  )


  return (
    <Container>
      <Row>
        {products.map((product) => { 
          return (
            <Col>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={product.imageurl} />
                  <Card.Body>
                    <Card.Title>{product.itemname}</Card.Title>
                    <Card.Text>
                      {product.description}
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>***</ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Card.Link href="#">Single Item View</Card.Link>
                  </Card.Body>
                </Card>
            </Col>
          )
          } 
          )}
        </Row> 
    </Container>
    );
}

export default Items;