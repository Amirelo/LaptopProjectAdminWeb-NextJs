'use client'

import AnalyticTab from '@/components/AnalyticTab'
import { priceFormat } from '@/utils/helper';
import { getAllProduct, getAllUserOrders, getAllUsers } from '@/services/AppService';
import { useEffect, useState } from 'react';
import ProductListItem from '@/components/ProductListItem';
import UserOrderList from '@/components/UserOrderList';
import { CategoryScale, ArcElement,Chart } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(ArcElement)

export default function DashboardPage() {
    const [listProducts, setListProducts] = useState([]);
    const [listUsers, setListUsers] = useState([]);
    const [listUserOrders, setListUserOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const data = {
        labels: "First dataset",
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [0, 10, 5, 2, 20, 30, 45],
            },
        ],
    };

    const initData = async () => {
        setIsLoading(true)
        const productRes = await getAllProduct();
        setListProducts(productRes.data);

        const userRes = await getAllUsers();
        setListUsers(userRes.data);

        const userOrderRes = await getAllUserOrders();
        setListUserOrders(userOrderRes.data);
        console.log("User order", userOrderRes.data)

        setIsLoading(false)
    }

    <Pie data={listProducts}></Pie>



    useEffect(() => {
        initData();
    }, [])


    return (
        isLoading == false ?
            <>

                {/* Analytics */}
                <div className='mt-16'>
                    <p className='font-bold'>Analytics</p>
                    {/* Analytic tab */}
                    <div className='flex flex-row justify-between pr-4'>
                        <AnalyticTab name={"Total revenue"} amount={priceFormat(300000000)} percent={'+ 5%'} />
                        <AnalyticTab name={"Today revenue"} amount={priceFormat(16000000)} percent={'+ 1%'} />
                        <AnalyticTab name={"Total order"} amount={'36 orders'} percent={'+ 3%'} />
                        <AnalyticTab name={"Low stock product"} amount={'6 products'} percent={'+ 5%'} />
                    </div>
                </div>


                <div className='mt-8'>
                    <p className='font-bold'>Order need processing</p>
                    <div className='w-2/5 min-h-100 bg-inputBackgroundColor border border-inputBorderColor mt-3'>
                        <table className='w-full border table-fixed'>
                            <tr className='border'>
                                <th>Order number</th>
                                <th>Order date</th>
                                <th>Status</th>
                            </tr>
                            {listUserOrders.map(userOrder => {
                                console.log("item:", userOrder)
                                if (userOrder.status == 1) {
                                    return (
                                        <tr key={userOrder.userOrderID}>
                                            <td className='border text-center '>TSTRN{userOrder.userOrderID}</td>
                                            <td className='border text-center'>{userOrder.pendingDate}</td>
                                            <td className='text-processColor border text-center hover:font-bold'><button>processing</button></td>
                                        </tr>
                                    )
                                }
                            }
                            )

                            }
                        </table>

                    </div>
                </div>
                <Pie data={data}></Pie>
                <ProductListItem productData={(listProducts)} />
            </>
            : <></>

    )

}