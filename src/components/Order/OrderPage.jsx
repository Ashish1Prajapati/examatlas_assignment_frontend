import React, { useEffect, useState } from 'react'
import { OrderList } from './OrderList'
import { Button } from '../ui/button'
import Header from '../Navbar/Header'
import { useNavigate } from 'react-router-dom'
import { getAllOrder } from '../../api/order'

const extractOrderData = (order,orderId,status) => {
    const { order_items, length, breadth, height, weight, billing_address, shipping_address, sub_total } = order;
    const productName = order_items.length > 0 ? order_items[0].name : null;
    const dimensions = `${length} x ${breadth} x ${height}`;
    const extractedData = {
        productName,
        dimensions,
        weight,
        address: billing_address || shipping_address,
        amount: sub_total,
        orderId: orderId,
        status:status
    };

    return extractedData;
};

const OrderPage = () => {
    const [data, setData] = useState([])  
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate("/order/create")
    }

    const getOrders = async () => {
        try {
            const response = await getAllOrder()
            if (response.success) {
                const extractedData = response.orders.map((order) => extractOrderData(order.orderDetails,order?.orderId,order?.status));
               console.log("extractedData",extractedData)
                setData(extractedData);
            } else {
                console.log("Failed to fetch orders.")
            }
        } catch (err) {
            console.log("Error occurred while fetching orders.")
        } finally {
            // setLoading(false)
        }
    }

    useEffect(() => {
        getOrders()
    }, [])
    console.log(data)
    return (
        <>
            <Header />
            <div className='flex flex-col container py-20'>
                <div className='flex justify-end'>
                    <Button onClick={handleNavigate}>
                        Create new order
                    </Button>
                </div>
                {<OrderList data={data} />}
            </div>
        </>
    )
}

export default OrderPage;
