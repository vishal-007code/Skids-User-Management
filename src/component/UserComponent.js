import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';

const UserComponent = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Steven Doe',
      email: 'Stevendoe@gmail.com',
      phone: '1234567890',
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUserId(null);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleAddUser = (event) => {
    event.preventDefault();

    const newUser = {
      id: Date.now(),
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
    };

    setUsers([...users, newUser]);
    event.target.reset();
    handleCloseModal();
  };

  const handleEditUser = (event) => {
    event.preventDefault();

    const updatedUsers = users.map((user) => {
      if (user.id === editingUserId) {
        return {
          ...user,
          name: event.target.name.value,
          email: event.target.email.value,
          phone: event.target.phone.value,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    event.target.reset();
    handleCloseModal();
  };

  const handleDeleteUser = (userId) => {
    const filteredUsers = users.filter((user) => user.id !== userId);
    setUsers(filteredUsers);
  };

  const handleEditButtonClick = (user) => {
    setEditingUserId(user.id);
    handleOpenModal();
  };

  return (
    <div>
      <Button style={{display:'flex'}} variant="primary" onClick={handleOpenModal}>
        Add User
      </Button>
      <Table striped bordered hover color='white'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Button variant="info" onClick={() => handleEditButtonClick(user)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUserId ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={editingUserId ? handleEditUser : handleAddUser}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input type="text" className="form-control" id="name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input type="text" className="form-control" id="phone" required />
            </div>
            <Button variant="primary" type="submit">
              {editingUserId ? 'Save Changes' : 'Add User'}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserComponent;
