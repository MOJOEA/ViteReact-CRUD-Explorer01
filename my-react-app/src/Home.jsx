import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const BACKEND_URL = 'https://69df62c9d6de26e119294a16.mockapi.io';
const USER_URL = `${BACKEND_URL}/api/v1/todo/users`;
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [allUsers, setAllUsers] = useState([]);
  const [company, setCompany] = useState('');
  const navigate = useNavigate();
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const fetchUsers = async () => {
  try {
    const response = await axios.get(`${USER_URL}`);
    setAllUsers(response.data);

    if (company) {
      setUsers(response.data.filter(u => u.group === company));
    } else {
      setUsers(response.data);
    }

  } catch (error) {
    console.error("Error:", error);
  } finally {
    setLoading(false);
  }
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${USER_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  async function LikeUser(id, nextFavoriteStatus) {
    try {
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === id
            ? { ...user, isFavorite: nextFavoriteStatus }
            : user
        )
      );
      await axios.put(`${USER_URL}/${id}`, {
        isFavorite: nextFavoriteStatus,
      });

    } catch (error) {
      console.error("Update Error:", error);
    }
  }
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const editUser = (id) => {
    navigate(`/Edit/${id}`);
  };
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    fetchUsers();
  }, [company]);

  const uniqueCompanies = [...new Set(allUsers.map(user => user.group))];

  if (loading) {
    return <div>Loading...</div>;
  }
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className="min-h-screen max-w-5xl bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center">

        <div className="bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md mb-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-200 mb-6 text-center">
            Search by company name
          </h3>

          <select
            onChange={(e) => setCompany(e.target.value)}
            value={company}
            className="w-full px-4 py-2 border border-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-700 text-gray-200"
          >
            <option value="">-- Select company --</option>
            {uniqueCompanies.map((group, index) => (
              <option key={index} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <h1 className="text-3xl font-bold text-gray-200 mb-8 text-center">User Directory</h1>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className={
                user.isFavorite
                  ? "bg-yellow-600 border-yellow-100 rounded-xl shadow-md overflow-hidden flex hover:shadow-lg transition-shadow duration-300 border"
                  : "bg-gray-800 border-gray-200 rounded-xl shadow-md overflow-hidden flex hover:shadow-lg transition-shadow duration-300 border"
              }
            >
              <div className="w-32 h-auto flex-shrink-0">
                <img
                  className="h-full w-full object-cover"
                  src={user.avatar}
                  alt={user.name}
                />
              </div>

              <div className="p-4 flex flex-col justify-between w-full">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-bold text-white truncate mr-2">{user.name}</h2>
                  <span className="text-xs font-medium bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full border border-blue-700">
                    #{user.id}
                  </span>
                </div>

                <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-100">
                    {user.phone || 'N/A'}
                  </p>

                  <button
                    className="text-xs font-medium bg-pink-300 text-white px-2 py-1 rounded-full border border-red-700"
                    onClick={() => LikeUser(user.id, !user.isFavorite)}
                  >
                    ♥️
                  </button>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                    onClick={() => editUser(user.id)}
                  >
                    Edit
                  </button>

                  <button
                    className="flex-1 bg-rose-600 hover:bg-rose-500 text-white py-2 rounded-lg text-sm font-medium transition-colors"
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