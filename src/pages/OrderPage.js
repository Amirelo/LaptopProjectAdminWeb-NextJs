'use-client'

import ActionTop from "@/components/ActionTop";
import EditOrderTab from "@/components/EditOrderTab";
import PaginationTab from "@/components/PaginationTab";
import { getAllUserOrders } from "@/services/AppService";
import { AuthContext } from "@/services/AuthContext";
import { priceFormat } from "@/utils/helper";
import { useContext, useEffect, useState } from "react"

export default function OrderPage() {
    const {searchText} = useContext(AuthContext);

    const [listUserOrders, setListUserOrders] = useState([]);
    const [listSort,setListSort] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);

    const [currentOrder, setCurrentOrder] = useState({});
    const [showEditTab, setShowEditTab] = useState(false);

    const [dataChange,setDataChange] = useState(true);
    const [sortType, setSortType] = useState();

    const onEditIconPressed = (item) => {
        setCurrentOrder(item);
        setShowEditTab(true);
    }

    const onFinishedHandlingItem = () => {
        setCurrentOrder({});
        setShowEditTab(false);
        setDataChange(!dataChange);
    }

    const onItemPerPageChange = (event) => {
        setItemPerPage(event.target.value);
        setPageCount(listUserOrders.length / event.target.value)
    }

    const statusArr = {
        0: "Cancel",
        1: "Processing",
        2: "Packing",
        3: "Delivering",
        4: "Completed",
    }

    const dataSort = () => {
        let myList = [...listUserOrders]
        if (searchText != null) {
            myList = myList.filter(item => ((item.receiver+" "+item.totalPrice +" " +statusArr[item.status] +" "+item.pendingDate +" "+item.prepareDate+" "+item.deliveryDate +" "+item.arrivedDate).toLowerCase().includes(searchText.toLowerCase())));
        }

        switch (sortType) {
            default:
                myList.sort((a, b) => a.userOrderID - b.userOrderID)
        }
        myList.sort((a, b) => b.status - a.status)
        console.log(myList)
        setPageCount(Math.ceil(myList.length / itemPerPage))
        console.log("Count:", Math.ceil(myList.length / itemPerPage));

        return setListSort(myList)
    }

    const initData = async () => {
        const userOrderRes = await getAllUserOrders();
        setListUserOrders(userOrderRes.data);
        setListSort(userOrderRes.data);
        console.log("User order", userOrderRes.data)

        setPageCount(Math.ceil(userOrderRes.data.length / itemPerPage))
        console.log("Count:", Math.ceil(userOrderRes.data.length / itemPerPage));
    }

    useEffect(() => {
        initData();
    }, [dataChange])

    useEffect(() => {
        dataSort();
    }, [searchText])

    return (
        isLoading == false ?
            <>
                <div className="mr-3">

                    {showEditTab ?
                        <EditOrderTab item={currentOrder} onBackgroundPressed={() => setShowEditTab(false)} onDeletePress={onFinishedHandlingItem} />
                        : <></>}

                    <ActionTop setAddButtonDisplay={false} onItemPerPageChange={onItemPerPageChange} />

                    <table className="w-full mt-10">
                        <tr className="">
                            <th className="border">#</th>
                            <th className="border">Receiver</th>
                            <th className="border">Note</th>
                            <th className="border">shipping Fee</th>
                            <th className="border">Total</th>
                            <th className="border w-2/12">Status</th>
                        </tr>

                        {listSort.slice((currentPage - 1) * itemPerPage, itemPerPage * currentPage).map(userOrder => {
                            return (
                                <tr className="even:bg-sky-50 " key={userOrder.userOrderID}>
                                    <td className="text-center border py-3">{userOrder.userOrderID}</td>
                                    <td className="text-center border">{userOrder.receiver}</td>
                                    <td className="text-center border">{userOrder.note}</td>
                                    <td className="text-center border">{priceFormat(userOrder.shippingFee)}</td>
                                    <td className="text-center border">{priceFormat(userOrder.totalPrice)}</td>
                                    <td className={`text-processColor border text-center font-medium ${userOrder.status == 1 ? "animate-bounce text-processingColor" : userOrder.status == 0 ? "text-cancelColor" : userOrder.status == 3 ? "text-reviewColor" : userOrder.status == 4 ? "text-acceptColor" : ""}`}>
                                        {userOrder.status < 4 ?
                                            <button onClick={() => onEditIconPressed(userOrder)} className="hover:font-bold">{statusArr[userOrder.status]}</button>
                                            :
                                            <p>{statusArr[userOrder.status]}</p>}
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