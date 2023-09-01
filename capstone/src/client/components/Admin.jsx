import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        itemName: '',
        imageUrl: '',
        description: '',
        isHighlighted: false
    });
    const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/users');
        setUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setIsLoading(false);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/items');
        setItems(response.data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchUsers();
    fetchItems();
  }, []);

  const addItem = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/admin/items', { fields: newItem });
      setItems([...items, response.data]);
      setNewItem({ itemname: '', description: '' });
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  const openModal = (index) => {
    setEditingIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingIndex(null);
    setShowModal(false);
  };

  const handleEditItem = async () => {
    try {
      const id = items[editingIndex].id;
      const response = await axios.put(`http://localhost:3000/api/admin/items/${id}`, { fields: items[editingIndex] });
      const updatedItems = [...items];
      updatedItems[editingIndex] = response.data;
      setItems(updatedItems);
      closeModal();
    } catch (err) {
      console.error('Error editing item:', err);
    }
  };

  const deleteItem = async (index) => {
    try {
      const id = items[index].id;
      await axios.delete(`http://localhost:3000/api/admin/items/${id}`);
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'Administrator' : 'User'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          <h2>Items Management</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemname}</td>
                  <td>{item.description}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(index)}>Edit</Button>
                    <Button variant="danger" onClick={() => deleteItem(index)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          <h3>Add New Item</h3>
<Form>
<Form.Group>
  <Form.Label>Item Name</Form.Label>
  <Form.Control type="text" placeholder="Enter item name" value={newItem.itemName} onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })} />
</Form.Group>
<Form.Group>
  <Form.Label>Description</Form.Label>
  <Form.Control type="text" placeholder="Enter description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
</Form.Group>
<Form.Group>
  <Form.Label>Image URL</Form.Label>
  <Form.Control type="text" placeholder="Enter image URL" value={newItem.imageUrl} onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })} />
</Form.Group>
  <Button variant="primary" type="button" onClick={addItem}>
    Add Item
  </Button>
</Form>

<Modal show={showModal} onHide={closeModal}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Item</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form.Group>
      <Form.Label>Item Name</Form.Label>
      <Form.Control
        type="text"
        value={editingIndex !== null ? items[editingIndex].itemname : ''}
        onChange={(e) => {
          let newItems = [...items];
          newItems[editingIndex].itemname = e.target.value;
          setItems(newItems);
        }}
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Description</Form.Label>
      <Form.Control
        type="text"
        value={editingIndex !== null ? items[editingIndex].description : ''}
        onChange={(e) => {
          let newItems = [...items];
          newItems[editingIndex].description = e.target.value;
          setItems(newItems);
        }}
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Image URL</Form.Label>
      <Form.Control
        type="text"
        value={editingIndex !== null ? items[editingIndex].imageurl : ''}
        onChange={(e) => {
          let newItems = [...items];
          newItems[editingIndex].imageurl = e.target.value;
          setItems(newItems);
        }}
      />
    </Form.Group>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={closeModal}>Close</Button>
    <Button variant="primary" onClick={handleEditItem}>Save Changes</Button>
  </Modal.Footer>
</Modal>
        </>
      )}
    </div>
  );
};

export default Admin;

