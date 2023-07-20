import { NavLink } from "react-router-dom";

export default function SpecsMenu() {
    return (
        <div className="flex flex-col  w-max">
            <NavLink to={"/brands"} className='p-2 mt-2 rounded-md flex flex-row hover:bg-mainSubColor focus:bg-mainSubColor transition-colors duration-300'>Brand</NavLink>
            <NavLink to={"/screens"} className='p-2 mt-2 rounded-md flex flex-row hover:bg-mainSubColor focus:bg-mainSubColor transition-colors duration-300'>Screen</NavLink>
            <NavLink to={"/processors"} className='p-2 mt-2 rounded-md flex flex-row hover:bg-mainSubColor focus:bg-mainSubColor transition-colors duration-300'>Processor</NavLink>
            <NavLink to={"/memories"} className='p-2 mt-2 rounded-md flex flex-row hover:bg-mainSubColor focus:bg-mainSubColor transition-colors duration-300'>Memory/RAM</NavLink>
            <NavLink to={"/storages"} className='p-2 mt-2 rounded-md flex flex-row hover:bg-mainSubColor focus:bg-mainSubColor transition-colors duration-300'>Storage</NavLink>
            <NavLink to={"/opersys"} className='p-2 mt-2 rounded-md flex flex-row hover:bg-mainSubColor focus:bg-mainSubColor transition-colors duration-300'>OS</NavLink>
        </div>
    )
}