// components/Singleitem.jsx


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Reviews from './Reviews';  // Import the Reviews component
import Delete from './Delete';  // Import the Delete component

const Singleitem = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/items/${id}`);
        const data = await response.json();
        setProduct(data.item);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
      {product ? (
        <>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={product.imageurl} />
            <Card.Body>
              <Card.Title>{product.itemname}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
          </Card>
          <Reviews itemId={id} />  {/* Render the Reviews component under the item */}
          <Delete itemId={id} />  {/* Render the Delete component under the reviews */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Singleitem;
