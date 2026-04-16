import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const BACKEND_URL = 'https://69df62c9d6de26e119294a16.mockapi.io';
const USER_URL = `${BACKEND_URL}/api/v1/todo/users`;
const { id } = useParams();

function Edit() {
    const [loading, setLoading] = useState(true);
    const [User, setUser] = useState({
        avatar: '',
        name: '',
        email: '',
        phone: ''
    });

    async function LodingUser() {
        try {
            setLoading(true);
            const response = await axios.get(`${USER_URL}/${id}`);
            setUser(response.data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    }

    


    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="min-h-screen bg-gray-900 p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Edit User</h1>
                </div>
            </div>
        )
    }
}