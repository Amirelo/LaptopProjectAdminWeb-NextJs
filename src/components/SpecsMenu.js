import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function SpecsMenu({ selection,setSelection }) {
    const [subSelection, setSubSelection] = useState("sub0")

    const subSelectionPressed = (id) => {
            setSubSelection(id)
            if(selection != 'nav3'){
                setSelection('nav3')
            } 
    }

    useEffect(()=>{
        if(selection != 'nav3'){
            setSubSelection('sub0')
        } 
    },[selection])

    return (
        <div className="flex flex-col  w-max">
            <NavLink to={"/brands"} onClick={() => subSelectionPressed('sub1')} className={`p-2 mt-2 rounded-md flex flex-row transition-colors duration-300 ${subSelection == 'sub1' ? "bg-mainSubColor" : "hover:bg-mainSubColor"}`}>Brand</NavLink>
            <NavLink to={"/screens"} onClick={() => subSelectionPressed('sub2')} className={`p-2 mt-2 rounded-md flex flex-row transition-colors duration-300 ${subSelection == 'sub2' ? "bg-mainSubColor" : "hover:bg-mainSubColor"}`}>Screen</NavLink>
            <NavLink to={"/processors"} onClick={() => subSelectionPressed('sub3')} className={`p-2 mt-2 rounded-md flex flex-row transition-colors duration-300 ${subSelection == 'sub3' ? "bg-mainSubColor" : "hover:bg-mainSubColor"}`}>Processor</NavLink>
            <NavLink to={"/memories"} onClick={() => subSelectionPressed('sub4')} className={`p-2 mt-2 rounded-md flex flex-row transition-colors duration-300 ${subSelection == 'sub4' ? "bg-mainSubColor" : "hover:bg-mainSubColor"}`}>Memory/RAM</NavLink>
            <NavLink to={"/storages"} onClick={() => subSelectionPressed('sub5')} className={`p-2 mt-2 rounded-md flex flex-row transition-colors duration-300 ${subSelection == 'sub5' ? "bg-mainSubColor" : "hover:bg-mainSubColor"}`}>Storage</NavLink>
            <NavLink to={"/opersys"} onClick={() => subSelectionPressed('sub6')} className={`p-2 mt-2 rounded-md flex flex-row transition-colors duration-300 ${subSelection == 'sub6' ? "bg-mainSubColor" : "hover:bg-mainSubColor"}`}>OS</NavLink>
        </div>
    )
}