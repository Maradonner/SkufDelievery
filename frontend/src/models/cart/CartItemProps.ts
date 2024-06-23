export interface CartItemProps {
    id: number;
    cartId: string;
    productId: number;
    quantity: number;
    price: number;
    name: string;
    weight: string;
    imageSrc: string;
}