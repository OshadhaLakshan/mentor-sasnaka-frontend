import { useState, useEffect, useContext } from "react";
import { database } from "../firebase/firebase.config"; // Firebase config
import { ref, onValue, push } from "firebase/database";
import AuthContext from "../context/AuthContext"; // Import authentication context

const Chats = () => {
  const { currentUser } = useContext(AuthContext); // Get logged-in user
  const [activeChat, setActiveChat] = useState("leader"); // Default chat
  const [chatThreads, setChatThreads] = useState({
    leader: [],
    mentor1: [],
    mentor2: [],
    mentor3: [],
    group: [], // Group chat
  });
  const [newMessage, setNewMessage] = useState("");
  const [groupParticipants, setGroupParticipants] = useState({ leader: [], mentors: [], mentees: [] });

  // Fetch messages for each active chat
  useEffect(() => {
    const messagesRef = ref(database, `chats/${activeChat}`);
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

    return () => unsubscribe();
  }, [activeChat]);

  // Fetch group participants categorized by role
  useEffect(() => {
    const participantsRef = ref(database, "groups/participants");
    const unsubscribe = onValue(participantsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const leader = [];
        const mentors = [];
        const mentees = [];

        Object.values(data).forEach((participant) => {
          if (participant.role === "leader") leader.push(participant);
          else if (participant.role === "mentor") mentors.push(participant);
          else if (participant.role === "mentee") mentees.push(participant);
        });

        setGroupParticipants({ leader, mentors, mentees });
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to send a new message
  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const messagesRef = ref(database, `chats/${activeChat}`);
    const newMessageData = {
      sender: currentUser?.displayName || "Unknown",
      text: newMessage,
      timestamp: Date.now(),
    };

    push(messagesRef, newMessageData);
    setNewMessage(""); // Clear input
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

        {/* Group Participants Section */}
        <div className="participants mb-4 p-4 border rounded-lg bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">Group Participants</h3>

          {/* Leader */}
          {groupParticipants.leader.length > 0 && (
            <div className="mb-2">
              <h4 className="font-semibold">Leader</h4>
              <ul className="list-disc ml-4">
                {groupParticipants.leader.map((leader) => (
                  <li key={leader.id}>{leader.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Mentors */}
          {groupParticipants.mentors.length > 0 && (
            <div className="mb-2">
              <h4 className="font-semibold">Mentors</h4>
              <ul className="list-disc ml-4">
                {groupParticipants.mentors.map((mentor) => (
                  <li key={mentor.id}>{mentor.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Mentees */}
          {groupParticipants.mentees.length > 0 && (
            <div className="mb-2">
              <h4 className="font-semibold">Mentees</h4>
              <ul className="list-disc ml-4">
                {groupParticipants.mentees.map((mentee) => (
                  <li key={mentee.id}>{mentee.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Chat Messages */}
        <div className="chat-box h-[calc(100vh-400px)] overflow-y-auto border p-4 mb-4 bg-gray-100 rounded-lg">
          {chatThreads[activeChat].map((message) => (
            <div
              key={message.id}
              className={`message mb-2 p-2 rounded-md ${
                message.sender === currentUser?.displayName
                  ? "bg-blue-950 text-white self-end pl-20 text-right"
                  : "bg-green-800 text-white self-start pr-20 text-left"
              }`}
            >
              <p>{message.sender}: {message.text}</p>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="chat-input flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded-md p-2"
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
