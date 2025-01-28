import React from "react";
import { useNavigate } from "react-router-dom";

const Mentorship = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full border rounded-xl shadow-md p-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-4">Mentorship Program</h2>
        <p className="text-lg mb-4">
          Our mentorship program connects aspiring individuals with experienced mentors who guide them toward achieving their goals. As a mentor, you will:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>Provide guidance to mentees in your area of expertise.</li>
          <li>Help mentees achieve their educational and professional goals.</li>
          <li>Join a community of leaders and make a positive impact.</li>
        </ul>
        <p className="text-lg mb-4">
          If you're passionate about sharing your knowledge and helping others, apply to become a mentor today!
        </p>
        <button
          className="bg-blue-950 text-white px-6 py-3 rounded-lg hover:bg-black"
          onClick={() => navigate("/register-mentor")}
        >
          Register as a Mentor
        </button>
      </div>
    </div>
  );
};

export default Mentorship;
