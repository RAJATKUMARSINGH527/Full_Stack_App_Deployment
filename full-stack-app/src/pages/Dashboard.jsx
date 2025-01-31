import { useState, useEffect } from "react";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  // Fetch products when the component mounts
  useEffect(() => {
    fetch("https://full-stack-app-deployment.onrender.com/products", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle product editing
  const handleEdit = (productId) => {
    fetch(`https://full-stack-app-deployment.onrender.com/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: updatedName,
        price: updatedPrice,
        description: updatedDescription,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId
              ? { ...product, name: updatedName, price: updatedPrice, description: updatedDescription }
              : product
          )
        );

        setEditMode(null);
      })
      .catch((err) => console.error(err));
  };

  // Handle product deletion
  const handleDelete = (productId) => {
    fetch(`https://full-stack-app-deployment.onrender.com/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h2>Welcome to Your Product Dashboard</h2>
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id}>
              {editMode === product._id ? (
                <>
                  <input
                    type="text"
                    placeholder="Enter updated name"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Enter updated price"
                    value={updatedPrice}
                    onChange={(e) => setUpdatedPrice(e.target.value)}
                  />
                  <textarea
                    placeholder="Enter updated description"
                    value={updatedDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                  />
                  <button onClick={() => handleEdit(product._id)}>Save</button>
                  <button onClick={() => setEditMode(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h3>Name: {product.name}</h3>
                  <p>Price: {product.price}</p>
                  <p>Description: {product.description}</p>
                  <button
                    onClick={() => {
                      setEditMode(product._id);
                      setUpdatedName(product.name);
                      setUpdatedPrice(product.price);
                      setUpdatedDescription(product.description);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(product._id)}>Delete</button>
                </>
              )}
            </div>
          ))
        ) : (
          <h2>No Products to display</h2>
        )}
      </div>
    </>
  );
};

export default Dashboard;
