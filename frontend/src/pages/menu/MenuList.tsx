import React, { useRef, useCallback } from "react";
import { Menu } from "./Menu";
import { MenuCategory } from "./MenuCategory.tsx";
import {MenuListProps} from "../../models/menu/MenuListProps.ts";


export const MenuList: React.FC<MenuListProps> = ({ categories }) => {
    const sectionRefs = categories.reduce((acc, category) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        acc[category.title] = useRef<HTMLDivElement>(null);
        return acc;
    }, {} as { [key: string]: React.RefObject<HTMLDivElement> });

    const scrollToSection = useCallback((ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    return (
        <div className="grid md:grid-cols-[280px_1fr] min-h-screen w-full">
            <Menu scrollToSection={scrollToSection} sectionRefs={sectionRefs} categories={categories} />
            <main className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12">
                <div className="grid gap-12">
                    {categories.map((category) => (
                        <div key={category.title} ref={sectionRefs[category.title]}>
                            <MenuCategory title={category.title} items={category.items} />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
