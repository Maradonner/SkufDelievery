export interface OrderDetails {
    orderNumber: string;
    createdDate: string;
    address: string;
    items: OrderItem[];
    totalCost: number;
    deliveryCost: number;
    serviceFee: number;
    totalAmount: number;
}