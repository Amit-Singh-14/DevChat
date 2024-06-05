import React from "react";
import { ChatState } from "../../context/chatProvider";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";
function ChatBox({ fetchChatAgain, setFetchChatAgain }) {
  const { selectedChat } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      // bg="white"
      w={{ base: "100%", md: "68%" }}
      // borderRadius="lg"
      // borderWidth="1px"
      // color={"white"}
    >
      <SingleChat fetchChatAgain={fetchChatAgain} setFetchChatAgain={setFetchChatAgain} />
    </Box>
  );
}

export default ChatBox;
