import React, { useEffect, useState } from "react";
import { database } from "../firebase/firebase.config";
import { ref, onValue, update, remove } from "firebase/database";

const AdminDashboard = () => {
  const [mentors, setMentors] = useState([]);
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const mentorsRef = ref(database, "mentors/");
    onValue(mentorsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedMentors = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMentors(formattedMentors.filter((mentor) => mentor.role !== "leader"));
        setLeaders(formattedMentors.filter((mentor) => mentor.role === "leader"));
      } else {
        setMentors([]);
        setLeaders([]);
      }
    });
  }, []);

  const handleAccept = (id) => {
    const mentorRef = ref(database, `mentors/${id}`);
    update(mentorRef, { status: "accepted" });
  };

  const handlePromote = (id) => {
    const mentorRef = ref(database, `mentors/${id}`);
    update(mentorRef, { role: "leader" });
  };

  const handleRemove = (id) => {
    const mentorRef = ref(database, `mentors/${id}`);
    remove(mentorRef);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full border rounded-xl shadow-md p-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-4">Admin Dashboard</h2>

        <h3 className="text-2xl font-bold mb-4">Approved Mentors</h3>
        <ul>
          {mentors.map((mentor) => (
            <li
              key={mentor.id}
              className="border-b py-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{mentor.name}</h3>
                <p>Email: {mentor.email}</p>
                <p>Phone: {mentor.phone}</p>
                <p>Expertise: {mentor.expertise}</p>
                <p>Status: {mentor.status}</p>
                {mentor.role && <p>Role: {mentor.role}</p>}
              </div>
              <div className="md:flex md:gap-2">
                {mentor.status === "pending" && (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => handleAccept(mentor.id)}
                  >
                    Accept
                  </button>
                )}
                {mentor.status === "accepted" && !mentor.role && (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handlePromote(mentor.id)}
                  >
                    Promote to Leader
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-4 py-2 my-2 rounded"
                  onClick={() => handleRemove(mentor.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-bold mt-8 mb-4">Leaders</h3>
        <ul>
          {leaders.map((leader) => (
            <li
              key={leader.id}
              className="border-b py-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{leader.name}</h3>
                <p>Email: {leader.email}</p>
                <p>Phone: {leader.phone}</p>
                <p>Expertise: {leader.expertise}</p>
                <p>Role: {leader.role}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 my-2 rounded"
                  onClick={() => handleRemove(leader.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
