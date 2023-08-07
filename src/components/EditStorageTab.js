import { getAllBrands, getAllMemories, getAllOperSys, getAllProcessors, getAllScreens, getAllStorages, insertBrand, insertProdct, insertScreen, insertStorage, updateBrandByID, updateProduct, updateScreen, updateStorage } from "@/services/AppService";
import { dataCheck } from "@/utils/helper";
import { memo, useEffect, useState } from "react"

export default function EditStorageTab({ onBackgroundPressed, onDeletePress, item }) {
    const [itemType, setItemType] = useState(item ?item.type : "");
    const [itemMaxSlots, setItemMaxSlots] = useState(item ?item.maxSlots : "");
    const [itemAvailableSlots, setItemAvailableSlots] = useState(item ?item.availableSlots : "");
    const [itemCurrentStorage, setItemCurrentStorage] = useState(item ?item.currentStorage : "");

    const onEditButtonPressed = async () => {
        if (item != null) {
            // update
            const res =await updateStorage(item.storageID,itemType, itemMaxSlots, itemAvailableSlots, itemCurrentStorage,item.status);
            console.log(res)
        } else {
            //insert
            const res =await insertStorage(itemType,itemMaxSlots, itemAvailableSlots, itemCurrentStorage);
            console.log(res)
        }
        onDeletePress()
    }


    return (
        <div className=" w-full h-full top-0 left-0 absolute">
            <button onClick={onBackgroundPressed} className="bg-gray-600/20 fixed w-full h-full "></button>
            <div className="absolute w-1/2 left-1/3 top-8 h-fit rounded-2xl bg-secondaryColor border">
                <h1 className="text-center  text-2xl pt-5 font-bold text-white">{item ? "Edit Storage" : "Add Storage"}</h1>
                <div className="flex flex-row items-center justify-center mx-4 mt-6">
                    <p className="w-1/4 mr-2 text-white">Type</p>
                    <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Type" onChange={event => setItemType(event.target.value)} value={itemType} />
                </div>

                <div className="flex flex-row items-center justify-center mx-4 mt-6">
                    <p className="w-1/4 mr-2 text-white">Current Storage</p>
                    <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Current Storage" onChange={event => setItemCurrentStorage(event.target.value)} value={itemCurrentStorage} />
                </div>

                <div className="flex flex-row items-center justify-center mx-4 mt-6">
                    <p className="w-1/4 mr-2 text-white">Max Slots</p>
                    <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Max Slots" onChange={event => setItemMaxSlots(event.target.value)} value={itemMaxSlots} />
                </div>

                <div className="flex flex-row items-center justify-center mx-4 mt-6">
                    <p className="w-1/4 mr-2 text-white">Avail Slots</p>
                    <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Available Slots" onChange={event => setItemAvailableSlots(event.target.value)} value={itemAvailableSlots} />
                </div>



                <div className="flex flex-row items-center justify-around mt-6">
                    <button onClick={onBackgroundPressed} className="bg-errColor hover:font-bold text-white px-4 py-2 rounded-md">Cancel</button>
                    <button onClick={onEditButtonPressed} className="bg-successColor hover:font-bold text-white px-4 py-2 rounded-md">Confirm</button>
                </div>
                <div className="h-6" />
            </div>
        </div>
    )
}