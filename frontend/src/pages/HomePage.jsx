import React, { useEffect } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <SimpleGrid w={"100vw"} h={"100vh"} p={{ md: 20 }} columns={{ base: 1, md: 2 }} spacing={5}>
      <Container marginTop={{ md: "50px" }}>
        <Box color={"white"} textAlign={"center"}>
          <Text fontSize={{ md: "120px", base: "70px" }}>Dev Chat</Text>
          <Text fontFamily={"cursive"}>Real-Time Chat application for developers</Text>
        </Box>
      </Container>
      <Container>
        <Box className="loginsignup" w="100%" p={5} borderRadius="lg" color={"white"}>
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="1em">
              <Tab
                color={"white"}
                _selected={{ bg: "#b463a7", color: "white" }} // Custom active tab styles
                sx={{
                  '&[aria-selected="true"]': {
                    bg: "#b463a7",
                    color: "white",
                  },
                }}
              >
                Login
              </Tab>
              <Tab
                color={"white"}
                _selected={{ bg: "#b463a7", color: "white" }} // Custom active tab styles
                sx={{
                  '&[aria-selected="true"]': {
                    bg: "#b463a7",
                    color: "white",
                  },
                }}
              >
                Sign Up
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </SimpleGrid>
  );
}

export default HomePage;
