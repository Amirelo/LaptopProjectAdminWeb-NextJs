import { axiosInstance } from "@/utils/axios"
import axios, { Axios } from "axios";

export const getAllProduct = async () => {
    const res = await axiosInstance.get('/product/get-all-product.php');
    return res.data;
}

export const updateProduct = async (
    productID,
    productName,
    productPrice,
    productQuantity,
    releasedDate,
    totalRating,
    modelCode,
    onSale,
    currentPrice,
    manufacturer,
    warranty,
    sold,
    length,
    width,
    height,
    weight,
    status,
    brandID,
    screenID,
    operatingSystemID,
    processorID,
    memoryID,
    storageID
) => {
    const data = {
        productID: productID,
        productName: productName,
        productPrice: productPrice,
        productQuantity: productQuantity,
        releasedDate: releasedDate,
        totalRating: totalRating,
        modelCode: modelCode,
        onSale: onSale,
        currentPrice: currentPrice,
        manufacturer: manufacturer,
        warranty: warranty,
        sold: sold,
        length: length,
        width: width,
        height: height,
        weight:weight,
        status: status,
        brandID: brandID,
        screenID: screenID,
        operatingSystemID: operatingSystemID,
        processorID: processorID,
        memoryID: memoryID,
        storageID: storageID
    }
    console.log("Send data:", data)
    const res = await axiosInstance.post('/product/update-product-info.php', data);
    return res.data;
}

export const insertProdct = async(
    productName, 
    productPrice, 
    productQuantity, 
    releasedDate, 
    totalRating, 
    modelCode, 
    onSale,
    currentPrice, 
    manufacturer, 
    warranty, 
    sold, 
    length,
    width, 
    height, 
    weight, 
    status, 
    brandID,
    screenID,
    operatingSystemID,
    processorID,
    memoryID,
    storageID) => {
        const data = {
            productName:productName,
            productPrice:productPrice,
            productQuantity:productQuantity,
            releasedDate:releasedDate,
            totalRating:totalRating,
            modelCode:modelCode,
            onSale:onSale,
            currentPrice:currentPrice,
            manufacturer:manufacturer,
            warranty:warranty,
            sold:sold,
            length:length,
            width:width,
            height:height,
            weight:weight,
            status:status,
            brandID:brandID,
            screenID:screenID,
            operatingSystemID:operatingSystemID,
            processorID:processorID,
            memoryID:memoryID,
            storageID:storageID
        }
        const res = await axiosInstance.post('/product/insert-product-info.php',data);
        return res.data;
}

export const getAllUsers = async () => {
    const res = await axiosInstance.get('/user/get-all-users.php');
    return res.data;
}

export const getAllUserOrders = async () => {
    const res = await axiosInstance.get('/userOrder/get-all-user-orders.php');
    return res.data;
}

export const getAllBrands = async () => {
    const res = await axiosInstance.get('/brand/get-all-brands.php');
    return res.data;
}

export const getAllScreens = async () => {
    const res = await axiosInstance.get('/screen/get-all-screens.php');
    return res.data;
}


export const getAllProcessors = async () => {
    const res = await axiosInstance.get('/processor/get-all-processors.php');
    return res.data;
}


export const getAllMemories = async () => {
    const res = await axiosInstance.get('/memory/get-all-memories.php');
    return res.data;
}

export const getAllStorages = async () => {
    const res = await axiosInstance.get('/storage/get-all-storages.php');
    return res.data;
}

export const getAllOperSys = async () => {
    const res = await axiosInstance.get('/operatingSystem/get-all-operating-systems.php');
    return res.data;
}

export const updateProductStatus = async (productID, status) => {
    const data = {
        productID: productID,
        status: status
    }
    const res = await axiosInstance.post('/product/update-product-status.php', data);
    return res.data;
}

export const getProductImagesByProdID = async(productID) => {
    const data = {
        productID:productID
    }
    const res = await axiosInstance.post('/productImage/get-product-images-by-product-id.php',data);
    return res.data;
}

export const insertProductImage = async(imageLink,status,productID) =>{
    const data = {
        productImageLink : imageLink,
        status : status,
        productID:productID
    }
    const res = await axiosInstance.post('/productImage/insert-product-image-info.php',data);
    return res.data;
}

export const uploadImageToImgur = async(url) => {
    const imgurAxios = axios.create({
        baseUrl:"https://api.imgur.com/3/image/"
    })

    const config = {
        headers:{
            Authorization: "Client-ID 61bda01995348f5"
        }
    }


    const data= {
        image:url.name
    }
    console.log("data:",data)
    
    const res= await imgurAxios.post('/',data,config);
    return res;

}



