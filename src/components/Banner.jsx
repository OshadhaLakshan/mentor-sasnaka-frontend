import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";

const Banner = () => {

  const {currentUser} = useAuth()

    return (
      <div className="md:grid grid-cols-2 items-center justify-between bg-[#778a96]">
        {/* Logo Section */}
        <div className="grid grid-raws-2 pb-0 md:pb-10 pt-10 px-20"><div
            className="relative mx-auto w-60 h-60 flex items-center justify-center"
            style={{ animationDuration: '60s' }}
        >
            <img
            src="/fav-icon.png"
            alt="Logo"
            className="w-full h-full filter drop-shadow-[0_0_2rem_rgba(187,308,341,0.7)] hover:filter hover:drop-shadow-[0_0_3rem_rgba(97,218,251,0.7)]"
            />
        </div>
        <div
            className="relative md:mx-auto mt-10 md:mb-0 w-60 h-30 flex items-center justify-center mb-10"
            style={{ animationDuration: '60s' }}
        >
            <img
            src="/mentorlogo.png"
            alt="Logo"
            className="w-full h-full filter drop-shadow-[0_0_2rem_rgba(87,208,241,0.7)] hover:filter hover:drop-shadow-[0_0_3rem_rgba(97,218,251,0.7)]"
            />
        </div></div>
  
        {/* Content Section */}
        <div className="md:ml-8 ml-0 flex-1 pb-10 px-7">
          <h1 className="md:text-5xl text-2xl md:text-left text-center font-bold text-blue-950 mb-4">Mentor-Mentee Platform</h1>
          <p className="text-blue-950 md:text-left text-center px-1 mb-6">
          The Mentor-Mentee platform is designed to bridge the gap between mentors and mentees by fostering meaningful connections and facilitating skill development, career growth, and personal enrichment. This platform enables mentors to share their knowledge and expertise while mentees gain valuable guidance, resources, and opportunities for professional and personal development.
          </p>
  
          {/* Action Buttons */}
          <div className="md:flex md:gap-4">
            {
              !currentUser ? <Link to="/mentorship">
              <div className="md:text-2xl text-xl font-primary text-white bg-blue-950 py-3 px-9 rounded-full hover:bg-black md:mb-0 mb-4">
                Join Us               
              </div>
              </Link> : <Link to="/chats">
              <div className="md:text-2xl text-xl font-primary text-white bg-blue-950 py-3 px-9 rounded-full hover:bg-black md:mb-0 mb-4">
                Chats
              </div>
              </Link>
            }
            <div className="flex items-center gap-4 rounded-full bg-white md:mx-8">
            {
              !currentUser ? <Link to="/rateus">
              <div className="md:text-2xl text-xl font-primary text-white bg-blue-950 py-3 px-9 rounded-full hover:bg-black md:mb-0">
                Rate Us               
              </div>
              </Link> : <Link to="/schedule">
              <div className="md:text-2xl text-xl font-primary text-white bg-blue-950 py-3 px-9 rounded-full hover:bg-black md:mb-0">
                Scheduled
              </div>
              </Link>
            }
            
              {
                !currentUser ? 
                <span className="md:text-2xl text-xl text-orange-400 pr-8">
                  ★★★★★
                </span> : 
                <span className="md:text-2xl text-xl text-gray-800 pr-8">Meetings</span>
              }  
            
          </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Banner;
  