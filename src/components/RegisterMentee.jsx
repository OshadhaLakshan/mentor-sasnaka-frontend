import { useState } from "react";
import { database } from "../firebase/firebase.config"; // Firebase configuration
import { ref, push } from "firebase/database";
import Swal from "sweetalert2";
import useAuth from '../context/useAuth';

const RegisterMentee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const {currentUser} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("All fields are required!");
      return;
    }

    // Add mentor application to Firebase
    const mentorsRef = ref(database, "mentees/");
    push(mentorsRef, {
      name,
      email: currentUser?.email,
      phone,
      status: "pending", // Default status
    });

    // Show submit success message
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Application Submit Successfully",
      showConfirmButton: false,
      timer: 1500
    })
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full border rounded-xl shadow-md p-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-4">Register as a Mentee</h2>
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
            <label className="block text-sm font-semibold mb-2" htmlFor="email">Email Address</label>
            <input                                        
              type="text"
              className="w-full p-2 border rounded"
              value={email}
              disabled
              defaultValue={currentUser?.email}
              placeholder={currentUser?.email} />
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

export default RegisterMentee;
