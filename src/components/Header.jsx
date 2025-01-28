import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";
import { HiAcademicCap } from "react-icons/hi2";

const Header = () => {
  const {currentUser, logout} = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-gray-900 text-white max-w-screen-2xl shadow-lg mx-auto md:px-6 px-3 md:py-4 py-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
            <Link to="/">
              <HiAcademicCap className="lg:size-8 size-7"/>
            </Link>
          <h1 className="sm:text-2xl md:text-3xl text-md font-primary font-semibold">Mentor-Mentee Platform</h1>
        </div>
        <div>
        {
          currentUser ? 
          <>
          <nav>
            <ul className="flex space-x-4">
            <li>
              <button onClick={handleLogout} className="text-lg font-primary text-gray-900 bg-white py-2 px-10 rounded-full hover:bg-gray-400">
                <Link to="/">Logout</Link>
              </button>
            </li>
            </ul>
          </nav> 
          </> :
          <>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/register"><div className="text-lg font-primary text-gray-900 bg-white py-2 px-10 rounded-full hover:bg-gray-400">Register</div></Link></li>
            </ul>
          </nav>
          </>
        }
        </div>
      </div>
    </header>
  );
};

export default Header;
