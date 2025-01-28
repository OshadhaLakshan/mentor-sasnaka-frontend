import React, { useState } from "react";
import { database, auth } from "../firebase/firebase.config"; // Firebase configuration
import { ref, push } from "firebase/database";

const RegisterMentor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [expertise, setExpertise] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !expertise) {
      alert("All fields are required!");
      return;
    }

    // Add mentor application to Firebase
    const mentorsRef = ref(database, "mentors/");
    push(mentorsRef, {
      name,
      email,
      expertise,
      phone,
      status: "pending", // Default status
    });

    alert("Your application has been submitted!");
    setName("");
    setEmail("");
    setPhone("");
    setExpertise("");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full border rounded-xl shadow-md p-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-4">Register as a Mentor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Phone</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Expertise</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-950 text-white px-6 py-3 rounded-lg hover:bg-black"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterMentor;
