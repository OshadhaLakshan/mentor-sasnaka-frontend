import useAuth from "../context/useAuth";

const ProfileCard = ({ name, expertise, img }) => {

  const {currentUser} = useAuth()

  return (
    <div className="border shadow-md p-4 bg-slate-200 justify-items-center">
    <img src={`african-man (${img}).png`} alt={`${name}`} className="w-24 h-24 mx-auto mb-8" />
    <p className="font-semibold text-xl mb-2">{`Mentor #00${name}`}</p>
    <p className="text-gray-600 mb-4">{expertise}</p>
      <button className="text-2xl font-primary text-white bg-blue-950 py-3 px-9 rounded-full hover:bg-black">
        {
          !currentUser ? "Request" : "Connect"
        }
      </button>
    </div>
  );
};

export default ProfileCard;
