import Image from "next/image";
import HomeIcon from "../../../public/icons/Menu.png";
import ProfileIcon from "../../../public/icons/Profile.png";

export default function HomeNavBar() {
  return (
    <nav className="flex items-center justify-between p-4">
      <div>
        <Image src={HomeIcon} alt="Menu Button" width={30} />
      </div>
      <div className="h-[45] w-[45] rounded-full border border-solid border-indigo-700 bg-white flex justify-center p-2 drop-shadow-lg">
        <Image src={ProfileIcon} alt="Profile Icon" className="rounded-full" />
      </div>
    </nav>
  );
}
