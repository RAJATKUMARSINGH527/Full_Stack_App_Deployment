import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Container,
  Image,
  Grid,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";

const categories = [
  { name: "Electronics", image: "https://via.placeholder.com/150" },
  { name: "Fashion", image: "https://via.placeholder.com/150" },
  { name: "Home & Kitchen", image: "https://via.placeholder.com/150" },
  { name: "Books", image: "https://via.placeholder.com/150" },
];

const featuredProducts = [
  { name: "Smartphone", price: "$699", image: "https://via.placeholder.com/200" },
  { name: "Laptop", price: "$999", image: "https://via.placeholder.com/200" },
  { name: "Headphones", price: "$199", image: "https://via.placeholder.com/200" },
  { name: "Smartwatch", price: "$299", image: "https://via.placeholder.com/200" },
];

const Home = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={6} textAlign="center">
        <Heading as="h1" size="2xl" color="teal.500">
          Welcome to ShopEase
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Your one-stop shop for everything you need!
        </Text>
        <Link to="/shop">
          <Button colorScheme="teal" size="lg">Shop Now</Button>
        </Link>
      </VStack>

      {/* Categories Section */}
      <Box mt={10}>
        <Heading as="h2" size="xl" mb={4} textAlign="center">
          Shop by Category
        </Heading>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
          {categories.map((category, index) => (
            <Box key={index} textAlign="center">
              <Image src={category.image} alt={category.name} borderRadius="md" />
              <Text fontSize="lg" fontWeight="bold" mt={2}>{category.name}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Featured Products */}
      <Box mt={10}>
        <Heading as="h2" size="xl" mb={4} textAlign="center">
          Featured Products
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6}>
          {featuredProducts.map((product, index) => (
            <GridItem key={index} textAlign="center" borderWidth="1px" borderRadius="lg" p={4}>
              <Image src={product.image} alt={product.name} borderRadius="md" />
              <Text fontSize="lg" fontWeight="bold" mt={2}>{product.name}</Text>
              <Text fontSize="md" color="gray.500">{product.price}</Text>
              <Button colorScheme="teal" size="sm" mt={2}>Buy Now</Button>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
