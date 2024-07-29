// src/components/RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    institution: '',
    telephone: '',
    position: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const user = { ...formData, id: uuidv4() }; // Generate a unique ID and create the user object
    try {
      await axios.post('http://localhost:5000/api/register', user); // Send the user data to the backend
      alert('报名成功!'); // Show success notification
      setFormData({
        name: '',
        gender: '',
        institution: '',
        telephone: '',
        position: ''
      }); // Reset the form fields
    } catch (error) {
      console.error('There was an error registering the user:', error); // Log any errors
      alert('报名失败，请重试'); // Show failure notification
    }
  };

  return (
    <>

    <Navbar expand="lg" className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Navbar.Brand href="" className="ms-5">导航栏</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            {/* <Nav.Link href="#">主页</Nav.Link> */}
            {/* <Nav.Link href="#link">Link</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
                Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
                Separated link
            </NavDropdown.Item>
            </NavDropdown> */}
        </Nav>
        </Navbar.Collapse>
    </Navbar>

    <Container className="my-4">
      <Card style={{ width: '50%', margin: '0 auto' }}>  {/* Adjust width as needed and center the card */}
        <Card.Header className="bg-primary text-white">
          <h3>报名表</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>姓名</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="姓名"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>性别</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>性别</option>
                <option value="Male">男</option>
                <option value="Female">女</option>
                <option value="Other">其他</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>单位</Form.Label>
              <Form.Control
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="单位"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>手机号码</Form.Label>
              <Form.Control
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="手机号码"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>岗位</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="岗位"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">报名</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    
    </>
  );
};

export default RegistrationForm;
