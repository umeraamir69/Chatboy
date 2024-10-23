import React  ,{ useContext , useEffect ,useRef } from 'react';
import { useRouter } from 'next/router';
import { FaUsers, FaHotel } from "react-icons/fa";
import { MdFastfood, MdFlight ,MdDashboard } from "react-icons/md";
import { BsStripe } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { PiCarProfileFill } from "react-icons/pi";
import { IoMdCash , IoMdClose} from "react-icons/io";
import { GlobalContext } from '../../../context';
import Link from 'next/link';
const Data = [
  {
    icon: MdDashboard,
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: FaUsers,
    title: "Users",
    link: "/Users",
  },
  {
    icon: FaHotel,
    title: "Hotel Booking",
    link: "/HotelBooking",
  },
  {
    icon: PiCarProfileFill,
    title: "Uber Booking",
    link: "/UberBooking",
  },
  {
    icon: MdFastfood,
    title: "Food Booking",
    link: "/FoodBooking",
  },
  {
    icon: MdFlight,
    title: "Flight Booking",
    link: "/FlightBooking",
  },
  {
    icon: IoMdCash,
    title: "Payment",
    link: "/Payment",
  },
  {
    icon: BsStripe,
    title: "Stripe",
    link: "/Stripe",
  },
  {
    icon: IoSettingsSharp,
    title: "Settings",
    link: "/Settings",
  },
];

const DashboardSidebar = () => {
  const router = useRouter();
  const { isSidebarOpen, isOpen, toggleOpen } = useContext(GlobalContext);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth >= 1024) return;
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleOpen();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, toggleOpen]);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={toggleOpen}
        />
      )}

      {/* Sidebar */}
      <aside 
        ref={sidebarRef}
        className={`
          fixed lg:sticky top-0
          h-screen
          bg-blue-950 
          transition-all duration-300
          z-30
          ${isSidebarOpen ? "w-64" : "w-20"} 
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="h-full flex flex-col p-5">
          {/* Mobile close button */}
          <button
            onClick={toggleOpen}
            className="absolute top-4 right-4 text-white text-2xl lg:hidden"
          >
            <IoMdClose />
          </button>

          <div className="flex justify-center mb-6">
            <img src="/images/log.png" alt="Logo" width={140} height={140} />
          </div>
          
          <nav className="flex-1 mt-6">
            {Data.map((item, index) => {
              const isActive = router.pathname === item.link;
              return (
                <Link href={item.link} key={index}>
                  <div 
                    className={`
                      flex items-center
                      ${isSidebarOpen ? "px-4" : "justify-center px-2"} 
                      ${isActive ? "bg-purple-500" : "hover:bg-purple-500"} 
                      text-white py-2 mt-2 rounded-xl cursor-pointer
                    `}
                  >
                    <item.icon className="text-xl" />
                    {isSidebarOpen && (
                      <span className="ml-3 text-md font-medium">
                        {item.title}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;