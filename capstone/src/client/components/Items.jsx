// components/Items.jsx

import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

function Items({user}) {
  console.log('is the user here??', user)
  const [products, setProducts] = useState([])
  const [reviews, setReviews] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await fetch('http://localhost:3000/api/items');
        let data = await response.json();
        setProducts(data.items);
        response = await fetch('http://localhost:3000/api/reviews')
        data = await response.json()
        setReviews(data.reviews)
        console.log(data.reviews)
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

  const getReviewsByReviewableId = (reviewableId) => {
    try {
      const reviewsForItem = reviews.filter(review => review.reviewableid === reviewableId)
      console.log('filtered reviews for item', reviewsForItem)
      return reviewsForItem

    } catch (error) {
      console.error (error)
    }
  }

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return "Be the first to review"
    const total = reviews.reduce ((sum, review) => sum + review.stars, 0)
    const average = Math.round(total/reviews.length) 
    console.log('Average', average)
    return '\u2B50'.repeat(average)
  }

  const fetchCalculate = (id) => {
    const reviews = getReviewsByReviewableId(id)
    const averageRating = calculateAverageRating(reviews)
    console.log("Type of average rating:", typeof averageRating)
    console.log(averageRating)
    return averageRating
  }

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
                <ListGroup.Item>{fetchCalculate(product.id)}</ListGroup.Item> 
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
