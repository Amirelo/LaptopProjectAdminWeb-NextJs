'use-client'

import { getAllUsers } from "@/services/AppService";
import { useEffect, useState } from "react"
import Image from "next/image";
import PaginationTab from "@/components/PaginationTab";


export default function UserPage() {
    const [listUsers, setListUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);

    const statusNumToText = {
        0: "Banned",
        1: "Active"
    }

    const onEditIconPressed = () => {

    }

    const onItemPerPageChange = (event) => {
        setItemPerPage(event.target.value);
    }

    const initData = async () => {
        setIsLoading(true)
        const userRes = await getAllUsers();
        setListUsers(userRes.data);
        console.log("User", userRes.data)

        setPageCount(Math.ceil(userRes.data.length / itemPerPage))
        console.log("Count:", Math.ceil(userRes.data.length / itemPerPage));

        setIsLoading(false);
    }

    useEffect(() => {
        initData();
    }, [])

    return (
        isLoading == false ?
            <>
                <div className="mr-3">


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
                            <th className="border">#</th>
                            <th className="border">Image</th>
                            <th className="border">Username</th>
                            <th className="border">Full Name</th>
                            <th className="border">Email</th>
                            <th className="border">Phone Number</th>
                            <th className="border">Birthday</th>
                            <th className="border" colSpan={2}>Action</th>
                        </tr>

                        {listUsers.slice((currentPage - 1) * itemPerPage, itemPerPage * currentPage).map(user => {
                            return (
                                <tr className="even:bg-sky-50 " key={user.userId}>
                                    <td className="text-center border">{user.userId}</td>
                                    <td className="text-center border py-3"><Image className="w-16 h-16 block m-auto rounded-md" width={72} height={72} src={user.imageLink} alt="User image" /></td>
                                    <td className="text-center border">{user.username}</td>
                                    <td className="text-center border">{user.fullname}</td>
                                    <td className="text-center border">{user.email}</td>
                                    <td className="text-center border">{user.phonenumber}</td>
                                    <td className="text-center border">{user.birthday}</td>
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