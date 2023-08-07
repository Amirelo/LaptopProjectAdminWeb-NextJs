import Image from 'next/image'
import DashboardPage from '@/pages/DashboardPage';
import NavigationBar from '@/components/NavigationBar';
import AppNavigation from '@/services/AppNavigation';
import { ReactDOM } from 'react';
import { AuthProvider } from '@/services/AuthContext';

export default function Home() {
  return (
    <div className='h-full '>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </div>
  )
}
