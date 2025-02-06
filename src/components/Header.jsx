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
              <HiAcademicCap className="lg:size-8 size-6"/>
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
              <button onClick={handleLogout} className="md:text-lg text-sm font-primary text-gray-900 bg-white md:py-2 py-1 md:px-10 px-3 rounded-full hover:bg-gray-400">
                <Link to="/">Logout</Link>
              </button>
            </li>
            </ul>
          </nav> 
          </> :
          <>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/register"><div className="md:text-lg text-sm font-primary text-gray-900 bg-white md:py-2 py-1 md:px-10 px-3 rounded-full hover:bg-gray-400">Register</div></Link></li>
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
