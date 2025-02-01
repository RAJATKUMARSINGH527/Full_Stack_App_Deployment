import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Heading, Text, Image } from "@chakra-ui/react";

const categories = [
  { name: "Electronics", image: "https://www.polytechnichub.com/wp-content/uploads/2017/04/Electronic.jpg" },
  { name: "Fashion", image: "https://assets.vogue.com/photos/65f8604e619fe40d5e1b0301/master/pass/western_Trends_001.jpg" },
  { name: "Home & Kitchen", image: "https://5.imimg.com/data5/ANDROID/Default/2024/5/420108942/MG/JT/XJ/91499499/product-jpeg-500x500.jpeg" },
  { name: "Books", image: "https://booksalmirah.com/wp-content/uploads/2023/08/alfons-morales-YLSwjSy7stw-unsplash-1.jpg" },
];

const featuredProducts = [
  { name: "Smartphone", price: "₹9999", image: "https://i.ytimg.com/vi/cJKQdzopuco/maxresdefault.jpg" },
  { name: "Laptop", price: "₹49999", image: "https://i.rtings.com/assets/pages/6S2WXjTl/best-laptops-20240516-medium.jpg?format=auto" },
  { name: "Headphones", price: "₹2999", image: "https://www.soundguys.com/wp-content/uploads/2024/07/headphones-hero-2-scaled-e1723578762165.jpg" },
  { name: "Smartwatch", price: "₹1499", image: "https://istarmax.com/wp-content/uploads/2024/04/Starmax-Product-Range-Summer-2024-2.png" },
];

const Home = () => {
  return (
    <Box maxW="container.xl" py={10} textAlign="center">
      <Heading as="h1" size="2xl" color="teal.500" mb={4}>
        Welcome to ShopEase
      </Heading>
      <Text fontSize="lg" color="gray.600" mb={6}>
        Your one-stop shop for everything you need!
      </Text>
      <Link to="/dashboard">
        <Button colorScheme="teal" size="lg">Shop Now</Button>
      </Link>

      {/* Categories Section */}
      <Box mt={10}>
        <Heading as="h2" size="xl" mb={4}>
          Shop by Category
        </Heading>
        <Box display="flex" justifyContent="space-around">
          {categories.map((category, index) => (
            <Box key={index} textAlign="center">
              <Image 
                src={category.image} 
                alt={category.name} 
                borderRadius="sm" 
                boxSize="300px" // Smaller image size
                objectFit="cover" // Optional: Ensures the image covers the space without distortion
              />
              <Text fontSize="lg" fontWeight="bold" mt={2}>{category.name}</Text>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Featured Products */}
      <Box mt={10}>
        <Heading as="h2" size="xl" mb={4}>
          Featured Products
        </Heading>
        <Box display="flex" justifyContent="space-around">
          {featuredProducts.map((product, index) => (
            <Box key={index} textAlign="center" borderWidth="1px" borderRadius="lg" p={4}>
              <Image 
                src={product.image} 
                alt={product.name} 
                borderRadius="md" 
                boxSize="250px" // Smaller image size for featured products
                objectFit="cover" // Optional: Ensures the image covers the space without distortion
              />
              <Text fontSize="lg" fontWeight="bold" mt={2}>{product.name}</Text>
              <Text fontSize="md" color="gray.500">{product.price}</Text>
              <Link to="/dashboard">      
              <Button colorScheme="teal" size="sm" mt={2}>Buy Now</Button>
              </Link>
             
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
