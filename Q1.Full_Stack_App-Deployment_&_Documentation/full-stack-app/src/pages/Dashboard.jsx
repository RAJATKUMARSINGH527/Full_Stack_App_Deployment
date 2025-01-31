import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://full-stack-app-deployment.onrender.com/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      toast.error("Failed to fetch products!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`https://full-stack-app-deployment.onrender.com/products/${editId}`, form, { headers: { Authorization: `Bearer ${token}` } });
        toast.success("Product updated!");
      } else {
        await axios.post("http://localhost:8999/products", form, { headers: { Authorization: `Bearer ${token}` } });
        toast.success("Product created!");
      }
      fetchProducts();
      setForm({ name: "", price: "" });
      setEditId(null);
    } catch (error) {
      toast.error("Operation failed!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://full-stack-app-deployment.onrender.com/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Product deleted!");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete!");
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="text" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <button type="submit">{editId ? "Update" : "Create"}</button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price}
            <button onClick={() => setEditId(product._id)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
