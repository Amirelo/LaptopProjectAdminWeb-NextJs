import { axiosInstance } from "@/utils/axios"

export const getAllProduct = async() => {
    const res = await axiosInstance.get('/product/get-all-product.php');
    return res.data;
}

export const getAllUsers = async() => {
    const res = await axiosInstance.get('/user/get-all-users.php');
    return res.data;
}

export const getAllUserOrders = async() => {
    const res = await axiosInstance.get('/userOrder/get-all-user-orders.php');
    return res.data;
}

export const getAllBrands = async() => {
    const res = await axiosInstance.get('/brand/get-all-brands.php');
    return res.data;
}

export const getAllScreens = async() => {
    const res = await axiosInstance.get('/screen/get-all-screens.php');
    return res.data;
}


export const getAllProcessors = async() => {
const res = await axiosInstance.get('/processor/get-all-processors.php');
    return res.data;
}

export const getAllMemories = async() => {
    const res = await axiosInstance.get('/memory/get-all-memories.php');
    return res.data;
}

export const getAllStorages = async() => {
    const res = await axiosInstance.get('/storage/get-all-storages.php');
    return res.data;
}

export const getAllOperSys = async() => {
    const res = await axiosInstance.get('/operatingSystem/get-all-operating-systems.php');
    return res.data;
}



