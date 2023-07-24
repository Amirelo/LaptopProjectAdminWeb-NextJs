import { getAllBrands, getAllMemories, getAllOperSys, getAllProcessors, getAllScreens, getAllStorages, insertBrand, insertOperSys, insertProdct, insertScreen, updateBrandByID, updateOperSys, updateProduct, updateScreen, updateUserOrderStatus } from "@/services/AppService";
import { dataCheck } from "@/utils/helper";
import { memo, useEffect, useState } from "react"

export default function EditOrderTab({ onBackgroundPressed, onDeletePress, item }) {
    const [itemOS, setItemOS] = useState(item ? item.OS : "");
    const [itemOrderID, setItemOrderID] = useState(item ? "TSTRN" + item.userOrderID : "");
    const [itemStatus, setItemStatus] = useState(item ? item.status : "");

    const statusArr = [
        "Cancel",
        "Processing",
        "Packing",
        "Delivering",
        "Completed",
    ]


    const onEditButtonPressed = async () => {
        const res = await updateUserOrderStatus(item.userOrderID, item.userID, itemStatus, statusArr[itemStatus].toUpperCase());
        console.log(res)
        onDeletePress()
    }

    return (
        <div className=" w-full h-full top-0 left-0 absolute">
            <button onClick={onBackgroundPressed} className="bg-gray-600/20 fixed w-full h-full "></button>
            <div className="absolute w-1/2 left-1/4 top-8 h-fit rounded-2xl bg-inputBackgroundColor border border-inputBorderColor">
                <h1 className="text-center  text-2xl pt-5 font-bold">{item ? "Edit Order Status" : ""}</h1>
                <div className="flex flex-row items-center justify-center mx-4 mt-6">
                    <p className="w-1/4 mr-2">Order number</p>
                    <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Order number" contentEditable='false' value={itemOrderID} />
                </div>


                <div className="flex flex-row items-center justify-center mx-4 mt-6">
                    <p className="w-1/4 mr-2">Order status</p>
                    <select onChange={event => setItemStatus(event.target.value)} className="bg-mainSubColor w-3/4 self-center text-center flex flex-1 py-2 mt-4 border rounded-md">


                        {statusArr.map((curItem, index) => {
                            if(index!=1){
                            return (
                                <option selected={item ? index == item.status ? "selected" : "" : ""} value={index} key={index}>{curItem}</option>
                            )
                            }
                        })
                        }
                    </select>
                </div>

                <div className="flex flex-row items-center justify-around mt-6">
                    <button onClick={onBackgroundPressed} className="bg-reviewColor hover:font-bold text-white px-4 py-2 rounded-md">Cancel</button>
                    <button disabled={item.status!= itemStatus? false:true} onClick={onEditButtonPressed} className={`${item.status != itemStatus? "bg-acceptColor hover:font-bold":"disabled:bg-acceptColor/50"}  text-white px-4 py-2 rounded-md`}>Confirm</button>
                </div>
                <div className="h-6" />
            </div>
        </div>
    )
}