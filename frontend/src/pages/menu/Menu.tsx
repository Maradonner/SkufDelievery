import React from "react";
import { useNavigate } from "react-router-dom";
import { MenuProps } from "../../models/menu/MenuProps";
import {BackIcon, MinusIcon} from "../shared/Icon.tsx";

export const Menu: React.FC<MenuProps> = ({ scrollToSection, sectionRefs, categories }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);  // Navigate back to the previous page
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 sticky top-0 self-start">
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button onClick={handleBack}>
                        <BackIcon className="w-5 h-5" />
                    </button>
                </div>
                <nav className="grid gap-2">
                    {categories.map((category) => (
                        <button
                            key={category.title}
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                            onClick={() => scrollToSection(sectionRefs[category.title])}
                        >
                            <MinusIcon className="w-5 h-5" />
                            {category.title}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};
