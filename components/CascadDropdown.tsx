import { useState, useEffect, useRef, SetStateAction, MouseEvent } from 'react';
import { ArrowsRightLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const CascadDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [subMenuOpen, setSubMenuOpen] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [subMenuTop, setSubMenuTop] = useState(0); // Step 1: State to hold the submenu top position
    const dropdownRef = useRef(null);

    const subMenus = [
        { id: 1, label: "美容个护", options: ["鞋子", "帽子", "Option 1-3", "Option 1-24"] },
        { id: 2, label: "数码家电", options: ["Option 12-1", "Option 1-2", "Option 1-3", "Option 1-c4"] },
        { id: 3, label: "家居百货", options: ["Option 12s-1", "Option 1-2", "Option 1-3", "Option 1-4"] },
        { id: 4, label: "鞋帽", options: ["Option 1-s1", "Option 1-2", "Option 1-d3", "Option 1s-4"] },
        { id: 5, label: "箱包", options: ["Option 1-1", "Option 1s-2", "Option 1-3", "Option 1-4bv"] },
    ];

    useEffect(() => {
        const handleClickOutside = (event: { target: any; }) => {
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
    };

    // Step 2: Update the onMouseEnter event to set the submenu's top position
    const handleMouseEnter = (menuId: number | SetStateAction<null>, event: MouseEvent<HTMLDivElement, MouseEvent>) => {
        setSubMenuOpen(menuId);
        setSubMenuTop(event.currentTarget.offsetTop);
    };

    return (
        <div className="relative z-50" ref={dropdownRef}>
            <div className='text-sm border rounded-md pl-3 flex items-center'>
                <span className='pr-3 border-r mr-3'>商品类型</span>
                <button onClick={() => setIsOpen(!isOpen)} className="py-3 textblack flex items-center gap-2 hover:text-emerald-600">
                    {selectedOption || "选择商品类型"}
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
