# ViteReact-CRUD-Explorer01
# React Learning Project 01: CRUD & API Integration
โปรเจกต์นี้เป็นส่วนหนึ่งของการฝึกฝนพื้นฐาน React (Vite) โดยเน้นการดึงข้อมูลจาก API จริง การจัดการสถานะ (State) และการทำระบบเปลี่ยนหน้า (Routing) เพื่อปูพื้นฐานสู่การเป็น Frontend Developer

# วัตถุประสงค์การเรียนรู้
การเริ่มต้นโปรเจกต์ด้วย Vite
การดึงข้อมูลจากภายนอกด้วย Fetch / Axios
การใช้งาน MockAPI.io เพื่อจำลอง Server
การจัดการเส้นทางของเว็บไซต์ด้วย React Router Dom
การจัดการฟอร์มและการอัปเดตข้อมูล (Update/PUT Method)

# Stack ที่ใช้
Framework: React (Vite)
Routing: React Router Dom
HTTP Client: Axios
Backend (Mock): MockAPI.io

# การติดตั้งและเริ่มต้นใช้งาน (Installation)
Clone โปรเจกต์:
bash
git clone <your-repository-url>
cd my-react-app

ติดตั้ง Dependencies ทั้งหมด:
bash
npm install
npm install react-router-dom axios prop-types

รันโปรเจกต์ (Development Server):
bash
npm run dev

# สิ่งที่ได้เรียนรู้ในโปรเจกต์นี้
1. การจัดการ Component และ Props
เรียนรู้การสร้างคอมโพเนนต์แยกไฟล์ เช่น Page2.jsx, Page3.jsx
การส่งค่าผ่าน Props และการใช้ prop-types
2. React Hooks ที่สำคัญ
useState: จัดการข้อมูลในหน้าเว็บ
useEffect: ใช้ดึงข้อมูลทันทีที่เปิดหน้าเว็บ
useParams: ดึง ID จาก URL เพื่อนำไปดึงข้อมูลเฉพาะตัวมาแก้ไข
3. API Connection
วิธีการ GET ข้อมูลมาแสดงผลเป็นรายการ (Map function)
วิธีการ PUT ข้อมูลกลับไปยัง Server เพื่อแก้ไขชื่อผู้ใช้งาน

# โครงสร้างโปรเจกต์ (Folder Structure)
text
src/
├── main.jsx          # จุดเริ่มต้น (Router Setup)
├── App.jsx           # หน้าหลัก (แสดงรายการทั้งหมด)
├── Page2.jsx         # หน้าเสริมตัวอย่าง
├── Page3.jsx         # หน้าสำหรับแก้ไขข้อมูล (Edit Page)
└── App.css           # สไตล์การตกแต่ง