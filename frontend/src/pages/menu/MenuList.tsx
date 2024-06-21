import React, { useRef, useCallback, useEffect, useState } from "react";
import { Menu } from "./Menu";
import { useParams } from "react-router-dom";
import { API } from "../../api";
import {MenuCategory} from "../../entities/MenuCategory.ts";
import {MenuCategoryComponent} from "./MenuCategoryComponent.tsx"; // Ensure correct import


export const MenuList: React.FC = () => {
    const { restaurantId } = useParams<{ restaurantId: string }>();
    const [categories, setCategories] = useState<MenuCategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const sectionRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({});

    useEffect(() => {
        const api = new API();

        if (!restaurantId) {
            console.log("restaurantId is missing");
            return;
        }

        api.getMenuCategory(restaurantId)
            .then((data) => {
                console.log(data);
                setCategories(data);
                // Initialize refs for each category
                sectionRefs.current = data.reduce((acc, category) => {
                    acc[category.title] = React.createRef<HTMLDivElement>();
                    return acc;
                }, {} as { [key: string]: React.RefObject<HTMLDivElement> });
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to fetch menu categories.");
                setLoading(false);
            });
    }, [restaurantId]);

    const scrollToSection = useCallback((ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="grid md:grid-cols-[280px_1fr] min-h-screen w-full">
            <Menu scrollToSection={scrollToSection} sectionRefs={sectionRefs.current} categories={categories} />
            <main className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12">
                <div className="grid gap-12">
                    {categories.map((category) => (
                        <div key={category.title} ref={sectionRefs.current[category.title]}>
                            <MenuCategoryComponent title={category.title} items={category.items} />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};