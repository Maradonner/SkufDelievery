import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {API} from "../../api";
import {OrderDetails} from "../../entities/OrderDetails.ts";

const api = new API();

export function getStatusClass(state: string): string {
    switch (state) {
        case "PENDING":
            return "bg-yellow-500";
        case "CONFIRMED":
            return "bg-green-500";
        case "DELIVERED":
            return "bg-green-500";
        case "CANCELLED":
            return "bg-red-500";
        default:
            return "bg-gray-500";
    }
}

export const OrderCheck: React.FC = () => {
    const { orderNumber } = useParams<{ orderNumber: string }>();
    const [order, setOrder] = useState<OrderDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const orderDetails = await api.getOrderDetails(orderNumber!);
                setOrder(orderDetails);
            } catch (err) {
                setError("Failed to fetch order details.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderNumber]);

    const handleConfirm = async () => {
        try {
            await api.confirmOrder(orderNumber!);
            navigate(`/order/${orderNumber}`, { state: { order: { ...order, state: "CONFIRMED" } } });
        } catch (error) {
            console.error("Failed to confirm order:", error);
        }
    };

    const handleDecline = async () => {
        try {
            await api.declineOrder(orderNumber!);
            navigate(`/order/${orderNumber}`, { state: { order: { ...order, state: "DECLINED" } } });
        } catch (error) {
            console.error("Failed to decline order:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!order) {
        return <div>No order details available.</div>;
    }

    return (
        <div className="bg-[#F8F8F8] p-6 rounded-lg shadow max-w-sm mx-auto relative">
            <div className={`absolute top-4 left-4 px-2 py-1 rounded-md text-white text-xs font-medium ${getStatusClass(order.state)}`}>
                {order.state}
            </div>
            <div className="flex justify-between items-center mb-4 mt-8"> {/* Add margin-top to create space */}
                <span className="text-sm font-bold">Order №{order.orderNumber}</span>
                <span className="text-sm">Created {order.createdDate}</span>
            </div>
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Address</h3>
                <p>{order.address}</p>
            </div>
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Order Contents</h3>
                {order.items.map((item, index) => (
                    <div key={index} className="mb-4 flex justify-between items-center">
                        <div className="flex items-center">
                            <img
                                alt={item.name}
                                className="w-10 h-10 rounded-full mr-2"
                                src={item.imageSrc}
                                style={{
                                    aspectRatio: "1",
                                    objectFit: "cover",
                                }}
                                width="40"
                                height="40"
                            />
                            <span>{item.name}</span>
                        </div>
                        <div>
                            <span>{item.price}₽</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Payment</h3>
                <div className="flex justify-between mb-2">
                    <span>Cost of goods</span>
                    <span>{order.totalCost}₽</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Delivery cost</span>
                    <span>{order.deliveryCost}₽</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Service fee</span>
                    <span>{order.serviceFee}₽</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">{order.totalAmount}₽</span>
                </div>
            </div>
            {order.state === "PENDING" && (
                <div className="flex justify-between mt-4">
                    <button onClick={handleConfirm} className="bg-green-500 text-white px-4 py-2 rounded-md">Confirm</button>
                    <button onClick={handleDecline} className="bg-red-500 text-white px-4 py-2 rounded-md">Decline</button>
                </div>
            )}
        </div>
    );
};