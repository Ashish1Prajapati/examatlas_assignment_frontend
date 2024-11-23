import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Header from "../Navbar/Header";
import { useNavigate } from "react-router-dom";
import { CreateOrder } from "../../api/order";
import toast from "react-hot-toast";

const statesOfIndia = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const orderSchema = z.object({
    productName: z.string().min(1, "Product name is required"),
    weight: z.string().min(1, "Weight is required"),
    address: z.string().min(3, "Shipping address is required"),
    city: z.string().min(1, "Shipping city is required"),
    pincode: z.string().regex(/^\d{6}$/, "Enter a valid pincode"),
    state: z.string().min(1, "Shipping state is required"),
    phone: z.string().regex(/^\d{10}$/, "Enter a valid phone number"),
    units: z.string().min(1, "Units must be at least 1"),
    price: z.string().min(1, "Selling price must be at least 1"),
    length: z.string().min(1, "Length must be at least 1"),
    breadth: z.string().min(1, "Breadth must be at least 1"),
    height: z.string().min(1, "Height must be at least 1"),
    paymentMethod: z.string().min(1, "Payment method is required"),
});
const fields = [
    { name: "productName", label: "Product Name", placeholder: "Enter product name" },
    { name: "weight", label: "Weight (kg)", placeholder: "Enter weight in kg" },
    { name: "address", label: "Shipping Address", placeholder: "Enter shipping address" },
    { name: "city", label: "Shipping City", placeholder: "Enter shipping city" },
    { name: "pincode", label: "Shipping Pincode", placeholder: "Enter 6-digit pincode" },
    { name: "phone", label: "Shipping Phone", placeholder: "Enter 10-digit phone number" },
    { name: "units", label: "Units", placeholder: "Enter units", type: "number" },
    { name: "price", label: "Selling Price", placeholder: "Enter price", type: "number" },
    { name: "hsn", label: "HSN", placeholder: "Enter HSN" },
    { name: "length", label: "Length", placeholder: "Enter length", type: "number" },
    { name: "breadth", label: "Breadth", placeholder: "Enter breadth", type: "number" },
    { name: "height", label: "Height", placeholder: "Enter height", type: "number" },
]
const OrderCreationPage = () => {
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            productName: "",
            weight: "",
            address: "",
            city: "",
            pincode: "",
            state: "",
            phone: "",
            units: "",
            price: "",
            hsn: "",
            length: "",
            breadth: "",
            height: "",
            paymentMethod: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            const obj={
                orderDetails:data
            }       
            const response = await CreateOrder(obj);
            if (response?.success) {
                toast.success("Order created successfully!");
                form.reset();
            }
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="container py-20">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="text-start border rounded-md">
                        <div className="bg-neutral-200 p-2 flex items-center">
                            <h2 className="text-base md:text-xl text-black">Create A New Order</h2>
                        </div>
                        <div className="p-4  grid grid-cols-1 md:grid-cols-2 gap-5">
                            {fields.map(({ name, label, placeholder, type = "text" }) => (
                                <FormField
                                    key={name}
                                    control={form.control}
                                    name={name}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{label}</FormLabel>
                                            <FormControl>
                                                <Input type={type} placeholder={placeholder} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Shipping State</FormLabel>
                                        <FormControl>
                                            <select {...field} className="w-full p-2 border rounded-md">
                                                <option value="">Select state</option>
                                                {statesOfIndia.map((state) => (
                                                    <option key={state} value={state}>
                                                        {state}
                                                    </option>
                                                ))}
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="paymentMethod"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Payment Method</FormLabel>
                                        <FormControl>
                                            <select {...field} className="w-full p-2 border rounded-md">
                                                <option value="">Select payment method</option>
                                                <option value="Prepaid">Prepaid</option>
                                                <option value="COD">Cash on Delivery</option>
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-between p-4">
                            <Button onClick={() => navigate(-1)} variant="secondary" className="min-w-36">Cancel</Button>
                            <Button className="min-w-36" type="submit">Create Order</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
};

export default OrderCreationPage;
