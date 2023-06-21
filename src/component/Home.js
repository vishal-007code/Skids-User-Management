import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import "../App.css";
import { FaPencilAlt, FaPlus, FaTrashAlt } from "react-icons/fa";

export const Home = () => {
  const defaultUsers   = [
    {
      id: 1,
      name: "Bob",
      email: "Dublinbob45@gmail.com",
      phone:"2343435345346"
    },
    {
      id: 2,
      name: "John",
      email: "johnwillian123@gmail.com",
      phone:"374882380983"
    },
  ];

  const initCurrentUser = {
    id: null,
    name: "",
    email: "",
    phone:"",
  };

  const [users, setUsers] = useState(defaultUsers);
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState(initCurrentUser);
  const [editing, setEdit] = useState(false);

  const handleClose = () => {
    setShow(false);   
  };
  const handleShow = () => {
    setShow(true);
    if(editing === false) {
      setNewUser(initCurrentUser);
    }
  };

  const onFormSubmit = (newUser) => {
    const id = users.length + 1;
    setUsers([...users, { ...newUser, id }]);
  };

  const onEdit = (newUser) => {
    setEdit(true);
    if(editing === true) {
      setNewUser({ ...newUser, newUser });
      handleShow();
    }
  };

  const onSubmit = (newUser) => {
    if (editing === true) {
      onUpdateUser(newUser);
    } else {
      onFormSubmit(newUser);
    }
  };

  const onUpdateUser = (newUser) => {
    setEdit(false);
    let id = newUser.id;
    setUsers(users.map((i) => (i.id === id ? newUser : i)));
  };

  const onDeleteUser = (currentUser) => {
    setUsers(users.filter((i) => i.id !== currentUser.id));
  };

  return (
    <Container fluid="md">
      <Row>
        <Col>
          <Card className="customCard">
            <Card.Body>
              <div className="d-flex justify-content-between customCardBody">
                <div>
                  <Card.Title>User Data</Card.Title>
                </div>
                <div className="d-flex">
                    <Button
                      variant="primary"
                      onClick={handleShow}
                      title="Add User"
                    >
                      <FaPlus />
                    </Button>
                </div>
              </div>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone No.</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          <Button
                            variant="info"
                            title="Edit user details"
                            onClick={() => onEdit(user)}
                          >
                            <FaPencilAlt />
                          </Button>{" "}
                          <Button
                            variant="danger"
                            title="Delete user"
                            onClick={() => onDeleteUser(user)}
                          >
                            <FaTrashAlt />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Modal size="lg" show={show} onHide={handleClose}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(newUser);
              }}
            >
              <Modal.Header closeButton>
                {
                  editing === true 
                  ? <Modal.Title>Edit User</Modal.Title>
                  : <Modal.Title>Add User</Modal.Title>
                }
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser.name}
                    required
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    placeholder="Enter Name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAddress">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="Enter Email"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAge">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser.phone}
                    onChange={(e) =>
                      setNewUser({ ...newUser, phone: e.target.value })
                    }
                    placeholder="Enter Phone No."
                  />
                </Form.Group>
                
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {editing === true ? (
                  <Button variant="primary" type="submit" onClick={handleClose}>
                    Update
                  </Button>
                ) : (
                  <Button variant="primary" disabled={!newUser.name} type="submit" onClick={handleClose}>
                    Submit
                  </Button>
                )}
              </Modal.Footer>
            </Form>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
