'use-client'

import ActionTop from "@/components/ActionTop";
import PaginationTab from "@/components/PaginationTab";
import { getAllUserOrders } from "@/services/AppService";
import { useEffect, useState } from "react"

export default function OrderPage() {
    const [listUserOrders, setListUserOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);

    const onEditIconPressed = () => {

    }

    const onItemPerPageChange = (event) => {
        setItemPerPage(event.target.value);
        setPageCount(listUserOrders.length / event.target.value)
    }

    const statusNumToText = {
        0: "Cancel",
        1: "Processing",
        2: "Packing",
        3: "Shipping",
        4: "Success"
    }

    const initData = async () => {
        setIsLoading(true)
        const userOrderRes = await getAllUserOrders();
        setListUserOrders(userOrderRes.data);
        console.log("User order", userOrderRes.data)

        setPageCount(Math.ceil(userOrderRes.data.length / itemPerPage))
        console.log("Count:", Math.ceil(userOrderRes.data.length / itemPerPage));

        setIsLoading(false);
    }

    useEffect(() => {
        initData();
    }, [])
    return (
        isLoading == false ?
            <>
                <div className="mr-3">


                    <div className="flex flex-row items-center justify-between pt-4">

                        <button onClick={() => onEditIconPressed()} className="bg-mainColor px-6 py-3 rounded-md text-white hover:font-bold">Add</button>
                        <ActionTop onEditPressed={""} onItemPerPageChange={onItemPerPageChange}/>

                    </div>

                    <table className="w-full mt-10">
                        <tr className="">
                            <th className="border">#</th>
                            <th className="border">Total</th>
                            <th className="border">Note</th>
                            <th className="border">Status</th>
                            <th className="border">Receiver</th>
                            <th className="border">shipping Fee</th>
                            <th className="border" colSpan={2}>Action</th>
                        </tr>

                        {listUserOrders.slice((currentPage - 1) * itemPerPage, itemPerPage * currentPage).map(userOrder => {
                            return (
                                <tr className="even:bg-sky-50 " key={userOrder.userOrderID}>
                                    <td className="text-center border py-3">{userOrder.userOrderID}</td>
                                    <td className="text-center border">{userOrder.totalPrice}</td>
                                    <td className="text-center border">{userOrder.note}</td>
                                    <td className="text-center border">{statusNumToText[userOrder.status]}</td>
                                    <td className="text-center border">{userOrder.receiver}</td>
                                    <td className="text-center border">{userOrder.shippingFee}</td>
                                    <td className="text-center border">
                                        <button className="hover:text-reviewColor transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </button>
                                    </td>
                                    <td className="text-center border">
                                        <button className="hover:text-cancelColor transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>

                                        </button>

                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                    <PaginationTab pageCount={pageCount} onPageChange={setCurrentPage} />
                    <div className="h-32"></div>
                </div>
            </>
            : <></>

    )
}