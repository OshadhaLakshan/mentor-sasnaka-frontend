import { useEffect, useState } from "react";
import { database } from "../firebase/firebase.config";
import { ref, onValue, update, remove, push } from "firebase/database";
import Swal from 'sweetalert2'

const AdminDashboard = () => {
  const [groups, setGroups] = useState({});
  const [expandedLeaders, setExpandedLeaders] = useState({});

  const [leaders, setLeaders] = useState([]);
  const [approvedMentors, setApprovedMentors] = useState([]);
  const [notApprovedMentors, setNotApprovedMentors] = useState([]);
  const [mentees, setMentees] = useState([]);

  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupLeader, setNewGroupLeader] = useState("");
  const [newGroupMentors, setNewGroupMentors] = useState([]);
  const [newGroupMentees, setNewGroupMentees] = useState([]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => 
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Copied ${text}`,
          showConfirmButton: false,
          timer: 1500
        })
      .catch(() => 
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to copy",
          showConfirmButton: false,
          timer: 1500
        })
    ))
  };

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
    

  // Fetch Mentors, Leaders & Mentees
  useEffect(() => {
    const mentorsRef = ref(database, "mentors/");
    onValue(mentorsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedMentors = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setLeaders(formattedMentors.filter((mentor) => mentor.role === "leader"));
        setApprovedMentors(formattedMentors.filter((mentor) => mentor.status === "accepted" && mentor.role !== "leader"));
        setNotApprovedMentors(formattedMentors.filter((mentor) => mentor.status !== "accepted" && mentor.role !== "leader"));
      } else {
        setLeaders([]);
        setApprovedMentors([]);
        setNotApprovedMentors([]);
      }
    });

    const menteesRef = ref(database, "mentees/");
    onValue(menteesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedMentees = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMentees(formattedMentees);
      } else {
        setMentees([]);
      }
    });
  }, []);

  const handleAccept = (id) => {
    update(ref(database, `mentors/${id}`), { status: "accepted" }, { role: "mentor" });
  };

  const handlePromote = (id) => {
    update(ref(database, `mentors/${id}`), { role: "leader" });
  };

  const handleDemote = (id) => {
    update(ref(database, `mentors/${id}`), { role: "mentor" });
  };

  const handleRemove = (id, type) => {
    remove(ref(database, type === "mentee" ? `mentees/${id}` : `mentors/${id}`));
  };

  // Toggle dropdown visibility
  const toggleLeaderDropdown = (groupId) => {
    setExpandedLeaders((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  // Create New Group
  const handleCreateGroup = () => {
    const newGroup = {
      name: newGroupName,
      participants: {
        leader: newGroupLeader,
        mentors: newGroupMentors,
        mentees: newGroupMentees,
      },
    };

    const groupsRef = ref(database, "groups");
    const newGroupRef = push(groupsRef);
    update(newGroupRef, newGroup)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Group created successfully!",
          showConfirmButton: false,
          timer: 1500
        });
        setNewGroupName("");
        setNewGroupLeader("");
        setNewGroupMentors([]);
        setNewGroupMentees([]);
      })
      .catch(() => 
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to create group",
          showConfirmButton: false,
          timer: 1500
        }));
  };

  return (
    <div className="admin-dashboard flex flex-col items-center justify-center m-4 p-4">
      <h2 className="text-3xl font-bold text-center mb-4">Admin Dashboard</h2>

      {/* Create Group Form */}
      <div className="bg-white md:w-[calc(100vh-225px)] p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-bold mb-4">Create New Group</h3>
        <input
          type="text"
          className="border p-2 rounded w-full mb-4"
          placeholder="Group Name"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 rounded w-full mb-4"
          placeholder="Leader ID"
          value={newGroupLeader}
          onChange={(e) => setNewGroupLeader(e.target.value)}
        />
        <textarea
          className="border p-2 rounded w-full mb-4"
          placeholder="Mentors (comma separated IDs)"
          value={newGroupMentors.join(", ")}
          onChange={(e) => setNewGroupMentors(e.target.value.split(",").map((mentor) => mentor.trim()))}
        />
        <textarea
          className="border p-2 rounded w-full mb-4"
          placeholder="Mentees (comma separated IDs)"
          value={newGroupMentees.join(", ")}
          onChange={(e) => setNewGroupMentees(e.target.value.split(",").map((mentee) => mentee.trim()))}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreateGroup}
        >
          Create Group
        </button>
      </div>

{/* Groups Section */} 
<div className="bg-white md:w-[calc(100vh-225px)] mb-6">
  <h3 className="text-2xl text-center font-bold mb-4">Groups & Participants</h3>
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
                <span>👑 {leader.length < 15 ? leader : leader.substring(0, 10) + "..."} (Leader)</span>
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


      {/* Mentors & Mentees Management Section */}
      <div className="bg-white md:w-[calc(100vh-225px)] p-6 justify-items-center rounded-lg shadow-md">
        <h3 className="text-2xl text-center font-bold mb-4">Mentor & Mentee Management</h3>

        <h4 className="text-xl font-semibold mt-6 mb-3">Appointed Leaders</h4>
        <ul>
          {leaders.map((leader) => (
            <li key={leader.id} className="border-b py-4 justify-between items-center">
              <div>
                <h3 className="font-bold">{leader.name}</h3>
                {/* Email ID */}
                <h2 className="text-lg font-semibold">Leader ID:</h2>
                <ul className="space-y-2">                
                    <li className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
                      <span className="text-gray-500 text-lg px-3 font-mono">{leader.email.length < 25 ? leader.email : leader.email.substring(0, 20) + "..."}</span>
                      <button
                        className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-800 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        onClick={() => copyToClipboard(leader.email)}
                      >
                        Copy
                      </button>
                    </li>
                </ul>
              </div>
              <div className="flex mt-3 gap-2">
                <button className="bg-purple-500 text-white px-4 py-2 rounded" onClick={() => handleDemote(leader.id)}>Demote</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleRemove(leader.id, "mentor")}>Remove</button>
              </div>
            </li>
          ))}
        </ul>

        <h4 className="text-xl font-semibold mt-6 mb-3">Approved Mentors</h4>
        <ul>
          {approvedMentors.map((mentor) => (
            <li key={mentor.id} className="border-b py-4 justify-between items-center">
              <div>
                <h3 className="font-bold">{mentor.name}</h3>
                {/* Email ID */}
                <h2 className="text-lg font-semibold">Mentor ID:</h2>
                <ul className="space-y-2">                
                    <li className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
                      <span className="text-gray-500 text-lg px-3 font-mono">{mentor.email.length < 25 ? mentor.email : mentor.email.substring(0, 20) + "..."}</span>
                      <button
                        className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-800 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        onClick={() => copyToClipboard(mentor.email)}
                      >
                        Copy
                      </button>
                    </li>
                </ul>
              </div>
              <div className="flex mt-3 gap-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handlePromote(mentor.id)}>Promote</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleRemove(mentor.id, "mentor")}>Remove</button>
              </div>
            </li>
          ))}
        </ul>

        <h4 className="text-xl font-semibold mt-6 mb-3">Pending Approval</h4>
        <ul>
          {notApprovedMentors.map((mentor) => (
            <li key={mentor.id} className="border-b py-4 justify-between items-center">
              <div>
                <h3 className="font-bold">{mentor.name}</h3>
                {/* Email ID */}
                <h2 className="text-lg font-semibold">Mentor ID:</h2>
                <ul className="space-y-2">                
                    <li className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
                      <span className="text-gray-500 text-lg px-3 font-mono">{mentor.email.length < 25 ? mentor.email : mentor.email.substring(0, 20) + "..."}</span>
                      <button
                        className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-800 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        onClick={() => copyToClipboard(mentor.email)}
                      >
                        Copy
                      </button>
                    </li>
                </ul>
              </div>
              <div className="flex mt-3 gap-2">
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleAccept(mentor.id)}>Accept</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleRemove(mentor.id, "mentor")}>Remove</button>
              </div>
            </li>
          ))}
        </ul>

        <h4 className="text-xl font-semibold mt-6 mb-3">Mentees</h4>
        <ul>
          {mentees.map((mentee) => (
            <li key={mentee.id} className="border-b py-4 justify-between items-center">
              <div>
                <h3 className="font-bold">{mentee.name}</h3>
                {/* Email ID */}
                <h2 className="text-lg font-semibold">Mentee ID:</h2>
                <ul className="space-y-2">                
                    <li className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
                      <span className="text-gray-500 text-lg px-3 font-mono">{mentee.email.length < 25 ? mentee.email : mentee.email.substring(0, 20) + "..."}</span>
                      <button
                        className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-800 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        onClick={() => copyToClipboard(mentee.email)}
                      >
                        Copy
                      </button>
                    </li>
                </ul>
              </div>
              <button className="bg-red-500 text-white px-4 py-2 mt-3 rounded" onClick={() => handleRemove(mentee.id, "mentee")}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
