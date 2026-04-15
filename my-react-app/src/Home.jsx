import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const BACKEND_URL = 'https://69df62c9d6de26e119294a16.mockapi.io';

function Home() {
  const [users, setUsers] = useState([]);

  // 1. ส่วนของการดึงข้อมูล
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/todo/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>Home</h1>
      {/* 2. ส่วนของการแสดงผลข้อมูล */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {users.map((user) => (
          <div key={user.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <img src={user.avatar} width="50" alt={user.name} />
            <span>{user.name}</span>
            {/* 3. ปุ่มกดไปหน้า Edit */}
            <Link to={`/edit/${user.id}`}>
              <button style={{ marginLeft: '10px' }}>Edit</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;