export default function ProductListItem({ productData }) {
    if (productData != null) {
        const listItems = productData.map(product => {
            return <li className="w-full h-10" key={product.productID}>{product.currentPrice}</li>
        });
        return <ul className="w-full h-1/2 bg-slate-600">{listItems}</ul>;
    } else{
        return null;
    };

}