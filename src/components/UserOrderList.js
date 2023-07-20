export default function UserOrderList({ userOrderData }) {
    console.log("In item", userOrderData);
    if (userOrderData != null) {
        const listItems = userOrderData.map(userOrder => {
            if (userOrder.status == 1) {
                return (
                    <tr key={userOrder.userOrderID} className="mt-2">
                        <td>TSTRN{userOrder.userOrderID}</td>
                        <td>{userOrder.pendingDate}</td>
                        <td className="text-processingColor font-bold"><button>Processing</button></td>
                    </tr>
                )
            }
        })
        return listItems
    }

}