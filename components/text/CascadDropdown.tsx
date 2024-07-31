'use client'

import { useState, useEffect, useRef, SetStateAction, MouseEvent } from 'react';
import { ArrowsRightLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const CascadDropdown = ( {onChange}:{onChange: (val:any) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [subMenuOpen, setSubMenuOpen] = useState<any>(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [subMenuTop, setSubMenuTop] = useState(0); // Step 1: State to hold the submenu top position
    const dropdownRef = useRef(null);

    const subMenus = [
        { id: 1, label: "beautyAndPersonalCare", options: ["shoe", "hat", "Option 1-3", "Option 1-24"] },
        { id: 2, label: "digitalHomeAppliances", options: ["Option 12-1", "Option 1-2", "Option 1-3", "Option 1-c4"] },
        { id: 3, label: "homeDepartmentStore", options: ["Option 12s-1", "Option 1-2", "Option 1-3", "Option 1-4"] },
        { id: 4, label: "shoesAndHats", options: ["Option 1-s1", "Option 1-2", "Option 1-d3", "Option 1s-4"] },
        { id: 5, label: "luggage", options: ["Option 1-1", "Option 1s-2", "Option 1-3", "Option 1-4bv"] },
    ];

    useEffect(() => {
        const handleClickOutside = (event: { target: any; }) => {
            // @ts-ignore
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setSubMenuOpen(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const handleOptionClick = (option: SetStateAction<string>) => {
        setSelectedOption(option);
        setIsOpen(false); // Close the menu after selection
        onChange && onChange(option);
    };

    // Step 2: Update the onMouseEnter event to set the submenu's top position
    const handleMouseEnter = (menuId: number | SetStateAction<null>, event: any) => {
        setSubMenuOpen(menuId);
        setSubMenuTop(event.currentTarget.offsetTop);
    };

    return (
        <div className="relative z-50" ref={dropdownRef}>
            <div className='text-sm border rounded-md pl-3 flex items-center'>
                <span className='pr-3 border-r mr-3'>productTypes</span>
                <button onClick={() => setIsOpen(!isOpen)} className="py-3 textblack flex items-center gap-2 hover:text-emerald-600">
                    {selectedOption || "selectProductType"}
                    <ArrowsRightLeftIcon className="h-3 w-3" aria-hidden="true" />
                </button>
            </div>
            {isOpen && (
                <div className="absolute left-20 bg-white shadow-md mt-1 border rounded-md">
                    {subMenus.map((menu) => (
                        <div
                            key={menu.id}
                            onMouseEnter={(e) => handleMouseEnter(menu.id, e)} // Updated to include event parameter
                        >
                            <button className="flex px-5 py-3 gap-2 text-sm items-center text-gray-700 hover:bg-gray-50 hover:text-emerald-600 w-full text-left">
                                {menu.label}
                                <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
                            </button>
                            {subMenuOpen === menu.id && (
                                <div
                                    className="absolute left-full top-0 w-48 bg-white shadow-md border rounded-md "
                                    style={{ top: `${subMenuTop}px` }} // Step 3: Apply dynamic top position
                                >
                                    {menu.options.map((option, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600 ${selectedOption === option ? 'bg-gray-50 text-emerald-600' : ''}`}
                                            onClick={() => handleOptionClick(option)}
                                        >
                                            {option}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CascadDropdown;
