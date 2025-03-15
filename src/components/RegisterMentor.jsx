import { useState } from "react";
import { database } from "../firebase/firebase.config"; // Firebase configuration
import { ref, push } from "firebase/database";
import Swal from "sweetalert2";
import useAuth from '../context/useAuth';
import { Link } from "react-router-dom";

const RegisterMentor = () => {

  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    nic: "",
    university: "",
    degree: "",
    year: "",
    result: "",
    experience: "",
    expertise: "",
  });

  const { currentUser } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    for (let key in formData) {
      if (!formData[key]) {
        alert("All fields are required!");
        return;
      }
    }

    // Add mentor application to Firebase
    const mentorsRef = ref(database, "mentors/");
    push(mentorsRef, {
      ...formData,
      email: currentUser?.email || formData.email,
      status: "pending", // Default status
    });

    // Show submit success message
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Application Submitted Successfully",
      showConfirmButton: false,
      timer: 1500,
    });

    setFormData({
      name: "",
      phone: "",
      email: currentUser?.email,
      district: "",
      nic: "",
      university: "",
      degree: "",
      year: "",
      result: "",
      experience: "",
      expertise: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full border rounded-xl shadow-md p-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-4">Register as a Mentor</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div className="mb-4" key={key}>
              <label className="block text-sm font-semibold mb-2 capitalize">{key}</label>
              <input
                type={key === "password" ? "password" : "text"}
                name={key}
                className="w-full p-2 border rounded"
                value={formData[key]}
                onChange={handleChange}
                required
                disabled={key === "email" && currentUser?.email}
                placeholder={key === "email" && currentUser?.email ? currentUser.email : ""}
              />
            </div>
          ))}
          <div className="inline-flex pb-3 items-center">
            <input
              type="checkbox"
              id="billing_same"
              className="form-checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <label htmlFor="billing_same" className="ml-2">
              I am an active
              <Link to={"https://www.sasnaka.org/"} className="underline px-1 text-blue-600">
                Sasnaka Sansada
              </Link>
              Member.
            </label>
          </div>
          <button
            type="submit"            
            disabled={!isChecked}
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
