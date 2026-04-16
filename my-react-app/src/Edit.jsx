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
            <div className="min-h-screen bg-gray-900 p-8 flex justify-center items-start">
                <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                    {/* หัวเรื่อง */}
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Edit User
                    </h1>

                    <div className="flex flex-col gap-6">
                        {/* รูปภาพสี่เหลี่ยม */}
                        <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden">
                            <img
                                src="https://placeholder.com"
                                alt="User Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* ฟอร์มกรอกข้อมูล */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ</label>
                                <input
                                    type="text"
                                    placeholder="กรอกชื่อของคุณ"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
                                <input
                                    type="tel"
                                    placeholder="08X-XXX-XXXX"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                />
                            </div>
                        </div>

                        {/* ปุ่มกดยืนยัน */}
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;