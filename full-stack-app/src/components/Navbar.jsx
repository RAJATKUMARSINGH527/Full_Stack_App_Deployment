import React, { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { Box, Button, Flex, Heading, HStack, Text } from "@chakra-ui/react";

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <Box bg="blue.500" py={4} px={8} color="white">
      <Flex justify="space-between" align="center">
        <Heading size="lg" color="teal.300">
          <Link to="/">SHOPEASE</Link>
        </Heading>

        <HStack spacing={6}>
          {token ? (
            <>
              <NavLink to="/dashboard">
                {({ isActive }) => (
                  <Text color={isActive ? "teal.300" : "white"} fontWeight={isActive ? "bold" : "normal"}>
                    Dashboard
                  </Text>
                )}
              </NavLink>
              <Button colorScheme="red" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/signup">
                {({ isActive }) => (
                  <Text color={isActive ? "teal.300" : "white"} fontWeight={isActive ? "bold" : "normal"}>
                    Sign Up
                  </Text>
                )}
              </NavLink>
              <NavLink to="/login">
                {({ isActive }) => (
                  <Text color={isActive ? "teal.300" : "white"} fontWeight={isActive ? "bold" : "normal"}>
                    Login
                  </Text>
                )}
              </NavLink>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
