"use-client";

import { getAllStorages, updateStorage } from "@/services/AppService";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import ActionTop from "@/components/ActionTop";
import PaginationTab from "@/components/PaginationTab";
import DeleteMessage from "@/components/DeleteMessage";
import EditStorageTab from "@/components/EditStorageTab";
import { AuthContext } from "@/services/AuthContext";
import CustomView from "@/components/atoms/CustomView";

export default function StoragePage() {
  const { searchText } = useContext(AuthContext);

  const [listStorages, setListStorages] = useState([]);
  const [listSort, setListSort] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);

  const [showEditTab, setShowEditTab] = useState(false);
  const [showDeleteTab, setShowDeleteTab] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [dataChange, setDataChange] = useState(true);
  const [sortType, setSortType] = useState();

  const onDeleteIconPressed = (item) => {
    setCurrentItem(item);
    console.log(item);
    setShowDeleteTab(true);
  };

  const onRevertPressed = async (item) => {
    const deletePress = await updateStorage(
      item.storageID,
      item.type,
      item.maxSlots,
      item.availableSlots,
      item.currentStorage,
      1
    );
    setCurrentItem({});
    setShowDeleteTab(false);
    console.log(deletePress);
    setDataChange(!dataChange);
  };

  const onConfirmDeletePressed = async () => {
    const deletePress = await updateStorage(
      currentItem.storageID,
      currentItem.type,
      currentItem.maxSlots,
      currentItem.availableSlots,
      currentItem.currentStorage,
      0
    );
    setCurrentItem({});
    setShowDeleteTab(false);
    console.log(deletePress);
    setDataChange(!dataChange);
  };

  const onEditIconPressed = (item) => {
    setCurrentItem(item);
    setShowEditTab(true);
  };

  const onFinishedHandlingItem = () => {
    setCurrentItem({});
    setShowEditTab(false);
    setDataChange(!dataChange);
  };

  const onItemPerPageChange = (event) => {
    setItemPerPage(event.target.value);
    setPageCount(listStorages.length / event.target.value);
  };

  const dataSort = (list) => {
    let myList = [...list];
    if (searchText != null) {
      myList = myList.filter((item) =>
        (item.type + " " + item.currentStorage)
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }

    switch (sortType) {
      default:
        myList.sort((a, b) => a.storageID - b.storageID);
    }
    myList.sort((a, b) => b.status - a.status);
    console.log(myList);
    setPageCount(Math.ceil(myList.length / itemPerPage));
    console.log("Count:", Math.ceil(myList.length / itemPerPage));

    return setListSort(myList);
  };

  const initData = async () => {
    const storageRes = await getAllStorages();
    setListStorages(storageRes.data);
    setListSort(storageRes.data);
    console.log("Storage", storageRes.data);

    setPageCount(Math.ceil(storageRes.data.length / itemPerPage));
    console.log("Count:", Math.ceil(storageRes.data.length / itemPerPage));

    dataSort(storageRes.data);
  };

  useEffect(() => {
    initData();
  }, [dataChange]);

  useEffect(() => {
    dataSort(listStorages);
  }, [searchText]);

  return (
    <CustomView type="bodySpacing">
      <div className="mr-3">
        {showDeleteTab ? (
          <DeleteMessage
            onBackgroundPressed={() => setShowDeleteTab(false)}
            onDeletePress={onConfirmDeletePressed}
          />
        ) : (
          <></>
        )}

        {showEditTab ? (
          <EditStorageTab
            item={currentItem}
            onBackgroundPressed={() => setShowEditTab(false)}
            onDeletePress={onFinishedHandlingItem}
          />
        ) : (
          <></>
        )}

        <ActionTop
          onEditPressed={() => onEditIconPressed()}
          onItemPerPageChange={onItemPerPageChange}
        />

        <table className="w-full mt-10">
          <tr className="">
            <th className="border">#</th>
            <th className="border">Current Storage Type</th>
            <th className="border">Available slots</th>
            <th className="border">Current Storage</th>
            <th className="border" colSpan={2}>
              Action
            </th>
          </tr>

          {listSort
            .slice((currentPage - 1) * itemPerPage, itemPerPage * currentPage)
            .map((storage) => {
              return (
                <tr
                  className={
                    storage.status == 0
                      ? "bg-slate-500/25"
                      : "even:bg-backgroundInputColor/25"
                  }
                  key={storage.storageID}
                >
                  <td className="text-center border">{storage.storageID}</td>
                  <td className="text-center border">{storage.type}</td>
                  <td className="text-center border ">
                    {storage.availableSlots}
                  </td>
                  <td className="text-center border">
                    {storage.currentStorage}
                  </td>

                  <td className="text-center border">
                    <button
                      onClick={() => onEditIconPressed(storage)}
                      className="hover:text-reviewColor transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  </td>

                  {storage.status != 0 ? (
                    <td className="text-center border">
                      <button
                        onClick={() => onDeleteIconPressed(storage)}
                        className="hover:text-cancelColor transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  ) : (
                    <td className="text-center border">
                      <button
                        onClick={() => onRevertPressed(storage)}
                        className="hover:text-acceptColor transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                          />
                        </svg>
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
        </table>
        <PaginationTab pageCount={pageCount} onPageChange={setCurrentPage} />
        <div className="h-32"></div>
      </div>
    </CustomView>
  );
}
