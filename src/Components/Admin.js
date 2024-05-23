import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Card, Form, Table, Button, Container } from 'react-bootstrap';

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('There was an error fetching the users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteAll = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/api/users');
      if (response.status === 200) {
        setUsers([]); // Clear the users state
        alert('已删除所有报名信息！');
      } else {
        console.error('Failed to delete users');
        alert('信息删除失败');
      }
    } catch (error) {
      console.error('There was an error deleting the users:', error);
      alert('信息删除出错');
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
            <Card>
                <Card.Header className="bg-success text-white">
                    <h3>已报名信息</h3>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Table striped bordered hover className="mb-4">
                            <thead className="thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>姓名</th>
                                    <th>性别</th>
                                    <th>单位</th>
                                    <th>手机号码</th>
                                    <th>岗位</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.institution}</td>
                                        <td>{user.telephone}</td>
                                        <td>{user.position}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Button variant="success" className="bg-success text-white" onClick={handleDeleteAll}>删除所有报名信息</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    </>
  );
};

export default Admin;
