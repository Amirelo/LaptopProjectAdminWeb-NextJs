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
