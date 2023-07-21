'use-client'

import { getAllProcessors } from "@/services/AppService";
import { useEffect, useState } from "react"
import Image from "next/image";
import ActionTop from "@/components/ActionTop";
import PaginationTab from "@/components/PaginationTab";


export default function ProcessorPage() {
    const [listProcessors, setListProcessors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);

    const initData = async () => {
        setIsLoading(true)
        const prosRes = await getAllProcessors();
        setListProcessors(prosRes.data);
        console.log("Processors", prosRes.data)

        setPageCount(Math.ceil(prosRes.data.length / itemPerPage))
        console.log("Count:", Math.ceil(prosRes.data.length / itemPerPage));

        setIsLoading(false);
    }

    const checkStatus = (status) => {
        if(status == -1){
            return "None"
        } 
            return status;
    }

    useEffect(() => {
        initData();
    }, [])

    return (
        isLoading == false ?
            <>
                <div className="mr-3">
                <ActionTop onEditPressed={""} onItemPerPageChange={(event)=>setItemPerPage(event.target.value)}/>



                    <table className="w-full mt-10">
                        <tr className="">
                            <th className="border">#</th>
                            <th className="border">processor Name</th>
                            <th className="border">CPU Speed</th>
                            <th className="border">Cores</th>
                            <th className="border">LPs</th>
                            <th className="border">Cache Memory</th>
                            <th className="border" colSpan={2}>Action</th>
                        </tr>

                        {listProcessors.slice((currentPage - 1) * itemPerPage, itemPerPage * currentPage).map(processor => {
                            return (
                                <tr className="even:bg-sky-50 " key={processor.processorID}>
                                    <td className="text-center border">{processor.processorID}</td>
                                    <td className=" border">{processor.name}</td>
                                    <td className="text-center border">{processor.CPU_Speed}</td>
                                    <td className="text-center border">{processor.cores}</td>
                                    <td className="text-center border">{checkStatus(processor.logicalProcessor)}</td>
                                    <td className="text-center border">{checkStatus(processor.cacheMemory)}</td>
                                    
                                    <td className="text-center border">
                                        <button className="hover:text-reviewColor transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </button>
                                    </td>
                                    <td className="text-center border">
                                        <button className="hover:text-cancelColor transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>

                                        </button>

                                    </td>
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