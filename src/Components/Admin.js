import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Card, Form, Table, Button, Container } from 'react-bootstrap';
import * as XLSX from 'xlsx';

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://120.26.81.229:5000/admin')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleDeleteAll = async () => {
    try {
      const response = await axios.delete('https://120.26.81.229:5000/delete-all');
      if (response.status === 200) {
        setUsers([]);
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

  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "报名信息");
    XLSX.writeFile(wb, "报名信息.xlsx");
  };

  return (
    <>
      <Navbar expand="lg" className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Navbar.Brand href="" className="ms-5">导航栏</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
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
              <Button variant="success" className="bg-success text-white" onClick={handleExportToExcel}>打印到本地</Button>
              {' '}
              <Button variant="success" className="bg-success text-white" onClick={handleDeleteAll}>删除所有报名信息</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Admin;
