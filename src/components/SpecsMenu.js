import { AuthContext } from "@/services/AuthContext";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function SpecsMenu({ selection, setSelection }) {
  const { searchText, setSearchText } = useContext(AuthContext);

  const [subSelection, setSubSelection] = useState();

  const subSelectionPressed = (name) => {
    setSubSelection(name);
    setSelection('');
  };

  useEffect(() => {
    if (selection != "nav3") {
      setSubSelection("sub0");
    }
  }, [selection]);

  return (
    <div className="flex flex-col  w-max">
      <NavLink
        to={"/brands"}
        onClick={() => [subSelectionPressed("Brands"), setSearchText("")]}
        className={`px-12 py-2 mt-2 rounded-md flex flex-row transition-colors duration-200 ease-out ${
          subSelection == "Brands" ? "bg-primaryColor text-white" : "hover:bg-primaryColor"
        }`}
      >
        Brand
      </NavLink>
      <NavLink
        to={"/screens"}
        onClick={() => [subSelectionPressed("Screens"), setSearchText("")]}
        className={`px-12 py-2 mt-2 rounded-md flex flex-row transition-colors duration-200 ease-out ${
          subSelection == "Screens"
            ? "bg-primaryColor text-white"
            : "hover:bg-primaryColor"
        }`}
      >
        Screen
      </NavLink>
      <NavLink
        to={"/processors"}
        onClick={() => [subSelectionPressed("Processors"), setSearchText("")]}
        className={`px-12 py-2 mt-2 rounded-md flex flex-row transition-colors duration-200 ease-out ${
          subSelection == "Processors"
            ? "bg-primaryColor text-white"
            : "hover:bg-primaryColor"
        }`}
      >
        Processor
      </NavLink>
      <NavLink
        to={"/memories"}
        onClick={() => [subSelectionPressed("RAM"), setSearchText("")]}
        className={`px-12 py-2 mt-2 rounded-md flex flex-row transition-colors duration-200 ease-out ${
          subSelection == "RAM" ? "bg-primaryColor text-white" : "hover:bg-primaryColor"
        }`}
      >
        Memory/RAM
      </NavLink>
      <NavLink
        to={"/storages"}
        onClick={() => [subSelectionPressed("Storages"), setSearchText("")]}
        className={`px-12 py-2 mt-2 rounded-md flex flex-row transition-colors duration-200 ease-out ${
          subSelection == "Storages"
            ? "bg-primaryColor text-white"
            : "hover:bg-primaryColor"
        }`}
      >
        Storage
      </NavLink>
      <NavLink
        to={"/opersys"}
        onClick={() => [subSelectionPressed("OS"), setSearchText("")]}
        className={`px-12 py-2 mt-2 rounded-md flex flex-row transition-colors duration-200 ease-out ${
          subSelection == "OS" ? "bg-primaryColor text-white" : "hover:bg-primaryColor"
        }`}
      >
        OS
      </NavLink>
    </div>
  );
}
