import { ChatState } from "../context/chatProvider";
import SideDrawer from "../components/utils-compoents/SideDrawer";
import MyChats from "../components/chat/MyChats";
import ChatBox from "../components/chat/ChatBox";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

function ChatPage() {
  const { user } = ChatState();
  const [fetchChatAgain, setFetchChatAgain] = useState(false);
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchChatAgain={fetchChatAgain} />}
        {user && <ChatBox fetchChatAgain={fetchChatAgain} setFetchChatAgain={setFetchChatAgain} />}
      </Box>
    </div>
  );
}

export default ChatPage;
