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
        weight: weight,
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

export const insertProdct = async (
    productName,
    productPrice,
    productQuantity,
    releasedDate,
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
    brandID,
    screenID,
    operatingSystemID,
    processorID,
    memoryID,
    storageID) => {
    const data = {
        productName: productName,
        productPrice: productPrice,
        productQuantity: productQuantity,
        releasedDate: releasedDate,
        modelCode: modelCode,
        onSale: onSale,
        currentPrice: currentPrice,
        manufacturer: manufacturer,
        warranty: warranty,
        sold: sold,
        length: length,
        width: width,
        height: height,
        weight: weight,
        brandID: brandID,
        screenID: screenID,
        operatingSystemID: operatingSystemID,
        processorID: processorID,
        memoryID: memoryID,
        storageID: storageID
    }
    console.log(data)
    const res = await axiosInstance.post('/product/insert-product-info.php', data);
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

export const updateUserStatus = async (status,email) => {
    const data = {
        data:status,
        email:email,
        type:"STATUS"
    }
    console.log(data)
    const res = await axiosInstance.post('/user/update-user-info.php',data);
    return res.data;
}

export const updateUserOrderStatus = async (userOrderID, userID, status, type) => {
    const data = {
        userOrderID: userOrderID,
        userID: userID,
        status: status,
        type: type
    }
    console.log(data)
    const res = await axiosInstance.post('/userOrder/update-user-oder-status.php',data);
    return res.data;
}

export const getAllBrands = async () => {
    const res = await axiosInstance.get('/brand/get-all-brands.php');
    return res.data;
}

export const updateBrandByID = async (brandID, brandName, status) => {
    const data = {
        brandID: brandID,
        brandName: brandName,
        status: status
    }
    const res = await axiosInstance.post('/brand/update-brand-by-id.php', data);
    return res.data;
}

export const insertBrand = async (brandName) => {
    const data = {
        brandName: brandName
    }
    const res = await axiosInstance.post('/brand/insert-brand.php', data);
    return res.data;
}

export const getAllScreens = async () => {
    const res = await axiosInstance.get('/screen/get-all-screens.php');
    return res.data;
}

export const updateScreen = async (screenID, resolution, screenSize, status) => {
    const data = {
        screenID: screenID,
        resolution: resolution,
        screenSize: screenSize,
        status: status
    }
    const res = await axiosInstance.post('/screen/update-screen-info.php', data);
    return res.data;
}

export const insertScreen = async (resolution, screenSize) => {
    const data = {
        resolution: resolution,
        screenSize: screenSize,
    }
    const res = await axiosInstance.post('/screen/insert-screen-info.php', data);
    return res.data;
}


export const getAllProcessors = async () => {
    const res = await axiosInstance.get('/processor/get-all-processors.php');
    return res.data;
}

export const updateProcessor = async (processorID, name, CPU_Speed, cores, logicalProcessors, cacheMemory, status) => {
    const data = {
        processorID: processorID,
        name: name,
        CPU_Speed: CPU_Speed,
        cores: cores,
        logicalProcessors: logicalProcessors,
        cacheMemory: cacheMemory,
        status: status
    }
    const res = await axiosInstance.post('/processor/update-processor-info.php', data);
    return res.data;
}

export const insertProcessor = async (name, CPU_Speed, cores, logicalProcessors, cacheMemory) => {
    const data = {
        name: name,
        CPU_Speed: CPU_Speed,
        cores: cores,
        logicalProcessors: logicalProcessors,
        cacheMemory: cacheMemory
    }
    console.log(data);
    const res = await axiosInstance.post('/processor/insert-processor-info.php', data);
    return res.data;
}


export const getAllMemories = async () => {
    const res = await axiosInstance.get('/memory/get-all-memories.php');
    return res.data;
}

export const updateMemory = async (memoryID, currentRAM, type, speed, maxSlots, availableSlots, maxRAM, status) => {
    const data = {
        memoryID: memoryID,
        currentRAM: currentRAM,
        type: type,
        speed: speed,
        maxSlots: maxSlots,
        availableSlots: availableSlots,
        maxRam: maxRAM,
        status: status
    }
    console.log(data);
    const res = await axiosInstance.post('/memory/update-memory-info.php', data);
    return res.data;
}

export const insertMemory = async (currentRAM, type, speed, maxSlots, availableSlots, maxRAM) => {
    const data = {
        currentRAM: currentRAM,
        type: type,
        speed: speed,
        maxSlots: maxSlots,
        availableSlots: availableSlots,
        maxRam: maxRAM
    }
    console.log(data);
    const res = await axiosInstance.post('/memory/insert-memory-info.php', data);
    return res.data;
}

export const getAllStorages = async () => {
    const res = await axiosInstance.get('/storage/get-all-storages.php');
    return res.data;
}

export const updateStorage = async (storageID, type, maxSlots, availableSlots, currentStorage, status) => {
    const data = {
        storageID: storageID,
        type: type,
        maxSlots: maxSlots,
        availableSlots: availableSlots,
        currentStorage: currentStorage,
        status: status
    }
    console.log(data);
    const res = await axiosInstance.post('/storage/update-storage-info.php', data);
    return res.data;
}

export const insertStorage = async (type, maxSlots, availableSlots, currentStorage) => {
    const data = {
        type: type,
        maxSlots: maxSlots,
        availableSlots: availableSlots,
        currentStorage: currentStorage
    }
    console.log(data);
    const res = await axiosInstance.post('/storage/insert-storage-info.php', data);
    return res.data;
}

export const getAllOperSys = async () => {
    const res = await axiosInstance.get('/operatingSystem/get-all-operating-systems.php');
    return res.data;
}

export const updateOperSys = async (operatingSystemID, OS, version, type, status) => {
    const data = {
        operatingSystemID: operatingSystemID,
        OS: OS,
        version: version,
        type: type,
        status: status
    }
    console.log(data);
    const res = await axiosInstance.post('/operatingSystem/update-operating-system-info.php', data);
    return res.data;
}

export const insertOperSys = async (OS, version, type) => {
    const data = {
        OS: OS,
        version: version,
        type: type
    }
    console.log(data);
    const res = await axiosInstance.post('/operatingSystem/insert-operating-system-info.php', data);
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

export const getProductImagesByProdID = async (productID) => {
    const data = {
        productID: productID
    }
    const res = await axiosInstance.post('/productImage/get-product-images-by-product-id.php', data);
    return res.data;
}

export const insertProductImage = async (imageLink, status, productID) => {
    const data = {
        productImageLink: imageLink,
        status: status,
        productID: productID
    }
    console.log(data)
    const res = await axiosInstance.post('/productImage/insert-product-image-info.php', data);
    return res.data;
}

export const updateProductByImageID = async (productImageID, imageLink, status, productID) => {
    const data = {
        productImageID: productImageID,
        productImageLink: imageLink,
        status: status,
        productID: productID
    }
    console.log(data)
    const res = await axiosInstance.post('/productImage/update-product-image-info.php', data);
    console.log(res);
    return res.data;
}

export const uploadImageToImgur = async (url) => {
    const imgurAxios = axios.create({
        baseUrl: "https://api.imgur.com/3/image/"
    })

    const config = {
        headers: {
            Authorization: "Client-ID 61bda01995348f5"
        }
    }


    const data = {
        image: url.name
    }
    console.log("data:", data)

    const res = await imgurAxios.post('/', data, config);
    return res;

}



