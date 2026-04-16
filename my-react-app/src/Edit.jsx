import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // เพิ่ม useNavigate เพื่อใช้กลับหน้าแรก

const BACKEND_URL = 'https://69df62c9d6de26e119294a16.mockapi.io';
const USER_URL = `${BACKEND_URL}/api/v1/todo/users`;

function Edit() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        name: '',
        phone: ''
    });
    const [IdUser, setId] = useState(useParams().id);

    // ฟังก์ชันดึงข้อมูล
    async function loadingUser() {
        if (!IdUser) return;
        try {
            const response = await axios.get(`${USER_URL}/${IdUser}`);
            setUser(response.data);
        } catch (error) {
            console.error("User not found");
            setUser({ name: '', phone: '', avatar: '' });
        } finally {
            setLoading(false); 
        }
    }

    // ฟังก์ชันบันทึกข้อมูล
    async function handleSave() {
        try {
            setLoading(true);
            await axios.put(`${USER_URL}/${IdUser}`, {
                name: user.name,
                phone: user.phone
            });
            alert("Updated successfully!");
            navigate('/');
        } catch (error) {
            console.error("Update Error:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadingUser();
    }, [IdUser]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 p-8 flex-col justify-center items-center flex">
                <div className="bg-gray-700 rounded-2xl shadow-xl p-6 w-full max-w-md mb-8">
                    <h3 className="text-2xl font-bold text-gray-200 mb-6 text-center">
                        Loading...
                    </h3>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 p-8 flex-col justify-center items-center flex">

            <div className="bg-gray-700 rounded-2xl shadow-xl p-6 w-full max-w-md mb-8">
                <h3 className="text-2xl font-bold text-gray-200 mb-6 text-center">
                    Search User by ID
                </h3>
                <input
                    type="text" 
                    value={IdUser}
                    onChange={(e) => setId(e.target.value)} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
            </div>

            <div className="bg-gray-700 rounded-2xl shadow-xl p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Edit User Information
                </h1>
                <div className="flex flex-col gap-6">
                    {/* รูปภาพสี่เหลี่ยม */}
                    <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden border">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* ฟอร์มกรอกข้อมูล */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ</label>
                            <input
                                type="text"
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })} // ทำให้พิมพ์แก้ไขได้
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
                            <input
                                type="tel"
                                value={user.phone}
                                onChange={(e) => setUser({ ...user, phone: e.target.value })} // ทำให้พิมพ์แก้ไขได้
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                        </div>
                    </div>

                    {/* ปุ่มกด */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => navigate('/')}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-md transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;
