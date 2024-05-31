import React from "react";

export interface MenuProps {
    scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
    sectionRefs: { [key: string]: React.RefObject<HTMLDivElement> };
    categories: { title: string }[];
}