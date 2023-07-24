'use client'

import { getAllProduct, updateProductStatus } from "@/services/AppService";
import { useEffect, useState } from "react"
import Image from "next/image";
import { priceFormat } from "@/utils/helper";
import PaginationTab from "@/components/PaginationTab";
import DeleteMessage from "@/components/DeleteMessage";
import EditProductTab from "@/components/EditProductTab";
import EditImageTab from "@/components/EditImageTab";


export default function ProductPage() {
    const [listProducts, setListProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);

    const [showDeleteTab, setShowDeleteTab] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const [showEditTab, setShowEditTab] = useState(false);
    const [showEditImageTab, setShowEditImageTab] = useState(false);
    const [dataChange, setDataChange] = useState(false)

    const [isLoading, setIsLoading] = useState(false);


    const onItemPerPageChange = (event) => {
        setItemPerPage(event.target.value);
        setPageCount(listProducts.length / event.target.value)
    }

    const onRevertPressed = async (item) => {
        const reverRes = await updateProductStatus(item.productID, 1);
        setCurrentItem({})
        setShowDeleteTab(false)
        console.log(reverRes)
        setDataChange(!dataChange);
    }

    const onConfirmDeletePressed = async () => {
        const deleteRes = await updateProductStatus(currentItem.productID, 0);
        console.log(deleteRes);
        setShowDeleteTab(false);
        setCurrentItem([]);
        setDataChange(!dataChange);
    }


    const onDeleteIconPressed = (item) => {
        setCurrentItem(item);
        setShowDeleteTab(true);
    }

    const onFinishedHandlingItem = () => {
        setCurrentItem(null);
        setShowEditTab(false);
        setDataChange(!dataChange);
    }

    const onFinishedHandlingImages = () => {
        setCurrentItem(null);
        setShowEditImageTab(false);
        setDataChange(!dataChange);
    }

    const onEditIconPressed = (item) => {
        setCurrentItem(item);
        setShowEditTab(true);
    }

    const onImagePressed = (item) => {
        setCurrentItem(item);
        setShowEditImageTab(true);
    }


    const initData = async () => {
        const prodRes = await getAllProduct();
        setListProducts(prodRes.data);

        setPageCount(Math.ceil(prodRes.data.length / itemPerPage))
        console.log("Count:", Math.ceil(prodRes.data.length / itemPerPage));

    }

    useEffect(() => {
        initData();
    }, [dataChange])


    return (
        isLoading == false ?
            <>
                <div className="mr-3">

                    {showDeleteTab ?
                        <DeleteMessage
                            onBackgroundPressed={() => setShowDeleteTab(false)}
                            onDeletePress={onConfirmDeletePressed} />
                        :
                        <></>}
                    {showEditTab ?
                        <EditProductTab item={currentItem} onBackgroundPressed={() => setShowEditTab(false)} onDeletePress={onFinishedHandlingItem} />
                        :
                        <></>}

                    {showEditImageTab ?
                        <EditImageTab item={currentItem} onBackgroundPressed={() => [setShowEditImageTab(false), setCurrentItem([])]} onDeletePress={onFinishedHandlingImages} />
                        :
                        <></>}

                    <div className="flex flex-row items-center justify-between pt-4">

                        <button onClick={() => onEditIconPressed()} className="bg-mainColor px-6 py-3 rounded-md text-white hover:font-bold">Add</button>
                        <div className="flex flex-row">
                            <p>Show&nbsp;</p>
                            <select onChange={onItemPerPageChange} defaultValue={5} className="px-4 border">
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                            </select>
                            <p>&nbsp;items</p>
                        </div>
                    </div>

                    <table className="w-full mt-10">
                        <tr className="">
                            <th className="border w-10">#</th>
                            <th className="border">Image</th>
                            <th className="border">Product Name</th>
                            <th className="border w-1/5">Current Price</th>
                            <th className="border">Quantity</th>
                            <th className="border">Rating</th>
                            <th className="border w-1/12" colSpan={2}>Action</th>
                        </tr>

                        {listProducts.sort((a, b) => { return b.status - a.status }).slice((currentPage - 1) * itemPerPage, itemPerPage * currentPage).map(product => {
                            return (
                                <tr className={`h-36 ${product.status == 0 ? "bg-slate-500/25" : "even:bg-sky-50"}`} key={product.productID}>
                                    <td className="text-center border">{product.productID}</td>

                                    {product.productImageLink ?
                                        <td className="text-center border w-2/12">
                                            <button onClick={() => onImagePressed(product)}>
                                                <Image className="w-fit h-fit m-auto rounded-md p-1" objectFit="cover" width={100} height={100} src={product.productImageLink} alt="Product image" />
                                            </button>
                                        </td>
                                        :
                                        <td className="text-center border block w-2/12">
                                            <button onClick={setShowEditImageTab} className="border hover:text-acceptColor hover:font-bold">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>

                                            </button>
                                        </td>}

                                    <td className=" border">{product.productName}</td>
                                    <td className="text-center border">{priceFormat(product.currentPrice)}</td>
                                    <td className="text-center border">{product.productQuantity}</td>
                                    <td className="text-center border">{product.totalRating}</td>
                                    <td className="text-center border">
                                        <button onClick={() => onEditIconPressed(product)} className="hover:text-reviewColor transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </button>
                                    </td>
                                    {product.status?
                                    <td className="text-center border">
                                        <button onClick={() => onDeleteIconPressed(product)} className="hover:text-cancelColor transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>

                                        </button>
                                    </td>
                                    :
                                    <td className="text-center border">
                                    <button onClick={() => onRevertPressed(product)} className="hover:text-acceptColor transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                        </svg>
                                    </button>
                                    </td>}
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