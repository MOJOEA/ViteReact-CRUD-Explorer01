import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const BACKEND_URL = 'https://69df62c9d6de26e119294a16.mockapi.io';

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/todo/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${BACKEND_URL}/api/v1/todo/users/${id}`);
      setLoading(false);
      fetchUsers(); 
    }catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">User Directory</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {users.map((user) => (
            <div key={user.id} className="bg-gray-800 rounded-xl shadow-md overflow-hidden flex hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                
                {/* ฝั่งซ้าย: รูปภาพ */}
                <div className="w-32 h-auto flex-shrink-0">
                <img 
                    className="h-full w-full object-cover" 
                    src={user.avatar} 
                    alt={user.name} 
                />
                </div>

                {/* ฝั่งขวา: ข้อมูล */}
                <div className="p-4 flex flex-col justify-between w-full">
                
                {/* บรรทัด 1: ชื่อ + ID */}
                <div className="flex justify-between items-start">
                    <h2 className="text-lg font-bold text-gray-900 truncate mr-2">{user.name}</h2>
                    <span className="text-xs font-medium bg-blue-100 text-blue-600 px-2 py-1 rounded-full">#{user.id}</span>
                </div>

                {/* บรรทัด 2: เบอร์โทร */}
                <div className="mt-1">
                    <p className="text-sm text-gray-100 flex items-center">
                    <span className="mr-2"></span> {user.phone || 'N/A'}
                    </p>
                </div>

                {/* บรรทัด 3: ปุ่ม Edit + Delete */}
                <div className="mt-4 flex gap-2">
                    <Link 
                    to={`/edit/${user.id}`} 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                    Edit
                    </Link>
                    <button 
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                    onClick={() => deleteUser(user.id)}
                    >
                    Delete
                    </button>
                </div>

                </div>
            </div>
            ))}
        </div>
        </div>
    </div>
    );
}

export default Home;