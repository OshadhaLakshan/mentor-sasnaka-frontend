import { useState, useEffect } from "react";
import { database } from "../firebase/firebase.config"; // Firebase configuration
import { ref, onValue, push } from "firebase/database"; // Firebase Realtime Database methods

const Chats = () => {
  const [activeChat, setActiveChat] = useState("leader"); // Default chat is with the leader
  const [chatThreads, setChatThreads] = useState({
    leader: [],
    mentor1: [],
    mentor2: [],
    mentor3: [],
    group: [], // Add group chat
  });
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages from Firebase for each active chat
  useEffect(() => {
    const messagesRef = ref(database, `chats/${activeChat}`); // Dynamic path for each chat thread
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const formattedMessages = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setChatThreads((prevThreads) => ({
        ...prevThreads,
        [activeChat]: formattedMessages,
      }));
    });

    return () => unsubscribe(); // Clean up the listener on unmount or activeChat change
  }, [activeChat]);

  // Function to send a new message to the active chat thread
  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const messagesRef = ref(database, `chats/${activeChat}`);
    const newMessageData = {
      sender: "me", // You can replace "me" with the actual user role
      text: newMessage,
      timestamp: Date.now(),
    };

    push(messagesRef, newMessageData); // Add new message to Firebase
    setNewMessage(""); // Clear input field
  };

  return (
    <div className="flex flex-col items-center justify-center m-4">
      <div className="chat-container max-w-3xl w-full border rounded-xl shadow-lg p-4 bg-white">
        <h2 className="text-2xl text-center font-bold mb-4">Chat Dashboard</h2>

        {/* Chat Selector */}
        <div className="chat-selector flex justify-evenly mb-4 border-b pb-2">
          {["leader", "mentor1", "mentor2", "mentor3", "group"].map((chat) => (
            <button
              key={chat}
              className={`px-4 py-2 rounded-md ${
                activeChat === chat
                  ? "bg-blue-950 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setActiveChat(chat)}
            >
              {chat === "leader"
                ? "Leader"
                : chat === "group"
                ? "Group Chat"
                : `Mentor ${chat.charAt(chat.length - 1)}`}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="chat-box h-[calc(100vh-320px)] overflow-y-auto border p-4 mb-4 bg-gray-100 rounded-lg">
          {chatThreads[activeChat].map((message) => (
            <div
              key={message.id}
              className={`message mb-2 p-2 rounded-md ${
                message.sender === "me"
                  ? "bg-blue-950 text-white self-end pl-20 text-right"
                  : "bg-green-800 text-white self-start pr-20 text-left"
              }`}
            >
              <p>{message.text}</p>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="chat-input flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded-md p-2 select-auto"
            placeholder={`Message ${
              activeChat === "leader"
                ? "Leader"
                : activeChat === "group"
                ? "Group"
                : `Mentor ${activeChat.charAt(activeChat.length - 1)}`
            }...`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="bg-blue-950 text-white px-4 py-2 rounded-md"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chats;
