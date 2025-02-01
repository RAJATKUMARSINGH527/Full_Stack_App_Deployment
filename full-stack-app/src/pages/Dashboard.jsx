import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Image,
  Input,
  Text,
  Textarea,
  SimpleGrid,
  Heading,
  Spinner,
  Flex,
  VStack,
} from "@chakra-ui/react";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://full-stack-app-deployment.onrender.com/products", {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products || []);
      } else {
        console.log(data.message || "Failed to fetch products");
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleEdit = async (productId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://full-stack-app-deployment.onrender.com/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedProduct),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Product updated successfully");
        fetchProducts();
        setEditMode(null);
        setUpdatedProduct({ name: "", price: "", description: "" });
      } else {
        console.log(data.message || "Failed to update product");
      }
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const handleDelete = async (productId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://full-stack-app-deployment.onrender.com/products/${productId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Product deleted successfully");
        fetchProducts();
      } else {
        console.log(data.message || "Failed to delete product");
      }
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <Box p={5} textAlign="center">
      <Heading mb={4}>Product Dashboard</Heading>
      {loading && <Spinner size="xl" />}
      {error && <Text color="red.500">{error}</Text>}
      {!loading && !error && products.length === 0 && (
        <Text>No products available.</Text>
      )}

      <SimpleGrid columns={[1, 2, 3]} spacing={5}>
        {products.map((product) => (
          <Box
            key={product._id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
          >
            <Image
              src={
                product.image ||
                "https://images.jdmagicbox.com/quickquotes/images_main/asus-rog-strix-hero-gaming-laptop-gl504-15-6-144hz-ips-type-slim-display-intel-core-i7-8750h-processor-up-to-3-9ghz-113434402-8iqea.jpg"
              }
              alt={product.name}
              boxSize="250px"
              objectFit="cover"
              mb={3}
            />
            {editMode === product._id ? (
              <VStack spacing={2}>
                <Input
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
                  }
                  placeholder="Product Name"
                />
                <Input
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                  placeholder="Price"
                  type="number"
                />
                <Textarea
                  value={updatedProduct.description}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                />
                <Flex gap={2}>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleEdit(product._id)}
                  >
                    Save
                  </Button>
                  <Button onClick={() => setEditMode(null)}>Cancel</Button>
                </Flex>
              </VStack>
            ) : (
              <VStack spacing={2}>
                <Text fontWeight="bold">{product.name}</Text>
                <Text>Price: ₹{product.price}</Text>
                <Text>Description: {product.description}</Text>
                <Flex gap={2}>
                  <Button
                    colorScheme="yellow"
                    onClick={() => {
                      setEditMode(product._id);
                      setUpdatedProduct({
                        name: product.name,
                        price: product.price,
                        description: product.description,
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </Button>
                </Flex>
              </VStack>
            )}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
