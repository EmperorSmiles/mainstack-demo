import { User } from "@/types/type";
import { BsChatLeftText } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";

interface UserProp {
  user: User | null;
  onClick: () => void;
}

const UserProfile: React.FC<UserProp> = ({ user, onClick }) => {
  // console.log(user);

  const getInitials = () => {
    if (!user) return "JD";

    const firstInitial = user.first_name?.at(0) || "";
    const lastInitial = user.last_name?.at(0) || "";

    return firstInitial + lastInitial || "JD";
  };
  return (
    <div className="flex justify-center items-center md:gap-6 gap-2">
      <FaRegBell className="text-black/50" />
      <BsChatLeftText className="text-black/60" />
      <div
        className="flex items-center justify-between bg-gray-100 p-2 rounded-3xl w-22  gap-2 hover:cursor-pointer"
        onClick={onClick}
      >
        {/* Large Circle with Initials */}
        <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-700 text-white md:text-sm text-xs font-bold rounded-full">
          {getInitials()}
        </div>
        {/* Hamburger Icon */}
        <FiMenu className="text-gray-600 w-6 h-6" />
      </div>
    </div>
  );
};

export default UserProfile;
