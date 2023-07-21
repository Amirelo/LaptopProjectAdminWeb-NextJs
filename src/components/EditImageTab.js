import { getAllBrands, getAllMemories, getAllOperSys, getAllProcessors, getAllScreens, getAllStorages, getProductImagesByProdID, insertProdct, updateProduct } from "@/services/AppService";
import { dataCheck } from "@/utils/helper";
import { memo, useEffect, useState } from "react"
import Image from "next/image";

export default function EditImageTab({ onBackgroundPressed, onDeletePress, item }) {
    const [isLoading, setIsLoading] = useState(false);
    const [listProductImages, setListProductImages] = useState([]);

    const onEditButtonPressed = async () => {

        onDeletePress()
    }

    const initData = async () => {
        const res = await getProductImagesByProdID(item.productID);
        setListProductImages(res.data);
        console.log("Get product image result:", res.data);

    }

    useEffect(() => {
        initData();
    }, [item])

    return (
        isLoading == false ?
            <div className=" w-full h-full top-0 left-0 fixed">
                <button onClick={onBackgroundPressed} className="bg-gray-600/20 fixed w-full h-full "></button>
                <div className="absolute w-1/2 left-1/3 top-8 h-fit rounded-2xl bg-inputBackgroundColor border border-inputBorderColor">
                    <h1 className="text-center mt-4 text-lg font-bold">{item ? "Edit Product Image" : "Add Product Image"}</h1>
                    <div className="flex flex-row w-full h-1/5 items-center p-6 flex-wrap justify-around">

                        {listProductImages.map(prodImg => {
                            return (
                                <button key={prodImg.productImageID} className=" w-24 h-24 items-center justify-center flex bg-slate-200 rounded-xl">
                                    <Image width={100} height={100} src={prodImg.productImageLink} alt={"Product Image"}/>
                                </button>
                            )
                        })}

                        <button className=" w-24 h-24 items-center justify-center flex bg-slate-200 rounded-xl">
                            <svg className="w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </button>

                    </div>
                    <div className="flex flex-row items-center justify-around mt-6">
                        <button onClick={onBackgroundPressed} className="bg-reviewColor hover:font-bold text-white px-4 py-2 rounded-md">Cancel</button>
                        <button onClick={onEditButtonPressed} className="bg-acceptColor hover:font-bold text-white px-4 py-2 rounded-md">Confirm</button>
                    </div>
                    <div className="h-6" />
                </div>
            </div>
            : <></>
    )
}