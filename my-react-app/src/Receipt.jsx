import { useState, useEffect } from "react";

function Receipt() {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  // ✅ คำนวณราคารวมทุกครั้งที่ items เปลี่ยน
  useEffect(() => {
    const sum = items.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);

    setTotal(sum);
  }, [items]);

  // ✅ เพิ่มรายการ
  const addItem = () => {
    if (!itemName || !price) return;

    const newItem = {
      id: Date.now(),
      name: itemName,
      price: Number(price),
      qty: 1,
    };

    setItems(prev => [...prev, newItem]);

    setItemName("");
    setPrice("");
  };

  // ✅ เปลี่ยนจำนวน
  const updateQty = (id, newQty) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, qty: Number(newQty) }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-8 text-white">

      {/* 🔥 กล่องเพิ่มข้อมูล */}
      <div className="bg-gray-800 p-4 rounded-xl mb-6 w-96">
        <h2 className="text-xl mb-4">Add Item</h2>

        <input
          type="text"
          placeholder="Item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="w-full mb-2 p-2 text-black rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full mb-2 p-2 text-black rounded"
        />

        <button
          onClick={addItem}
          className="w-full bg-blue-600 p-2 rounded"
        >
          Add
        </button>
      </div>

      {/* 🧾 กล่องใบเสร็จ */}
      <div className="bg-gray-800 p-6 rounded-xl w-96">
        <h2 className="text-xl mb-4 text-center">Receipt</h2>

        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <div>
              <p>{item.name}</p>
              <p className="text-sm text-gray-400">{item.price} บาท</p>
            </div>

            <input
              type="number"
              value={item.qty}
              min="1"
              onChange={(e) => updateQty(item.id, e.target.value)}
              className="w-16 text-black rounded px-1"
            />
          </div>
        ))}

        <hr className="my-4" />

        <h3 className="text-lg font-bold text-right">
          Total: {total} บาท
        </h3>
      </div>
    </div>
  );
}

export default Receipt;