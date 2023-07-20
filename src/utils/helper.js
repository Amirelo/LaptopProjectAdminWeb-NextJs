export const priceFormat = (price) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    return formatter.format(price);
}

export const discountFormat = (discount) => {
    if (discount.substring(0, 1) == '%') {
        result = discount.substring(1, 3) + "% off";
    }
    if (discount.length == 0) {
        result = "";
    }
    return result;
}

export const dataCheck = (data,type) => {
    if(data==null){
        setTimeout(() => {dataCheck},1000)
    } else{
        return data[type];
    }
}

export const dataParentCheck = (data) => {
    if(data==null){
        setTimeout(() => {dataCheck},1000)
    } else{
        return data;
    }
}

export const promoDetail = (percentOff, maxEffect) => {
    let result = percentOff.slice(1,3)+percentOff.slice(0,1)+" off all laptop, maximum " + priceFormat(maxEffect);
    return result;
}