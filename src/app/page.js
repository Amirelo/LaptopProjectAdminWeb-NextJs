import Image from 'next/image'
import DashboardPage from '@/pages/DashboardPage';
import NavigationBar from '@/components/NavigationBar';
import AppNavigation from '@/services/AppNavigation';
import { ReactDOM } from 'react';
import { AuthProvider } from '@/services/AuthContext';

export default function Home() {
  return (
    <div className='h-full '>

      {/* <NavigationBar/> */}
      {/* <div className='ms-72 bg-white pt-8 ps-4'> */}
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
      {/* </div> */}
    </div>
  )
}
