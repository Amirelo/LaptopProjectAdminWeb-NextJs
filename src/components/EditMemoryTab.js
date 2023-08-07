import { getAllBrands, getAllMemories, getAllOperSys, getAllProcessors, getAllScreens, getAllStorages, insertBrand, insertMemory, insertProdct, insertScreen, updateBrandByID, updateMemory, updateProduct, updateScreen } from "@/services/AppService";
import { dataCheck } from "@/utils/helper";
import { memo, useEffect, useState } from "react"

export default function EditMemoryTab({ onBackgroundPressed, onDeletePress, item }) {
    const [itemCurrentRAM, setItemCurrentRAM] = useState(item ?item.currentRAM : "");
    const [itemType, setItemType] = useState(item ?item.type : "");
    const [itemSpeed, setItemSpeed] = useState(item ?item.speed : "");
    const [itemMaxSlots, setItemMaxSlots] = useState(item ?item.maxSlots : "");
    const [itemAvailableSlots, setItemAvailableSlots] = useState(item ?item.availableSlots : "");
    const [itemMaxRAM, setItemMaxRAM] = useState(item ?item.maxRam : "");



    const onEditButtonPressed = async () => {
        if (item != null) {
            // update
            const res =await updateMemory(item.memoryID,itemCurrentRAM,itemType,itemSpeed,itemMaxSlots,itemAvailableSlots,itemMaxRAM,item.status);
            console.log(res)
        } else {
            //insert
            const res =await insertMemory(itemCurrentRAM,itemType,itemSpeed,itemMaxSlots,itemAvailableSlots,itemMaxRAM);
            console.log(res)
        }
        onDeletePress()
    }

    return (
        <div className=" w-full h-full top-0 left-0 absolute">
            <button onClick={onBackgroundPressed} className="bg-gray-600/20 fixed w-full h-full "></button>
            <div className="absolute mt-20 w-1/2 left-1/3 top-8 h-fit rounded-2xl bg-secondaryColor border">
                <h1 className="text-center  text-2xl pt-5 font-bold text-white">{item ? "Edit Memory" : "Add Memory"}</h1>
                <div className="flex flex-row items-center justify-center mx-4 mt-6">
                    <p className="w-1/4 mr-2 text-white">Current RAM</p>
                    <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Current RAM" onChange={event => setItemCurrentRAM(event.target.value)} value={itemCurrentRAM} />
                </div>

                <div className="flex flex-row items-center justify-center mx-4 mt-2">
                    <p className="w-1/4 mr-2 text-white">Type</p>
                    <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Type" onChange={event => setItemType(event.target.value)} value={itemType} />
                </div>

                <div className="flex flex-row items-center justify-center mx-4 mt-2">
                    <p className="w-1/4 mr-2 text-white">Speed</p>
                    <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Speed" onChange={event => setItemSpeed(event.target.value)} value={itemSpeed} />
                </div>

                <div className="flex flex-row items-center justify-center mx-4 mt-2">
                    <p className="w-1/4 mr-2 text-white">Max slots</p>
                    <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Max Slots" onChange={event => setItemMaxSlots(event.target.value)} value={itemMaxSlots} />
                </div>

                <div className="flex flex-row items-center justify-center mx-4 mt-2">
                    <p className="w-1/4 mr-2 text-white">Avail Slots</p>
                    <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Type" onChange={event => setItemAvailableSlots(event.target.value)} value={itemAvailableSlots} />
                </div>

                <div className="flex flex-row items-center justify-center mx-4 mt-2">
                    <p className="w-1/4 mr-2 text-white">Max RAM</p>
                    <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Type" onChange={event => setItemMaxRAM(event.target.value)} value={itemMaxRAM} />
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