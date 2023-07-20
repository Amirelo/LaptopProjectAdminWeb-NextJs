'use client'

import AnalyticTab from '@/components/AnalyticTab'
import { priceFormat } from '@/utils/helper';
import { getAllProduct, getAllUserOrders, getAllUsers } from '@/services/AppService';
import { useEffect, useState } from 'react';
import ProductListItem from '@/components/ProductListItem';
import UserOrderList from '@/components/UserOrderList';
import { ArcElement, BarController, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

Chart.register(LinearScale, CategoryScale, BarElement,ArcElement)

export default function DashboardPage() {
    const [listProducts, setListProducts] = useState([]);
    const [listUsers, setListUsers] = useState([]);
    const [listUserOrders, setListUserOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const data = {
        labels: ['February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'GitHub Commits',
                backgroundColor: '#f87979',
                data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
            }
        ]
    }

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

                <div className='flex flex-row h-64 mt-8'>
                    <div className=' w-2/5'>
                        <p className='font-bold'>Latest orders</p>
                        <div className='min-h-100 bg-inputBackgroundColor border border-inputBorderColor mt-3 '>
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
                    <div className='w-3/5 h-64 mx-10'>
                        <Bar options={{ maintainAspectRatio: false }} data={data}></Bar>
                    </div>
                </div>

                <div className='flex flex-row h-64 mt-10'>
                <div className='w-2/5 h-64'>
                        <Pie options={{ maintainAspectRatio: false }} data={data}></Pie>
                    </div>
                    <div className=' w-3/5 mx-4'>
                        <p className='font-bold'>Top Products</p>
                        <div className='min-h-100 bg-inputBackgroundColor border border-inputBorderColor mt-3 '>
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
                    
                </div>

                <div className='h-12'></div>

            </>
            : <></>

    )

}