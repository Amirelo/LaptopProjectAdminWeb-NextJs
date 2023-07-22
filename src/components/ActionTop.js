import { useState } from "react"

export default function ActionTop({onEditPressed, onItemPerPageChange}) {

    return (
        <div className="flex flex-row items-center justify-between pt-4">

            <button onClick={onEditPressed} className="bg-mainColor px-6 py-3 rounded-md text-white hover:font-bold">Add</button>
            <div className="flex flex-row">
                <p>Show&nbsp;</p>
                <select onChange={event=>onItemPerPageChange(event)} defaultValue={5} className="px-4 border">
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
                <p>&nbsp;items</p>
            </div>
        </div>
    )
}