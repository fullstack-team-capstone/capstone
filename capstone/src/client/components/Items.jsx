// components/Items.jsx

import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

function Items() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await fetch('http://localhost:3000/api/items');
        let data = await response.json();
        setProducts(data.items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    filterItemsAndDescriptions();
  }, [searchQuery, products]);

  const filterItemsAndDescriptions = () => {
    if (products.length === 0) {
      return;
    }
    const query = searchQuery.toLowerCase();
    const filteredProd = products.filter(product => 
      (product.itemname && product.itemname.toLowerCase().includes(query)) ||
      (product.description && product.description.toLowerCase().includes(query))
    );
    setFilteredProducts(filteredProd);
  };

  return (
    <Container>
      <input 
        type="text" 
        placeholder="Search by item name or description..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
      {searchQuery && (
        <div className="search-dropdown">
          {filteredProducts.map((product, index) => (
            <div key={index}>
              <Link to={`/items/${product.id}`}><p>{product.itemname}</p></Link>
            </div>
          ))}
        </div>
      )}
      <Row className="row-spacing">
        {products.map((product) => (
          <Col key={product.id}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={product.imageurl} />
              <Card.Body>
                <Card.Title>{product.itemname}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>{/* Your rating function here */}</ListGroup.Item> 
              </ListGroup>
              <Card.Body>
              <Link to={`/items/${product.id}`} className="card-link">View Item</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Items;
