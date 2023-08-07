import { getAllBrands, getAllMemories, getAllOperSys, getAllProcessors, getAllScreens, getAllStorages, insertBrand, insertProdct, insertScreen, updateBrandByID, updateProduct, updateScreen } from "@/services/AppService";
import { dataCheck } from "@/utils/helper";
import { memo, useEffect, useState } from "react"

export default function EditScreenTab({ onBackgroundPressed, onDeletePress, item }) {
    const [listScreens, setListScreens] = useState([]);
    const [itemResolution, setItemResolution] = useState(item ?item.resolution : "");
    const [itemScreenSize, setItemScreenSize] = useState(item ?item.screenSize : "");

    const onEditButtonPressed = async () => {
        if (item != null) {
            // update
            const res =await updateScreen(item.screenID,itemResolution, itemScreenSize,item.status);
            console.log(res)
        } else {
            //insert
            const res =await insertScreen(itemResolution,itemScreenSize);
            console.log(res)
        }
        onDeletePress()
    }

    const initData = async () => {
        const screenRes = await getAllScreens();
        setListScreens(screenRes.data);

    }

    useEffect(() => {
        initData();
    }, [item])

    return (
        <div className=" w-full h-full top-0 left-0 absolute">
            <button onClick={onBackgroundPressed} className="bg-gray-600/20 fixed w-full h-full "></button>
            <div className="absolute w-1/2 left-1/3 top-8 h-fit rounded-2xl bg-secondaryColor border">
                <h1 className="text-center  text-2xl pt-5 font-bold text-white">{item ? "Edit Screen" : "Add Screen"}</h1>
                <div className="flex flex-row items-center justify-center mx-4 mt-6">
                    <p className="w-1/4 mr-2 text-white">Screen Resolution</p>
                    <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Screen Resolution" onChange={event => setItemResolution(event.target.value)} value={itemResolution} />
                </div>

                <div className="flex flex-row items-center justify-center mx-4 mt-2">
                    <p className="w-1/4 mr-2 text-white">Screen Size</p>
                    <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Screen Size" onChange={event => setItemScreenSize(event.target.value)} value={itemScreenSize} />
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