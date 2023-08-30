import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"

function Items() {
  const [products, setProducts] = useState([])
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
      let response = await fetch('http://localhost:3000/api/items')
      let data = await response.json()
      setProducts(data.items)
      response = await fetch('http://localhost:3000/api/reviews')
      data = await response.json()
      setReviews(data.reviews)
      console.log(data.reviews)
    } catch (error) {
      console.error (error)
    }
  } 
  fetchProducts()
  }, []
  )

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
      <Row>
        {products.map((product) => { 
          
          return (
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
                    <Card.Link href="http://localhost:3000/items">View Item</Card.Link>
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