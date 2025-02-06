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

  {/* Mentee Registration Section */}
  <div className="max-w-3xl w-full border rounded-xl shadow-md p-6 bg-white mt-8">
    <h2 className="text-3xl font-bold text-center mb-4">Become a Mentee</h2>
    <p className="text-lg mb-4">
      Our mentorship program also welcomes aspiring individuals who want to receive guidance from experienced mentors. As a mentee, you will:
    </p>
    <ul className="list-disc ml-6 mb-4">
      <li>Receive personalized guidance from mentors in your field of interest.</li>
      <li>Achieve your academic and professional goals with expert support.</li>
      <li>Be part of a community committed to growth and success.</li>
    </ul>
    <p className="text-lg mb-4">
      If you're eager to learn and grow with the support of a mentor, apply to become a mentee today!
    </p>
    <button
      className="bg-green-950 text-white px-6 py-3 rounded-lg hover:bg-black"
      onClick={() => navigate("/register-mentee")}
    >
      Register as a Mentee
    </button>
  </div>
</div>

  );
};

export default Mentorship;
