import { BsChatLeftText } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";

const UserProfile = () => {
  return (
    <div className="flex justify-center items-center gap-6">
      <FaRegBell className="text-black/50" />
      <BsChatLeftText className="text-black/60" />
      <div className="flex items-center justify-between bg-gray-100 p-2 rounded-3xl w-22 gap-2 hover:cursor-pointer">
        {/* Large Circle with Initials */}
        <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-700 text-white text-sm font-bold rounded-full">
          OJ
        </div>
        {/* Hamburger Icon */}
        <FiMenu className="text-gray-600 w-6 h-6" />
      </div>
    </div>
  );
};

export default UserProfile;
