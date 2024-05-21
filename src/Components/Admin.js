import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>已报名用户</h2>
      <button onClick={handleDeleteAll}>删除所有报名信息</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>ID:</strong> {user.id}, <strong>姓名:</strong> {user.name}, <strong>性别:</strong> {user.gender}, <strong>单位:</strong> {user.institution}, <strong>手机号码:</strong> {user.telephone}, <strong>岗位:</strong> {user.position}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
