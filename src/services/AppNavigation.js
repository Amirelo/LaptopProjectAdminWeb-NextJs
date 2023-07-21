'use client'

import NavigationBar from "@/components/NavigationBar";
import BrandPage from "@/pages/BrandPage";
import DashboardPage from "@/pages/DashboardPage";
import LoginPage from "@/pages/LoginPage";
import MemoryPage from "@/pages/MemoryPage";
import OSPage from "@/pages/OSPage";
import OrderPage from "@/pages/OrderPage";
import ProcessorPage from "@/pages/ProcessorPage";
import ProductPage from "@/pages/ProductPage";
import ReportPage from "@/pages/ReportPage";
import ScreenPage from "@/pages/ScreenPage";
import SettingPage from "@/pages/SettingPage";
import StoragePage from "@/pages/StoragePage";
import UserPage from "@/pages/UserPage";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function AppNavigation() {
    const[currentSelection,setCurrentSelection] = useState();
    return (
        <div>
            <BrowserRouter>
                <NavigationBar />
                <div className='ms-72 bg-white pt-8 ps-4'>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/products" element={<ProductPage />} />
                        <Route path="/orders" element={<OrderPage />} />
                        <Route path="/users" element={<UserPage />} />
                        <Route path="/reports" element={<ReportPage />} />
                        <Route path="/settings" element={<SettingPage />} />
                        <Route path="/brands" element={<BrandPage />} />
                        <Route path="/processors" element={<ProcessorPage />} />
                        <Route path="/screens" element={<ScreenPage />} />
                        <Route path="/memories" element={<MemoryPage />} />
                        <Route path="/storages" element={<StoragePage />} />
                        <Route path="/opersys" element={<OSPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}