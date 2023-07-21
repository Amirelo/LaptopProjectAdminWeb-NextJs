import { getAllBrands, getAllMemories, getAllOperSys, getAllProcessors, getAllScreens, getAllStorages } from "@/services/AppService";
import { dataCheck } from "@/utils/helper";
import { memo, useEffect, useState } from "react"

export default function EditProductTab({ onBackgroundPressed, onDeletePress, item }) {
    const [isLoading, setIsLoading] = useState(false);
    const [listProcessors, setListProcessors] = useState([]);
    const [listBrands, setListBrands] = useState([]);
    const [listScreens, setListScreens] = useState([]);
    const [listMemories, setListMemories] = useState([]);
    const [listStorages, setListStorages] = useState([]);
    const [listOS, setListOS] = useState([]);

    const [currentProcessor, setCurrentProcessor] = useState({});
    const [currentScreen, setCurrentScreen] = useState([]);
    const [currentMemory, setCurrentMemory] = useState([]);
    const [currentStorage, setCurrentStorage] = useState([]);
    const [currentOS, setCurrentOS] = useState([]);

    const [itemName,setItemName]= useState(item?item.productName:"");
    const [modelCode,setModelCode] = useState(item?item.modelCode:"");
    const [rlsDate,setRlsDate] = useState(item?item.releasedDate:"");
    const [originPrice,setOriginPrice] = useState(item?item.productPrice:"");
    const [curPrice,setCurPrice] = useState(item?item.currentPrice:"");
    const [onSale,setOnSale] = useState(item?item.onSale:"");
    const [prodQuan,setProdQuan] = useState(item?item.productQuantity:"");
    const [prodLength,setProdLength] = useState(item?item.length:"");
    const [prodWidth,setProdWidth] = useState(item?item.width:"");
    const [prodHeight,setProdHeight] = useState(item?item.height:"");
    const [prodWeight,setProdWeight] = useState(item?item.weight:"");
    const [manufacturer,setManufacturer] = useState(item?item.manufacturer:"");
    const [warranty,setWarranty] = useState(item?item.warranty:"");
    const [sold,setSold] = useState(item?item.sold:"");
    const [status,setStatus] = useState(item?item.status:"");

    const initData = async () => {
        const prosRes = await getAllProcessors();
        setListProcessors(prosRes.data);

        const brandRes = await getAllBrands();
        setListBrands(brandRes.data);

        const screenRes = await getAllScreens();
        setListScreens(screenRes.data);

        const memoryRes = await getAllMemories();
        setListMemories(memoryRes.data);

        const storageRes = await getAllStorages();
        setListStorages(storageRes.data);

        const osRes = await getAllOperSys();
        setListOS(osRes.data);

        item?
        [prosRes.data.map(pros => {
            if (pros.processorID == item.processorID) {
                setCurrentProcessor(pros)
            }
        }),

        screenRes.data.map(spec => {
            if (spec.screenID == item.screenID) {
                setCurrentScreen(spec)
            }
        }),

        memoryRes.data.map(curItem => {
            if(curItem.memoryID == item.memoryID){
                setCurrentMemory(curItem)
            }
        }),

        storageRes.data.map(curItem => {
            if(curItem.storageID == item.storageID){
                setCurrentStorage(curItem)
            }
        }),

        osRes.data.map(curItem => {
            if(currentOS.operatingSystemID == item.operatingSystemID){
                setCurrentOS(curItem)
            }
        })]:{}



    }

    useEffect(() => {
        initData();
    }, [item])

    return (
        isLoading == false ?
            <div className=" w-full h-full top-0 left-0 absolute">
                <button onClick={onBackgroundPressed} className="bg-gray-600/20 fixed w-full h-full "></button>
                <div className="absolute w-1/2 left-1/3 top-8 h-fit rounded-2xl bg-inputBackgroundColor border border-inputBorderColor">
                    <h1 className="text-center  text-2xl pt-5 font-bold">{item ? "Edit Product" : "Add Product"}</h1>
                    <div className="flex flex-row items-center justify-center mx-4 mt-6">
                        <p className=" mr-2">Product name</p>
                        <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Product name" onChange={event=>setItemName(event.target.value)} value={itemName} />
                    </div>

                    <div className="mt-4 flex flex-row justify-between">
                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Model code</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Model code" onChange={event=>setModelCode(event.target.value)} value={modelCode} />
                        </div>

                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Rls Date</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Released date" onChange={event=>setRlsDate(event.target.value)} value={rlsDate} />
                        </div>
                    </div>

                    <div className="mt-4 flex flex-row justify-between">
                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Original Price</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Price" onChange={event=>setOriginPrice(event.target.value)} value={originPrice} />
                        </div>

                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Onsale</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Onsale" onChange={event=>setOnSale(event.target.value)} value={onSale} />
                        </div>
                    </div>

                    <div className="mt-4 flex flex-row justify-between">
                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Current Price</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Price" onChange={event=>setCurPrice(event.target.value)} value={curPrice} />
                        </div>

                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Quantity</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Quantity" onChange={event=>setProdQuan(event.target.value)} value={prodQuan} />
                        </div>
                    </div>

                    <div className="mt-4 flex flex-row justify-between">
                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Length</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Length" onChange={event=>setProdLength(event.target.value)} value={prodLength} />
                        </div>

                        <div className="flex flex-row items-center mx-4 flex-1" >
                            <p className=" mr-2">Width</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Width" onChange={event=>prodWidth(event.target.value)} value={prodWidth} />
                        </div>

                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Height</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Height" onChange={event=>setProdHeight(event.target.value)} value={prodHeight} />
                        </div>
                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Weight</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Weight" onChange={event=>setProdWeight(event.target.value)} value={prodWeight} />
                        </div>
                    </div>

                    <div className="mt-4 flex flex-row justify-between">
                        <div className="flex flex-row items-center mx-4  flex-1">
                            <p className=" mr-2">Manufacturer</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Mfr" onChange={event=>setManufacturer(event.target.value)} value={manufacturer} />
                        </div>

                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Warranty</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Warranty" onChange={event=>setWarranty(event.target.value)} value={warranty} />
                        </div>

                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Sold</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Sold" onChange={event=>setSold(event.target.value)} value={sold} />
                        </div>

                    </div>

                    <div className="flex flex-row items-center justify-center mx-4 mt-4">
                        <p className=" mr-2">Processor</p>
                        <input list="DTprocessors" className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Processor" onChange={setCurrentProcessor} value={item ? currentProcessor.name : ""} />
                        <datalist id="DTprocessors">
                            {listProcessors.map(pros => {
                                return (
                                    <option value={pros.name} key={pros.processorID}>{pros.name}</option>
                                )
                            })
                            }
                        </datalist>

                    </div>



                    <div className="mt-4 flex flex-row justify-between">
                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Brand</p>
                            <select className="bg-mainSubColor w-3/4 self-center text-center flex flex-1 py-2 mt-4 border rounded-md">
                                {listBrands.map(brand => {
                                    return (
                                        <option selected={item?brand.brandID == item.brandID?"selected":"":""} value={brand.brandID} key={brand.brandID}>{brand.name}</option>
                                    )
                                })
                                }
                            </select>
                        </div>

                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Screen</p>
                            <input list="DTscreens" className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Screen" onChange={setCurrentScreen} value={currentScreen.resolution + " " + currentScreen.screenSize} />
                            <datalist id="DTscreens">
                                {listScreens.map(screen => {
                                    return (
                                        <option selected={item?screen.screenID == item.screenID?"selected":"":""} value={screen.resolution + " " + screen.screenSize} key={screen.screenID}>{screen.resolution + " " + screen.screenSize}</option>
                                    )
                                })
                                }
                            </datalist>

                        </div>
                    </div>

                    <div className="mt-4 flex flex-row justify-between ">
                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">RAM</p>
                            <select className="bg-mainSubColor w-3/4 self-center text-center flex flex-1 py-2 mt-4 border rounded-md">
                                {listMemories.map(curItem => {
                                    return (
                                        <option selected={item?curItem.memoryID == item.memoryID?"selected":"":""} value={curItem.memoryID} key={curItem.memoryID}>{curItem.currentRAM + " " + curItem.type + " " + curItem.speed}</option>
                                    )
                                })
                                }
                            </select>                       
                             </div>

                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Storage</p>
                            <select className="bg-mainSubColor w-3/4 self-center text-center flex flex-1 py-2 mt-4 border rounded-md">
                                {listStorages.map(curItem => {
                                    return (
                                        <option selected={item?curItem.storageID == item.storageID?"selected":"":""} value={curItem.storageID} key={curItem.storageID}>{(curItem.maxSlots - curItem.availableSlots) + " " + curItem.type + " " + curItem.currentStorage}</option>
                                    )
                                })
                                }
                            </select>   
                        </div>
                    </div>

                    <div className="mt-4 flex flex-row justify-between ">
                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">OS</p>
                            <select className="bg-mainSubColor w-3/4 self-center text-center flex flex-1 py-2 mt-4 border rounded-md">
                                {listOS.map(curItem => {
                                    return (
                                        <option selected={item? curItem.operatingSystemID == item.operatingSystemID?"selected":"":""} value={curItem.operatingSystemID} key={curItem.operatingSystemID}>{curItem.version}</option>
                                    )
                                })
                                }
                            </select>  
                        </div>

                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Status</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Status" onChange={event=>setStatus(event.target.value)} value={status} />
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-around mt-6">
                        <button onClick={onBackgroundPressed} className="bg-reviewColor hover:font-bold text-white px-4 py-2 rounded-md">Cancel</button>
                        <button onClick={onDeletePress} className="bg-acceptColor hover:font-bold text-white px-4 py-2 rounded-md">Confirm</button>
                    </div>
                    <div className="h-6" />
                </div>
            </div>
            : <></>
    )
}