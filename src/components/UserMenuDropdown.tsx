import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

interface Props {
  onLogout: () => void;
}

export default function UserMenuDropdown({ onLogout }: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex cursor-pointer w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-teal-500 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
          <FaUser aria-hidden="true" className="size-5 text-teal-500" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Profile
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Stats
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Completed Tasks
            </a>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Settings
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Share
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Feedback
            </a>
          </MenuItem>
        </div>
        <div className="py-1"></div>
        <div className="py-1">
          <MenuItem>
            <button
              onClick={onLogout}
              className="flex w-full cursor-pointer gap-2 px-4 py-2 text-sm text-red-500 data-focus:bg-gray-100 data-focus:text-red-600 data-focus:outline-hidden"
            >
              <IoIosLogOut size={18} />
              Logout
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
