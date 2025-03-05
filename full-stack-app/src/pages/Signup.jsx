import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Heading, Text, Spinner, Flex, Link } from "@chakra-ui/react";
import { bcUrl } from "../urlStore/bcUlr";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    const payload = { name, email, password };
    setLoading(true);

    try {
      const res = await fetch(`${bcUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert(data.message);
        navigate("/login");
      } else {
        alert("Signup failed: " + data.message);
      }
    } catch (error) {
      setLoading(false);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" bg="#f7f7f7">
      <Box w={["90%", "400px"]} bg="white" p={6} borderRadius="md" boxShadow="md" textAlign="center">
        <Heading size="lg" mb={4} color="#232f3e">
          Create Account
        </Heading>

        <Text fontSize="sm" color="gray.600" mb={4}>
          Enter your details to create an account
        </Text>

        <Input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          mb={3}
          border="1px solid #cccccc"
          color="black" 
          _placeholder={{ color: "gray.500" }} 
          _focus={{ borderColor: "#f0c14b", boxShadow: "0 0 5px #f0c14b" }}
        />

        <Input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb={3}
          border="1px solid #cccccc"
          color="black" 
          _placeholder={{ color: "gray.500" }}
          _focus={{ borderColor: "#f0c14b", boxShadow: "0 0 5px #f0c14b" }}
        />

        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb={4}
          border="1px solid #cccccc"
          color="black" 
          _placeholder={{ color: "gray.500" }}
          _focus={{ borderColor: "#f0c14b", boxShadow: "0 0 5px #f0c14b" }}
        />

        <Button 
          w="full" 
          bg="#f0c14b" 
          color="black" 
          _hover={{ bg: "#ddb347" }} 
          onClick={handleRegister} 
          disabled={loading}
        >
          {loading ? <Spinner size="sm" /> : "Create your account"}
        </Button>

    
        <Text mt={4} fontSize="sm">
          By creating an account, you agree to ShopEase's
        </Text>
        <Text fontSize="sm">
          <Link color="#007185" href="#"> Terms of Use</Link> and
          <Link color="#007185" href="#"> Privacy Policy</Link>.
        </Text>

        <Text mt={4} fontSize="sm" color="gray.600">
          Already have an account?
        </Text>

        <Button 
          mt={2} 
          w="full" 
          variant="outline" 
          borderColor="#f0c14b" 
          color="#232f3e" 
          _hover={{ bg: "#fef5d7" }}
          onClick={() => navigate("/login")}
        >
          Sign in
        </Button>
      </Box>
    </Flex>
  );
};

export default Signup;
