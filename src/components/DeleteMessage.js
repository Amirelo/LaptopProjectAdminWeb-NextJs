export default function DeleteMessage({onBackgroundPressed, onDeletePress}) {
    return (
        <div className=" w-full h-full top-0 left-0 absolute">
            <button onClick={onBackgroundPressed} className="bg-gray-600/20 fixed w-full h-full "></button>
            <div className="fixed w-1/2 left-1/3 top-1/4 h-fit rounded-2xl bg-secondaryColor border border-inputBorderColor">
                <h1 className="text-center  text-2xl pt-5 text-cancelColor font-bold text-white">Deactivate item</h1>
                <p className="text-center text-white">You can find this item again at the last pages</p>
                <p className="text-center text-white">Do you want to delete this item</p>
                <div className="flex flex-row items-center justify-around mt-6">
                    <button onClick={onBackgroundPressed} className="bg-errColor hover:font-bold text-white px-4 py-2 rounded-md">Cancel</button>
                    <button onClick={onDeletePress} className="bg-successColor hover:font-bold text-white px-4 py-2 rounded-md">Deactivate</button>
                </div>
                <div className="h-6" />
            </div>
        </div>
    )
}