'use client'

import AnalyticTab from '@/components/AnalyticTab'
import { priceFormat } from '@/utils/helper';
import { getAllBrands, getAllProduct, getAllUserOrders, getAllUsers } from '@/services/AppService';
import { useEffect, useState } from 'react';
import ProductListItem from '@/components/ProductListItem';
import UserOrderList from '@/components/UserOrderList';
import { ArcElement, BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(LinearScale, CategoryScale, BarElement, ArcElement, Title, Legend,ChartDataLabels,Tooltip)

export default function DashboardPage() {
    const [listProducts, setListProducts] = useState([]);
    const [listUserOrders, setListUserOrders] = useState([]);
    const [listBrands, setListBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [totalRevenue, setTotalRevenue] = useState(0);

    const currentDate = new Date().getMonth();
    const month = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",]

    const checkMonth = (receivedMonth) => {
        if ((currentDate + receivedMonth) < 12) {
            return month[currentDate + receivedMonth]
        } else {
            return month[currentDate + receivedMonth - 12]
        }
    }



    const statusArr = {
        0: "Cancel",
        1: "Processing",
        2: "Packing",
        3: "Delivering",
        4: "Completed",
    }

    const initData = async () => {
        setIsLoading(true)
        const productRes = await getAllProduct();
        setListProducts(productRes.data);


        const userOrderRes = await getAllUserOrders();
        setListUserOrders(userOrderRes.data);
        console.log("User order", userOrderRes.data)

        const brandRes = await getAllBrands();
        setListBrands(brandRes.data);

        setTotalRevenue(0);
        userOrderRes.data.map(order => {
            if (order.status > 2) {
                setTotalRevenue(prev => prev + order.totalPrice);
            }
        })


        setIsLoading(false)
    }

    const getMonthRevenue = (month) => {
        let monthRevenue = 0;
        console.log("Month", month)

        listUserOrders.map(order => {
            console.log("date month", order.deliveryDate ? parseInt(order.deliveryDate.slice(5, 7)) : 0)
            if (order.status > 2 && parseInt(order.deliveryDate.slice(5, 7)) == month) {
                console.log("Found")
                monthRevenue += order.totalPrice;
            }
        })

        return monthRevenue;
    }

    const getLowProducts = () => {
        let data = [];
        listProducts.map(prod => {
            if (prod.productQuantity < 5) {
                data = prev => [prev, prod]
            }
        })
        return data.length;
    }

    const getProductBrandTotalRevenue = (brand) => {
        let total = 0;
        listProducts.map(prod => {
            if (prod.brandID == brand && prod.sold > 0) {
                total += prod.currentPrice * prod.sold
            }
        })
        return total;

    }


    const data = {
        labels: [checkMonth(-5), checkMonth(-4), checkMonth(-3), checkMonth(-2), checkMonth(-1), checkMonth(0)],
        datasets: [
            {
                label: 'Sales',
                backgroundColor: ['#87bc45', '#b33dc6', '#b3d4ff'],
                data: [getMonthRevenue(currentDate - 4), getMonthRevenue(currentDate - 3), getMonthRevenue(currentDate - 2), getMonthRevenue(currentDate - 1), getMonthRevenue(currentDate), getMonthRevenue(currentDate + 1)],
            }
        ]
    }

    const pieData = {
        labels: listBrands.filter(item=>item.status==1).map(brand => { if(brand.status ==1 ){return (brand.name)} }),
        datasets: [
            {
                type: 'pie',
                label: 'Sales',
                backgroundColor: ['#1B98F2', '#DC0C00', '#252726', '#D1DFDB', '#06E127', '#0BE1B9', '#F76C0A', '#E0A901', '#E0CC8B', '#D900E0'],
                data: listBrands.map(brand => { return (getProductBrandTotalRevenue(brand.brandID)) }),


            }
        ]
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
                        <AnalyticTab name={"Total revenue"} amount={priceFormat(totalRevenue)} percent={'+ 5%'} />
                        <AnalyticTab name={"This month revenue"} amount={priceFormat(getMonthRevenue(currentDate + 1))} percent={'+ 1%'} />
                        <AnalyticTab name={"Total order"} amount={listUserOrders.length + ' orders'} percent={'+ 3%'} />
                        <AnalyticTab name={"Low stock product"} amount={getLowProducts() + ' products'} percent={'+ 5%'} />
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
                                {listUserOrders.sort((a, b) => b.userOrderID - a.userOrderID).slice(0, 6).map(userOrder => {
                                    return (
                                        <tr key={userOrder.userOrderID}>
                                            <td className='border text-center '>TSTRN{userOrder.userOrderID}</td>
                                            <td className='border text-center'>{userOrder.pendingDate}</td>
                                            <td className='text-processColor border text-center hover:font-bold'><button>{statusArr[userOrder.status]}</button></td>
                                        </tr>
                                    )
                                }
                                )

                                }
                            </table>

                        </div>
                    </div>
                    <div className='w-3/5 h-64 mx-10'>
                        <Bar options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Revenue last 6 months'
                                },

                            }
                        }} data={data}></Bar>
                    </div>
                </div>

                <div className='flex flex-row h-64 mt-10'>
                    <div className='w-2/5 h-64'>
                        <Pie options={{
                            maintainAspectRatio: false, maintainAspectRatio: false,
                            responsive: true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Product Sales By Brand (6 months)'
                                },
                                datalabels:{
                                    formatter: (value, ctx) => {
                                        const datapoints = ctx.chart.data.datasets[0].data
                                         const total = datapoints.reduce((total, datapoint) => total + datapoint, 0)
                                        const percentage = value / total * 100
                                        if(percentage ==0 ){
                                            return ""
                                        } else{
                                        return percentage.toFixed(2) + "%";
                                        }
                                      },
                                },
                            }
                        }} data={pieData}></Pie>
                    </div>
                    <div className=' w-3/5 mx-4'>
                        <p className='font-bold'>Top Products</p>
                        <div className='min-h-100 bg-inputBackgroundColor border border-inputBorderColor mt-3 '>
                            <table className='w-full border table-fixed'>
                                <tr className='border'>
                                    <th>Product Name</th>
                                    <th>Total sale</th>
                                </tr>
                                {listProducts.sort((a,b)=>b.sold-a.sold).slice(0, 6).map(prod => {
                                    if (prod.sold>0) {
                                        return (
                                            <tr className='even:bg-sky-50' key={prod.productID}>
                                                <td className='border text-center truncate overflow-hidden'>{prod.productName}</td>
                                                <td className='border text-center'>{prod.sold}</td>
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