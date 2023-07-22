import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function SpecsMenu({ selection,setSelection }) {
    const [subSelection, setSubSelection] = useState("sub0")

    const subSelectionPressed = (id) => {
            setSubSelection(id)
            setSelection(id)
    }

    useEffect(()=>{
        if(selection != 'nav3'){
            setSubSelection('sub0')
        } 
    },[selection])

    return (
        <div className="flex flex-col  w-max">
            <NavLink to={"/brands"} onClick={() => subSelectionPressed('Brands')} className={`px-12 py-2 mt-2 rounded-md flex flex-row transition-colors duration-200 ease-out ${subSelection == 'Brands' ? "bg-mainSubColor" : "hover:bg-mainSubColor"}`}>Brand</NavLink>
            <NavLink to={"/screens"} onClick={() => subSelectionPressed('Screens')} className={`px-12 py-2 mt-2 rounded-md flex flex-row transition-colors duration-200 ease-out ${subSelection == 'Screens' ? "bg-mainSubColor" : "hover:bg-mainSubColor"}`}>Screen</NavLink>
            <NavLink to={"/processors"} onClick={() => subSelectionPressed('Processors')} className={`px-12 py-2 mt-2 rounded-md flex flex-row transition-colors duration-200 ease-out ${subSelection == 'Processors' ? "bg-mainSubColor" : "hover:bg-mainSubColor"}`}>Processor</NavLink>
            <NavLink to={"/memories"} onClick={() => subSelectionPressed('RAM')} className={`px-12 py-2 mt-2 rounded-md flex flex-row transition-colors duration-200 ease-out ${subSelection == 'RAM' ? "bg-mainSubColor" : "hover:bg-mainSubColor"}`}>Memory/RAM</NavLink>
            <NavLink to={"/storages"} onClick={() => subSelectionPressed('Storages')} className={`px-12 py-2 mt-2 rounded-md flex flex-row transition-colors duration-200 ease-out ${subSelection == 'Storages' ? "bg-mainSubColor" : "hover:bg-mainSubColor"}`}>Storage</NavLink>
            <NavLink to={"/opersys"} onClick={() => subSelectionPressed('OS')} className={`px-12 py-2 mt-2 rounded-md flex flex-row transition-colors duration-200 ease-out ${subSelection == 'OS' ? "bg-mainSubColor" : "hover:bg-mainSubColor"}`}>OS</NavLink>
        </div>
    )
}