import { insertOperSys, updateOperSys } from "@/services/AppService";
import { dataCheck } from "@/utils/helper";
import { useState } from "react";

export default function EditOSTab({
  onBackgroundPressed,
  onDeletePress,
  item,
}) {
  const [itemOS, setItemOS] = useState(item ? item.OS : "");
  const [itemVersion, setItemVersion] = useState(item ? item.version : "");
  const [itemType, setItemType] = useState(item ? item.type : "");

  const onEditButtonPressed = async () => {
    if (item != null) {
      // update
      const res = await updateOperSys(
        item.operatingSystemID,
        itemOS,
        itemVersion,
        itemType,
        item.status
      );
      console.log(res);
    } else {
      //insert
      const res = await insertOperSys(itemOS, itemVersion, itemType);
      console.log(res);
    }
    onDeletePress();
  };

  return (
    <div className=" w-full h-full top-0 left-0 absolute">
      <button
        onClick={onBackgroundPressed}
        className="bg-gray-600/20 fixed w-full h-full "
      ></button>
      <div className="absolute mt-20 w-1/2 left-1/3 top-8 h-fit rounded-2xl bg-secondaryColor border">
        <h1 className="text-center  text-2xl pt-5 font-bold text-white">
          {item ? "Edit OS" : "Add OS"}
        </h1>
        <div className="flex flex-row items-center justify-center mx-4 mt-6">
          <p className="w-1/4 mr-2 text-white">OS</p>
          <input
            className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md"
            placeholder="Operating System"
            onChange={(event) => setItemOS(event.target.value)}
            value={itemOS}
          />
        </div>

        <div className="flex flex-row items-center justify-center mx-4 mt-6">
          <p className="w-1/4 mr-2 text-white">Version</p>
          <input
            className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md"
            placeholder="Operating System"
            onChange={(event) => setItemVersion(event.target.value)}
            value={itemVersion}
          />
        </div>

        <div className="flex flex-row items-center justify-center mx-4 mt-6">
          <p className="w-1/4 mr-2 text-white">Type</p>
          <input
            className="bg-mainSubColor ps-2 flex-1 py-2 border rounded-md"
            placeholder="Type"
            onChange={(event) => setItemType(event.target.value)}
            value={itemType}
          />
        </div>

        <div className="flex flex-row items-center justify-around mt-6">
          <button
            onClick={onBackgroundPressed}
            className="bg-errColor hover:font-bold text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onEditButtonPressed}
            className="bg-successColor hover:font-bold text-white px-4 py-2 rounded-md"
          >
            Confirm
          </button>
        </div>
        <div className="h-6" />
      </div>
    </div>
  );
}
