import { useState, useEffect, useContext } from "react"; // React hooks
import { database } from "../firebase/firebase.config"; // Firebase config
import { ref, onValue, push } from "firebase/database"; // Firebase database functions
import AuthContext from "../context/AuthContext"; // Import authentication context

const Chats = () => {
  const { currentUser } = useContext(AuthContext); // Get logged-in user
  const [activeChat, setActiveChat] = useState("leader"); // Default chat
  const [expandedLeaders, setExpandedLeaders] = useState({});
  const [chatThreads, setChatThreads] = useState({
    leader: [], // Leader chat
    mentor1: [], // Mentor chats
    mentor2: [], // Mentor chats
    mentor3: [], // Mentor chats
    group: [], // Group chat
  });
  const [newMessage, setNewMessage] = useState(""); // New message input
  const [groups, setGroups] = useState({});

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

  // Fetch Groups and their Participants
  useEffect(() => {
    const groupsRef = ref(database, "groups/");
    const unsubscribe = onValue(groupsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const sortedGroups = {};
        Object.keys(data).forEach((groupId) => {
          const groupData = data[groupId];
  
          sortedGroups[groupId] = {
            name: groupData.name || `Group ${groupId}`,
            leader: groupData.participants?.leader || null, // Single leader email
            mentors: groupData.participants?.mentors || [], // Array of mentor emails
            mentees: groupData.participants?.mentees || [], // Array of mentee emails
          };
        });
  
        setGroups(sortedGroups);
      } else {
        setGroups({});
      }
    });
  
    return () => unsubscribe();
  }, []);

    // Toggle dropdown visibility
    const toggleLeaderDropdown = (groupId) => {
      setExpandedLeaders((prev) => ({
        ...prev,
        [groupId]: !prev[groupId],
      }));
    };

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

        {/* Group Participants Section */}
        <div className="chat-container max-w-3xl mt-10 w-full border rounded-xl shadow-lg p-4 bg-white">
          <h2 className="text-2xl text-center font-bold mb-4">Group Participants</h2>

          {Object.keys(groups).length > 0 ? (
          <div className="space-y-4">
            {Object.keys(groups).map((groupId) => {
              const { name, leader, mentors, mentees } = groups[groupId];

              return (
                <div key={groupId} className="border rounded-lg p-4 shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{name}</h3>

                  {leader ? (
                    <div 
                      className="leader bg-blue-900 text-white p-3 rounded-md cursor-pointer flex justify-between"
                      onClick={() => toggleLeaderDropdown(groupId)}
                    >
                      <span>👑 {leader.length < 15 ? leader : leader.substring(0, 10) + "...  "} (Leader) &nbsp; &nbsp; &nbsp;</span>
                      <span>{expandedLeaders[groupId] ? "▲" : "▼"}</span>
                    </div>
                  ) : (
                    <p className="text-red-500 font-semibold">No Leader Assigned</p>
                  )}

                  {expandedLeaders[groupId] && (
                    <div className="mt-2 bg-gray-100 p-3 rounded-md">
                      {mentors.length > 0 && (
                        <div className="mentors mb-2">
                          <h4 className="font-semibold">🧑‍🏫 Mentors</h4>
                          <ul className="list-disc ml-5">
                            {mentors.map((mentor, index) => (
                              <li key={index}>{mentor}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {mentees.length > 0 && (
                        <div className="mentees">
                          <h4 className="font-semibold">👨‍🎓 Mentees</h4>
                          <ul className="list-disc ml-5">
                            {mentees.map((mentee, index) => (
                              <li key={index}>{mentee}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No groups available.</p>
        )}
    </div>
  </div>
  );
};

export default Chats;
