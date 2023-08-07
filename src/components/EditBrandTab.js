import { getAllBrands, getAllMemories, getAllOperSys, getAllProcessors, getAllScreens, getAllStorages, insertBrand, insertProdct, updateBrandByID, updateProduct } from "@/services/AppService";
import { dataCheck } from "@/utils/helper";
import { memo, useContext, useEffect, useState } from "react"

export default function EditBrandTab({ onBackgroundPressed, onDeletePress, item }) {
    const [listBrands, setListBrands] = useState([]);
    const [itemName, setItemName] = useState(item ?item.name : "");



    const onEditButtonPressed = async () => {
        if (item != null) {
            // update
            const res =await updateBrandByID(item.brandID,itemName,item.status);
            console.log(res)
        } else {
            //insert
            const res =await insertBrand(itemName);
            console.log(res)
        }
        onDeletePress()
    }

    const initData = async () => {
        const brandRes = await getAllBrands();
        setListBrands(brandRes.data);

    }

    useEffect(() => {
        initData();
    }, [item])

    return (
        <div className=" w-full h-full top-0 left-0 fixed">
            <button onClick={onBackgroundPressed} className="bg-gray-600/20 fixed w-full h-full "></button>
            <div className="absolute mt-20 w-1/2 left-1/3 top-16 h-fit rounded-2xl bg-secondaryColor border">
                <h1 className="text-center  text-2xl pt-5 font-bold text-white">{item ? "Edit Brand" : "Add Brand"}</h1>
                <div className="flex flex-row items-center justify-center mx-4 mt-6">
                    <p className=" mr-2 text-white">Brand name</p>
                    <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Brand name" onChange={event => setItemName(event.target.value)} value={itemName} />
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