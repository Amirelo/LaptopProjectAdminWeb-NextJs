import { getAllBrands, getAllMemories, getAllOperSys, getAllProcessors, getAllScreens, getAllStorages, insertProdct, updateProduct } from "@/services/AppService";
import { itemStatusArray } from "@/utils/array";
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
    const [currentBrand, setCurrentBrand] = useState([]);

    const [itemName, setItemName] = useState(item ? item.productName : "");
    const [modelCode, setModelCode] = useState(item ? item.modelCode : "");
    const [rlsDate, setRlsDate] = useState(item ? item.releasedDate : "");
    const [originPrice, setOriginPrice] = useState(item ? item.productPrice : "");
    const [curPrice, setCurPrice] = useState(item ? item.currentPrice : "");
    const [onSale, setOnSale] = useState(item ? item.onSale : "");
    const [prodQuan, setProdQuan] = useState(item ? item.productQuantity : "");
    const [prodLength, setProdLength] = useState(item ? item.length : "");
    const [prodWidth, setProdWidth] = useState(item ? item.width : "");
    const [prodHeight, setProdHeight] = useState(item ? item.height : "");
    const [prodWeight, setProdWeight] = useState(item ? item.weight : "");
    const [manufacturer, setManufacturer] = useState(item ? item.manufacturer : "");
    const [warranty, setWarranty] = useState(item ? item.warranty : "");
    const [sold, setSold] = useState(item ? item.sold : "");
    const [status, setStatus] = useState(item ? item.status : "");

    const onEditButtonPressed = async () => {
        if(item!=null){
        const res = await updateProduct(
            item.productID,
            itemName,
            originPrice,
            prodQuan,
            rlsDate,
            item.totalRating,
            modelCode,
            onSale,
            curPrice,
            manufacturer,
            warranty,
            sold,
            prodLength,
            prodWidth, 
            prodHeight,
            prodWeight,
            status,
            currentBrand.brandID,
            currentScreen.screenID,
            currentOS.operatingSystemID,
            currentProcessor.processorID,
            currentMemory.memoryID,
            currentStorage.storageID);
        console.log("Result:", res);
        
        } else{
            const res = await insertProdct(itemName,originPrice,prodQuan,rlsDate,0,modelCode,onSale,curPrice,manufacturer, warranty,sold,prodLength,prodWidth,prodWeight,prodWeight,status,currentBrand.brandID,currentScreen.screenID,currentOS.operatingSystemID,currentProcessor.processorID,currentMemory.memoryID,currentStorage.storageID);
            console.log("Result:",res)
        }
        onDeletePress()
    }

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

        item ?
            [prosRes.data.map(pros => {
                if (pros.processorID == item.processorID) {
                    setCurrentProcessor(pros)
                }
            }),

            brandRes.data.map(brand => {
                if (brand.brandID == item.brandID) {
                    setCurrentBrand(brand)
                }
            }),

            screenRes.data.map(spec => {
                if (spec.screenID == item.screenID) {
                    setCurrentScreen(spec)
                }
            }),

            memoryRes.data.map(curItem => {
                if (curItem.memoryID == item.memoryID) {
                    setCurrentMemory(curItem)
                }
            }),

            storageRes.data.map(curItem => {
                if (curItem.storageID == item.storageID) {
                    setCurrentStorage(curItem)
                }
            }),

            osRes.data.map(curItem => {
                if (curItem.operatingSystemID == item.operatingSystemID) {
                    setCurrentOS(curItem)
                }
            })
            ] : {}



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
                        <input className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md" placeholder="Product name" onChange={event => setItemName(event.target.value)} value={itemName} />
                    </div>

                    <div className="mt-4 flex flex-row justify-between">
                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Model code</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Model code" onChange={event => setModelCode(event.target.value)} value={modelCode} />
                        </div>

                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Rls Date</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Released date" onChange={event => setRlsDate(event.target.value)} value={rlsDate} />
                        </div>
                    </div>

                    <div className="mt-4 flex flex-row justify-between">
                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Original Price</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Price" onChange={event => setOriginPrice(event.target.value)} value={originPrice} />
                        </div>

                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Onsale</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Onsale" onChange={event => setOnSale(event.target.value)} value={onSale} />
                        </div>
                    </div>

                    <div className="mt-4 flex flex-row justify-between">
                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Current Price</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Price" onChange={event => setCurPrice(event.target.value)} value={curPrice} />
                        </div>

                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Quantity</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Quantity" onChange={event => setProdQuan(event.target.value)} value={prodQuan} />
                        </div>
                    </div>

                    <div className="mt-4 flex flex-row justify-between">
                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Length</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Length" onChange={event => setProdLength(event.target.value)} value={prodLength} />
                        </div>

                        <div className="flex flex-row items-center mx-4 flex-1" >
                            <p className=" mr-2">Width</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Width" onChange={event => setProdWidth(event.target.value)} value={prodWidth} />
                        </div>

                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Height</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Height" onChange={event => setProdHeight(event.target.value)} value={prodHeight} />
                        </div>
                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Weight</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Weight" onChange={event => setProdWeight(event.target.value)} value={prodWeight} />
                        </div>
                    </div>

                    <div className="mt-4 flex flex-row justify-between">
                        <div className="flex flex-row items-center mx-4  flex-1">
                            <p className=" mr-2">Manufacturer</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Mfr" onChange={event => setManufacturer(event.target.value)} value={manufacturer} />
                        </div>

                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Warranty</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Warranty" onChange={event => setWarranty(event.target.value)} value={warranty} />
                        </div>

                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Sold</p>
                            <input className="bg-mainSubColor ps-2 flex-1 w-1/4 py-2 border rounded-md" placeholder="Sold" onChange={event => setSold(event.target.value)} value={sold} />
                        </div>

                    </div>

                    <div className="flex flex-row items-center justify-center mx-4 mt-4">
                        <p className=" mr-2">Processor</p>
                        <select onChange={event=>setCurrentProcessor(listProcessors[event.target.value-1])} className="bg-mainSubColor w-3/4 self-center text-center flex flex-1 py-2 border rounded-md">
                        {listProcessors.sort((a,b)=>a.name.localeCompare(b.name)).map(pros => {
                                return (
                                    <option selected={item ? pros.processorID == item.processorID ? "selected" : "" : ""} value={pros.processorID} key={pros.processorID}>{pros.name}</option>
                                )
                            })
                            }
                            </select>

                    </div>



                    <div className="mt-4 flex flex-row justify-between">
                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Brand</p>
                            <select onChange={event=>setCurrentBrand(listBrands[event.target.value-1])} className="bg-mainSubColor w-3/4 self-center text-center flex flex-1 py-2 border rounded-md">
                                {listBrands.sort((a,b)=> a.name.localeCompare(b.name)).map(brand => {
                                    return (
                                        <option selected={item ? brand.brandID == item.brandID ? "selected" : "" : ""} value={brand.brandID} key={brand.brandID}>{brand.name}</option>
                                    )
                                })
                                }
                            </select>
                        </div>

                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Screen</p>
                            <select onChange={event=>setCurrentScreen(listScreens[event.target.value-1])} className="bg-mainSubColor w-3/4 self-center flex flex-1 py-2 border rounded-md">
                                {listScreens.sort((a,b)=>a.resolution.localeCompare(b.resolution)).map(curItem => {
                                    return (
                                        <option selected={item ? curItem.screenID == item.screenID ? "selected" : "" : ""} value={curItem.screenID} key={curItem.screenID}>{curItem.resolution + " " + curItem.screenSize}</option>
                                    )
                                })
                                }
                            </select>

                        </div>
                    </div>

                    <div className="mt-4 flex flex-row justify-between ">
                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">RAM</p>
                            <select onChange={event=>setCurrentMemory(listMemories[event.target.value-1])} className="bg-mainSubColor w-3/4 flex flex-1 py-2 border rounded-md">
                                {listMemories.sort((a,b)=>(b.currentRAM+" "+b.type).localeCompare(a.currentRAM+" "+a.type)).map(curItem => {
                                    return (
                                        <option selected={item ? curItem.memoryID == item.memoryID ? "selected" : "" : ""} value={curItem.memoryID} key={curItem.memoryID}>{curItem.currentRAM + " " + curItem.type + " " + curItem.speed}</option>
                                    )
                                })
                                }
                            </select>
                        </div>

                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Storage</p>
                            <select onChange={event=>setCurrentStorage(listStorages[event.target.value-1])} className="bg-mainSubColor w-3/4 self-center text-center flex flex-1 py-2 border rounded-md">
                                {listStorages.sort((a,b)=> (a.type+" "+a.currentStorage).localeCompare((b.type+" "+b.currentStorage))).map(curItem => {
                                    return (
                                        <option selected={item ? curItem.storageID == item.storageID ? "selected" : "" : ""} value={curItem.storageID} key={curItem.storageID}>{curItem.type + " " + curItem.currentStorage}</option>
                                    )
                                })
                                }
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-row justify-between ">
                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">OS</p>
                            <select onChange={event =>setCurrentOS(listOS[event.target.value-1])} className="bg-mainSubColor w-3/4 self-center text-center flex flex-1 py-2 border rounded-md">
                                {listOS.sort((a,b)=>(b.version+" "+b.type).localeCompare(a.version+" "+a.type)).map(curItem => {
                                    return (
                                        <option selected={item ? curItem.operatingSystemID == item.operatingSystemID ? "selected" : "" : ""} value={curItem.operatingSystemID} key={curItem.operatingSystemID}>{curItem.version}</option>
                                    )
                                })
                                }
                            </select>
                        </div>

                        {item?
                        <div className="flex flex-row items-center mx-4 flex-1">
                            <p className=" mr-2">Status</p>
                            <select onChange={event => setStatus(event.target.value)} className="bg-mainSubColor w-3/4 self-center text-center flex flex-1 py-2 mt-4 border rounded-md">


                        {itemStatusArray.map((curItem, index) => {
                            return (
                                <option selected={index == status ? "selected" : "" } value={index} key={index}>{curItem}</option>
                            )
                        })
                        }
                    </select>
                        </div>
                        :<></>}
                    </div>

                    <div className="flex flex-row items-center justify-around mt-6">
                        <button onClick={onBackgroundPressed} className="bg-reviewColor hover:font-bold text-white px-4 py-2 rounded-md">Cancel</button>
                        <button disabled={item != null && item.modelCode!=modelCode
                            && item.releasedDate!=rlsDate && item.originPrice != originPrice
                            && item.onSale!=onSale && item.currentPrice != curPrice
                            && item.productQuantity!= prodQuan && item.length!= prodLength
                            && item.width!=prodWidth && item.height != prodHeight
                            && item.weight!=prodWeight && item.manufacturer!=manufacturer
                            && item.warranty!=warranty && item.sold!= sold
                            && item.processorID!=currentProcessor.processorID
                            && item.brandID!=currentBrand.brandID
                            && item.screenID!= currentScreen.screenID
                            && item.memoryID!=currentMemory.memoryID
                            && item.storageID!=currentStorage.storageID
                            && item.operatingSystemID!= currentOS.operatingSystemID
                            && item.status!= status ? false:true} onClick={onEditButtonPressed} className={`${item && item.status != status? "bg-acceptColor hover:font-bold":"disabled:bg-acceptColor/50"} text-white px-4 py-2 rounded-md`}>Confirm</button>
                    </div>
                    <div className="h-6" />
                </div>
            </div>
            : <></>
    )
}