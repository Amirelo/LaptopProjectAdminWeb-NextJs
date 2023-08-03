'use client'

import AnalyticTab from '@/components/AnalyticTab'
import { priceFormat } from '@/utils/helper';
import { getAllBrands, getAllProduct, getAllUserOrders, getAllUsers } from '@/services/AppService';
import { useEffect, useState } from 'react';
import ProductListItem from '@/components/ProductListItem';
import UserOrderList from '@/components/UserOrderList';
import { ArcElement, BarController, BarElement, CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Ticks, Title, Tooltip } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import EditOrderTab from '@/components/EditOrderTab';

Chart.register(LinearScale, CategoryScale, BarElement, ArcElement,
    Title, Legend, ChartDataLabels, Tooltip, PointElement, LineElement)

export default function DashboardPage() {
    const [listProducts, setListProducts] = useState([]);
    const [listUserOrders, setListUserOrders] = useState([]);
    const [listBrands, setListBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [totalRevenue, setTotalRevenue] = useState(0);
    const [todayRevenue, setTodayRevenue] = useState(0);
    const [todayOrder, setTodayOrder] = useState(0);

    const [currentOrder, setCurrentOrder] = useState({});
    const [showEditTab, setShowEditTab] = useState(false);

    const [dataChange, setDataChange] = useState(true);

    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    const currentYear = new Date().getFullYear();
    const currentDate = currentYear + "-" + currentMonth + "-" + currentDay;


    const month = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",]

    const checkMonth = (receivedMonth) => {
        if ((currentMonth + receivedMonth) < 12) {
            return month[currentMonth + receivedMonth]
        } else {
            return month[currentMonth + receivedMonth - 12]
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
            if (order.pendingDate == currentDate && order.status != 0) {
                setTodayOrder(prev => prev + 1);
            }
            if (order.status > 2) {
                setTotalRevenue(prev => prev + order.totalPrice);
                if (order.pendingDate == currentDate) {
                    setTodayRevenue(prev => prev + order.totalPrice);
                }
            }
        })

        setIsLoading(false)
    }

    const getMonthRevenue = (month) => {
        let monthRevenue = 0;

        listUserOrders.map(order => {
            if (order.status > 2 && parseInt(order.deliveryDate.slice(5, 7)) == month) {
                monthRevenue += order.totalPrice;
            }
        })

        return monthRevenue;
    }

    const getMonthlyOrders = (month, type) => {
        let total = 0;
        if (type == null) {
            listUserOrders.map(order => {
                if (parseInt(order.pendingDate.slice(5, 7)) == month) {
                    total++;
                }
            })
        } else {
            listUserOrders.map(order => {
                if (order.status == type && parseInt(order.pendingDate.slice(5, 7)) == month) {
                    total++;
                }
            })
        }



        return total;
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

    const getProductBrandRating = (brand) => {
        let total = 0;
        let index = 0;
        listProducts.map(prod => {
            if (prod.brandID == brand) {
                total += prod.totalRating;
                index++;
            }
        })
        return (total/index).toFixed(1);
    }

    const onEditIconPressed = (item) => {
        setCurrentOrder(item);
        setShowEditTab(true);
    }

    const onFinishedHandlingItem = () => {
        setCurrentOrder({});
        setShowEditTab(false);
        setDataChange(!dataChange);
    }

    const data = {
        labels: [checkMonth(-5), checkMonth(-4), checkMonth(-3), checkMonth(-2), checkMonth(-1), checkMonth(0)],
        datasets: [
            {
                label: ['Sales'],
                backgroundColor: ['#95B2E5', '#D3A1E5', '#E6D2AF', '#C5E8CF', '#B5E9AA', '#E8B7D1'],
                data: [getMonthRevenue(currentMonth - 4), getMonthRevenue(currentMonth - 3), getMonthRevenue(currentMonth - 2), getMonthRevenue(currentMonth - 1), getMonthRevenue(currentMonth), getMonthRevenue(currentMonth + 1)],
            }

        ]
    }

    const OrderAmountDetailData = {
        labels: [checkMonth(-5), checkMonth(-4), checkMonth(-3), checkMonth(-2), checkMonth(-1), checkMonth(0)],
        datasets: [
            {
                stack: 'stack1',
                type: 'bar',
                label: 'Total orders',
                backgroundColor: ['#95B2E5', '#D3A1E5', '#E6D2AF', '#C5E8CF', '#B5E9AA', '#E8B7D1'],
                data: [getMonthlyOrders(currentMonth - 4), getMonthlyOrders(currentMonth - 3), getMonthlyOrders(currentMonth - 2), getMonthlyOrders(currentMonth - 1), getMonthlyOrders(currentMonth), getMonthlyOrders(currentMonth + 1)]
            },
            {
                label: statusArr[4],
                stack: 'stack2',
                backgroundColor: ['#ADDE8E'],
                data: [getMonthlyOrders(currentMonth - 4, 4), getMonthlyOrders(currentMonth - 3, 4), getMonthlyOrders(currentMonth - 2, 4), getMonthlyOrders(currentMonth - 1, 4), getMonthlyOrders(currentMonth, 4), getMonthlyOrders(currentMonth + 1, 4)]
            },
            {
                label: statusArr[3],
                stack: 'stack2',
                backgroundColor: ['#F5F29D'],
                data: [getMonthlyOrders(currentMonth - 4, 3), getMonthlyOrders(currentMonth - 3, 3), getMonthlyOrders(currentMonth - 2, 3), getMonthlyOrders(currentMonth - 1, 3), getMonthlyOrders(currentMonth, 3), getMonthlyOrders(currentMonth + 1, 3)]
            },
            {
                label: statusArr[2],
                stack: 'stack2',
                backgroundColor: ['#9B9B9B'],
                data: [getMonthlyOrders(currentMonth - 4, 2), getMonthlyOrders(currentMonth - 3, 2), getMonthlyOrders(currentMonth - 2, 2), getMonthlyOrders(currentMonth - 1, 2), getMonthlyOrders(currentMonth, 2), getMonthlyOrders(currentMonth + 1, 2)]
            }
            ,
            {
                label: statusArr[1],
                stack: 'stack2',
                backgroundColor: ['#8586EF'],
                data: [getMonthlyOrders(currentMonth - 4, 1), getMonthlyOrders(currentMonth - 3, 1), getMonthlyOrders(currentMonth - 2, 1), getMonthlyOrders(currentMonth - 1, 1), getMonthlyOrders(currentMonth, 1), getMonthlyOrders(currentMonth + 1, 1)]
            },
            {
                label: statusArr[0],
                stack: 'stack2',
                backgroundColor: ['#F09083'],
                data: [getMonthlyOrders(currentMonth - 4, 0), getMonthlyOrders(currentMonth - 3, 0), getMonthlyOrders(currentMonth - 2, 0), getMonthlyOrders(currentMonth - 1, 0), getMonthlyOrders(currentMonth, 0), getMonthlyOrders(currentMonth + 1, 0)]
            }
        ]
    }

    const pieData = {
        labels: listBrands.filter(item => item.status == 1).map(brand => { if (brand.status == 1) { return (brand.name) } }),
        datasets: [
            {
                type: 'pie',
                label: 'Sales',
                backgroundColor: ['#1B98F2', '#EB6F6B', '#252726', '#7674F5', '#06E127', '#0BE1B9', '#F76C0A', '#E0A901', '#E0CC8B', '#D900E0',"#F5B54F"],
                data: listBrands.map(brand => { return (getProductBrandTotalRevenue(brand.brandID)) }),


            }
        ]
    }

    const pieRatingData = {
        labels: listBrands.filter(item => item.status == 1).map(brand => { if (brand.status == 1) { return (brand.name) } }),
        datasets: [
            {
                type: 'pie',
                label: 'Sales',
                backgroundColor: ['#1B98F2', '#EB6F6B', '#252726', '#7674F5', '#06E127', '#0BE1B9', '#F76C0A', '#E0A901', '#E0CC8B', '#D900E0',"#F5B54F"],
                data: listBrands.map(brand => { return (getProductBrandRating(brand.brandID)) }),


            }
        ]
    }



    useEffect(() => {
        initData();
    }, [dataChange])


    return (
        isLoading == false ?
            <>
                {/* Analytics */}
                <div className='mt-8'>

                    {showEditTab ?
                        <EditOrderTab item={currentOrder} onBackgroundPressed={() => setShowEditTab(false)} onDeletePress={onFinishedHandlingItem} />
                        : <></>}


                    <p className='font-bold'>Analytics</p>
                    {/* Analytic tab */}
                    <div className='flex flex-row justify-between pr-4'>
                        <AnalyticTab name={"Total revenue"} amount={priceFormat(totalRevenue)} percent={todayRevenue != 0 ? '+ ' + (todayRevenue / totalRevenue).toFixed(1) + "%" : "+ 0%"} />
                        <AnalyticTab name={"This month revenue"} amount={priceFormat(getMonthRevenue(currentMonth + 1))} percent={todayRevenue != 0 ? (todayRevenue / getMonthRevenue(currentMonth + 1)).toFixed(1) + "%" : "+ 0%"} />
                        <AnalyticTab name={"Total order"} amount={listUserOrders.length + ' orders'} percent={todayOrder != 0 ? todayOrder / listUserOrders.length : "+ 0%"} />
                        <AnalyticTab name={"Low stock product"} amount={getLowProducts() + ' products'} />
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
                                {listUserOrders.sort((a, b) => b.pendingDate.localeCompare(a.pendingDate)).slice(0, 6).map(userOrder => {
                                    return (
                                        <tr className="even:bg-sky-50" key={userOrder.userOrderID}>
                                            <td className='border text-center '>TSTRN{userOrder.userOrderID}</td>
                                            <td className='border text-center'>{userOrder.pendingDate}</td>
                                            <td className={`text-processColor border text-center font-medium ${userOrder.status == 1 ? "animate-bounce text-processingColor" : userOrder.status == 0 ? "text-cancelColor" : userOrder.status == 3 ? "text-reviewColor" : userOrder.status == 4 ? "text-acceptColor" : ""}`}>
                                                {userOrder.status <= 3 ?
                                                    <button onClick={() => onEditIconPressed(userOrder)} className="hover:font-bold">{statusArr[userOrder.status]}</button>
                                                    :
                                                    <p>{statusArr[userOrder.status]}</p>}
                                            </td>
                                        </tr>
                                    )
                                }
                                )

                                }
                            </table>

                        </div>
                    </div>
                    <div className='w-1/2 h-64 mx-10'>
                        <Bar options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Revenue last 6 months'
                                },
                                legend: {
                                    display: false
                                },
                                datalabels: {
                                    display: false
                                }

                            }
                        }} data={data}></Bar>
                    </div>
                </div>
                <p className='font-bold mt-6'>Order status</p>
                    <div className='h-64 mx-10'>
                    
                        <Bar options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Order status last 6 months'
                                },
                                legend: {
                                    display: false
                                },
                                datalabels:{
                                    display:'auto',
                                },
                                scales: {
                                    xAxes: [{
                                        stacked: true
                                    }],
                                    yAxes: [{
                                        stacked: true
                                    }]
                                }

                            }
                        }} data={OrderAmountDetailData}></Bar>
                    
                </div>

                <p className='font-bold mt-6'>Top Sales</p>
                <div className='flex flex-row h-96'>
                    <div className='w-2/5 h-96'>
                        <Pie options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Product Sales By Brand (6 months)',
                                },
                                datalabels: {
                                    formatter: (value, ctx) => {
                                        const datapoints = ctx.chart.data.datasets[0].data
                                        const total = datapoints.reduce((total, datapoint) => total + datapoint, 0)
                                        const percentage = value / total * 100
                                        if (percentage == 0) {
                                            return ""
                                        } else {
                                            return percentage.toFixed(1) + "%";
                                        }
                                    },
                                    color:'white',
                                    display:'auto'
                                },
                            }
                        }} data={pieData}></Pie>
                    </div>
                    <div className=' w-3/5 mx-4'>
                        
                        <div className='min-h-100 bg-inputBackgroundColor border border-inputBorderColor mt-3 '>
                            <table className='w-full border table-fixed'>
                                <tr className='border'>
                                    <th className='w-4/5'>Product Name</th>
                                    <th>Total sale</th>
                                </tr>
                                {listProducts.sort((a, b) => b.sold - a.sold).slice(0, 6).map(prod => {
                                    if (prod.sold > 0) {
                                        return (
                                            <tr className='even:bg-sky-50' key={prod.productID}>
                                                <td className='border text-center line-clamp-2 overflow-hidden'>{prod.productName}</td>
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


                <p className='font-bold mt-6'>Top Rating</p>
                <div className='flex flex-row h-96 mt-2'>
                    
                    <div className=' w-3/5 mx-4'>
                        
                        <div className='min-h-100 bg-inputBackgroundColor border border-inputBorderColor mt-3 '>
                            <table className='w-full border table-fixed'>
                                <tr className='border'>
                                    <th className='w-4/5'>Product Name</th>
                                    <th>Total rating</th>
                                </tr>
                                {listProducts.sort((a, b) => b.totalRating - a.totalRating).slice(0, 6).map(prod => {
                                    if (prod.sold > 0) {
                                        return (
                                            <tr className='even:bg-sky-50' key={prod.productID}>
                                                <td className='border text-center line-clamp-2 overflow-hidden'>{prod.productName}</td>
                                                <td className='border text-center'>{prod.totalRating}</td>
                                            </tr>
                                        )
                                    }
                                }
                                )

                                }
                            </table>

                        </div>
                    </div>
                    <div className='w-2/5 h-96'>
                        <Pie options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Total Rating By Brand (6 months)',
                                },
                                datalabels: {
                                    
                                    color:'white',
                                    display:'auto'
                                },
                            }
                        }} data={pieRatingData}></Pie>
                    </div>
                </div>

                <div className='h-12'></div>

            </>
            : <></>

    )

}