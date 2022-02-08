import React, { useState } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

const NavbarItem = ({ title, classProps }) => <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;

const Navbar = () => {
  const [isToggleMenuOn, setToggleMenu] = useState(false);
  return (
    <nav className='w-full p-4 flex md:justify-center items-center justify-between '>
      <ul className='text-white list-none hidden md:flex flex-row justify-between items-center flex-initial'>
        {["Marker", "Exchange", "Tutorials", "Wallets"].map((itemName, index) => (
          <NavbarItem key={itemName + index} title={itemName} />
        ))}
        <li className='bg-cyan-500 hover:bg-cyan-900 ease-linear duration-200 mx-4 px-7 py-2 text-center rounded-full cursor-pointer '>Login</li>
      </ul>

      {/* Mobile view */}
      <div className='flex relative md:hidden'>
        {isToggleMenuOn ? (
          <FaToggleOn fontSize={28} className='text-white cursor-pointer' onClick={() => setToggleMenu(false)} />
        ) : (
          <FaToggleOff fontSize={28} className='text-white cursor-pointer' onClick={() => setToggleMenu(true)} />
        )}

        {isToggleMenuOn && (
          <ul className='text-white fixed z-10 top-0 -right-1 p-3 w-[50vw] h-screen shadow-2xl flex flex-col items-end rounded-md blue-glassmorphism'>
            {["Marker", "Exchange", "Tutorials", "Wallets"].map((itemName, index) => (
              <NavbarItem key={itemName + index} title={itemName} classProps={"text-xl my-2"} />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
