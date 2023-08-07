import { getAllBrands, getAllMemories, getAllOperSys, getAllProcessors, getAllScreens, getAllStorages, insertBrand, insertProcessor, insertProdct, insertScreen, updateBrandByID, updateProcessor, updateProduct, updateScreen } from "@/services/AppService";
import { dataCheck } from "@/utils/helper";
import { memo, useEffect, useState } from "react"

export default function EditProcessorTab({ onBackgroundPressed, onDeletePress, item }) {
    const [listProcessors, setListProcessors] = useState([]);
    const [itemName, setItemName] = useState(item ? item.name : "");
    const [itemCPU_Speed, setItemCPU_Speed] = useState(item ? item.CPU_Speed : "");
    const [itemCores, setItemCores] = useState(item ? item.cores : "");
    const [itemLogicalProcessors, setItemLogicalProcessors] = useState(item ? item.logicalProcessor : "");
    const [itemCacheMemory, setItemCacheMemory] = useState(item ? item.cacheMemory : "");

    const onEditButtonPressed = async () => {
        if (item != null) {
            // update
            const res = await updateProcessor(item.processorID, itemName,itemCPU_Speed,itemCores,itemLogicalProcessors,itemCacheMemory, item.status);
            console.log(res)
        } else {
            //insert
            
            const res = await insertProcessor(itemName,itemCPU_Speed,itemCores,itemLogicalProcessors,itemCacheMemory);
            console.log(res)
        }
        onDeletePress()
    }

    const initData = async () => {
        const processorRes = await getAllProcessors();
        setListProcessors(processorRes.data);

    }

    useEffect(() => {
        initData();
    }, [item])

    return (
        <div className=" w-full h-full top-0 left-0 absolute">
            <button onClick={onBackgroundPressed} className="bg-gray-600/20 fixed w-full h-full "></button>
            <div className="absolute mt-20 w-1/2 left-1/3 top-8 h-fit rounded-2xl bg-secondaryColor border">
                <h1 className="text-center  text-2xl pt-5 font-bold text-white">{item ? "Edit Processor" : "Add Processor"}</h1>
                <div className="flex flex-row items-center justify-center mx-4 mt-6">
                    <p className="w-1/4 mr-2 text-white">Processor Name</p>
                    <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Processor Name" onChange={event => setItemName(event.target.value)} value={itemName} />
                </div>

                <div className="flex flex-row items-center justify-center mx-4 mt-2">
                    <p className="w-1/4 mr-2 text-white">CPU Speed</p>
                    <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="CPU Speed" onChange={event => setItemCPU_Speed(event.target.value)} value={itemCPU_Speed} />
                </div>

                <div className="flex flex-row items-center justify-center mx-4 mt-2">
                    <p className="w-1/4 mr-2 text-white">Cores</p>
                    <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Cores" onChange={event => setItemCores(event.target.value)} value={itemCores} />
                </div>

                <div className="flex flex-row items-center justify-center mx-4 mt-2">
                    <p className="w-1/4 mr-2 text-white">Logical Processors</p>
                    <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Logical Processors" onChange={event => setItemLogicalProcessors(event.target.value)} value={itemLogicalProcessors} />
                </div>

                <div className="flex flex-row items-center justify-center mx-4 mt-2">
                    <p className="w-1/4 mr-2 text-white">Cache Memory</p>
                    <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Cache Memory" onChange={event => setItemCacheMemory(event.target.value)} value={itemCacheMemory} />
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