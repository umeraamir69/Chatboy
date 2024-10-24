import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useContext } from 'react';
import { GlobalContext } from '../../../context';

export default function Navbar() {
  const { isSidebarOpen, isOpen, toggleOpen, toggleSidebar } = useContext(GlobalContext);

  const handleMenuClick = () => {
    toggleOpen();
    if (!isOpen) {
      !isSidebarOpen && toggleSidebar();
    }
  };

  return (
    <Disclosure as="nav" className="bg-blue-950 fixed top-0 left-0 right-0 z-20 py-1">
      <div className="w-full px-4">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            <button 
              className='text-white text-3xl cursor-pointer lg:hidden focus:outline-none'
              onClick={handleMenuClick}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <IoMdClose /> : <IoMdMenu />}
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt="User avatar"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-10 w-10 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem>
                  {({ active }) => (
                    <a href="#" className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}>
                      Your Profile
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <a href="#" className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}>
                      Settings
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <a href="#" className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}>
                      Sign out
                    </a>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}