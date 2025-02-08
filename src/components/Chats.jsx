import { useState, useEffect, useContext } from "react"; // React hooks
import { database } from "../firebase/firebase.config"; // Firebase config
import { ref, onValue, push } from "firebase/database"; // Firebase database functions
import AuthContext from "../context/AuthContext"; // Import authentication context

const Chats = () => {
  const { currentUser } = useContext(AuthContext); // Get logged-in user
  const [activeChat, setActiveChat] = useState("leader"); // Default chat
  const [chatThreads, setChatThreads] = useState({
    leader: [], // Leader chat
    mentor1: [], // Mentor chats
    mentor2: [], // Mentor chats
    mentor3: [], // Mentor chats
    group: [], // Group chat
  });
  const [newMessage, setNewMessage] = useState(""); // New message input
  const [groupParticipants, setGroupParticipants] = useState({ leader: [], mentors: [], mentees: [] }); // Group participants

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
    const participantsRef = ref(database, "groups/");
    const unsubscribe = onValue(participantsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        let leader = [];
        let mentors = [];
        let mentees = [];

        Object.values(data).forEach((group) => {
          if (group.participants) {
            Object.values(group.participants).forEach((participant) => {
              if (participant.role === "leader") leader.push(participant);
              else if (participant.role === "mentor") mentors.push(participant);
              else if (participant.role === "mentee") mentees.push(participant);
            });
          }
        });

        setGroupParticipants({ leader, mentors, mentees });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("Group Participants Data:", groupParticipants);
  }, [groupParticipants]);

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
              className={`md:px-4 p-1 md:py-2 rounded-md ${
                activeChat === chat
                  ? "bg-blue-950 text-white md:text-md text-sm"
                  : "bg-gray-200 text-black md:text-md text-sm"
              }`}
              onClick={() => setActiveChat(chat)}
            >
              {chat === "leader"
                ? "Leader"
                : chat === "group"
                ? "Group"
                : `Ment ${chat.charAt(chat.length - 1)}`}
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
                  <li key={leader.id || leader.email || Math.random()}>{leader.name || leader.email || "Unknown"}</li>
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
                  <li key={mentor.id || mentor.email || Math.random()}>{mentor.name || mentor.email || "Unknown"}</li>
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
                  <li key={mentee.id || mentee.email || Math.random()}>{mentee.name || mentee.email || "Unknown"}</li>
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
                  ? "bg-blue-950 text-white self-end sm:ml-80 ml-12 text-right"
                  : "bg-green-800 text-white self-start sm:mr-80 mr-12 text-left"
              }`}
            >
              <div><b>{message.sender}:</b><br/> {message.text}</div>
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
