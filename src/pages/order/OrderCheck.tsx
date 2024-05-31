import React from "react";
import {OrderDetails} from "../../entities/OrderDetails.ts";

export const OrderCheck: React.FC<{ orderDetails: OrderDetails }> = ({ orderDetails }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow max-w-sm">
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold">Order №{orderDetails.orderNumber}</span>
                <span className="text-sm">Created {orderDetails.createdDate}</span>
            </div>
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Address</h3>
                <p>{orderDetails.address}</p>
            </div>
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Order Contents</h3>
                {orderDetails.items.map((item, index) => (
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
                    <span>{orderDetails.totalCost}₽</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Delivery cost</span>
                    <span>{orderDetails.deliveryCost}₽</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Service fee</span>
                    <span>{orderDetails.serviceFee}₽</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">{orderDetails.totalAmount}₽</span>
                </div>
            </div>
        </div>
    );
};