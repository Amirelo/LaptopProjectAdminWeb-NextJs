'use client'

import Image from 'next/image'
import DashboardPage from '@/pages/DashboardPage';
import { Link, NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import SpecsMenu from './SpecsMenu';
import { AuthContext } from '@/services/AuthContext';


export default function NavigationBar() {
  const [showSpecsList, setShowSpecsList] = useState(false);
  const [selection, setSelection] = useState('Dashboard');

  const { setSearchText, searchText } = useContext(AuthContext);

  const { user, userLogout } = useContext(AuthContext);

  const onShowSpecsListPressed = () => {
    setShowSpecsList(!showSpecsList)
    console.log("Change")
  }

  return (
    <>
      {/* Navigation */}
      <nav className='flex flex-col w-72 h-full bg-backgroundInputColor border-borderColor border items-center fixed overflow-y-auto'>
        <div className='flex flex-row items-center mt-7'>
          <Image width={32} height={32} className='mr-2' alt='App icon' src='/static/logo.png' />
          <span className="font-bold">Store&nbsp;</span>
          <span className="text-mainColor font-bold">Manager</span>
        </div>
        <NavLink to={"/"} onClick={() => [setSelection('Dashboard'), setSearchText("")]} className={`p-4 w-56 mt-7 rounded-md flex flex-row transition-colors duration-300 ${selection == 'Dashboard' ? "bg-primaryColor text-textVariantColor font-bold" : "hover:bg-primaryColor"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <p className='ms-1'>Dashboard</p>
        </NavLink>

        <Link to={"/products"} onClick={() => [setSelection('Products'), setSearchText("")]} className={`p-4 w-56 mt-1 rounded-md flex flex-row transition-colors duration-300 ${selection == 'Products' ? "bg-primaryColor text-textVariantColor font-bold" : "hover:bg-primaryColor"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
          </svg>
          <p className='ms-1'>Products</p>
        </Link>

        <button onClick={() => onShowSpecsListPressed(!showSpecsList)} className={`p-4 w-56 mt-1 rounded-md flex flex-row transition-all duration-300 ${selection == 'nav3' ? "bg-primaryColor text-textVariantColor font-bold" : "hover:bg-primaryColor"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
          </svg>
          &nbsp;
          <p className='flex flex-1'>Specs</p>

          {showSpecsList ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>

            :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>}


        </button>
        <div className={showSpecsList ? "opacity-0 h-0 top-1/3 pointer-events-none" : "opacity-100 ease-linear duration-500"} >
          <SpecsMenu selection={selection} setSelection={setSelection} />
        </div>
        <NavLink to={"/orders"} onClick={() => setSelection('Orders')} className={`duration-300 ease-in p-4 w-56 mt-1 rounded-md flex flex-row transition-all ${selection == 'Orders' ? "bg-primaryColor text-textVariantColor font-bold" : "hover:bg-primaryColor"}`}>
          <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <p className='ms-1'>Orders</p>
        </NavLink>

        <Link to={"/users"} onClick={() => setSelection('Users')} className={`p-4 w-56 mt-1 rounded-md flex flex-row transition-colors duration-300 ${selection == 'Users' ? "bg-primaryColor text-textVariantColor font-bold" : "hover:bg-primaryColor"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
          <p className='ms-1'>Users</p>
        </Link>

        <button onClick={() => userLogout()} className={`p-4 w-56 mt-1 rounded-md flex flex-row transition-colors duration-300 text-errColor hover:bg-errColor hover:text-white mb-12`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>

          <p className='ms-1 '>Log Out</p>
        </button>

      </nav>

      <div className=' border-b ms-72 py-4 px-4 bg-primaryColor'>
        {/* Header */}
        <div className='flex flex-row items-center w-full justify-between mr-4 '>
          <p className=" text-xl font-bold text-textVariantColor">{selection}</p>

          {selection!= "Dashboard"?
          <div className='rounded border-2 focus:border-primaryColor bg-backgroundInputColor border-b-borderColor w-80 h-12 flex flex-row items-center'>
            <svg className='ps-2 ms-1 w-6 h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input name="MyInput" value={searchText} onChange={event => setSearchText(event.target.value)} placeholder='Search here' className='w-80 h-12 ps-8 bg-transparent absolute' />
          </div>
:<></>}

          <div className=' h-auto flex flex-row items-center '>
            <img className='mr-2 object-cover w-11 h-11 rounded-lg' alt='user image' src={user.imageLink} />
            <p className='text-textVariantColor font-bold'>{user.username}</p>
          </div>
        </div>
      </div>
    </>
  )
}