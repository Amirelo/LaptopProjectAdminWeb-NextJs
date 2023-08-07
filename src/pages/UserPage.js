"use-client";

import { getAllUsers, updateUserStatus } from "@/services/AppService";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import PaginationTab from "@/components/PaginationTab";
import ActionTop from "@/components/ActionTop";
import DeleteMessage from "@/components/DeleteMessage";
import { AuthContext } from "@/services/AuthContext";
import CustomView from "@/components/atoms/CustomView";

export default function UserPage() {
  const { searchText } = useContext(AuthContext);

  const [listUsers, setListUsers] = useState([]);
  const [listSort, setListSort] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);

  const [showDeleteTab, setShowDeleteTab] = useState(false);
  const [dataChange, setDataChange] = useState(true);
  const [sortType, setSortType] = useState("");

  const statusNumToText = {
    0: "Banned",
    1: "Active",
  };

  const onDeleteIconPressed = (item) => {
    setCurrentItem(item);
    console.log(item);
    setShowDeleteTab(true);
  };

  const onRevertPressed = async (item) => {
    const deletePress = await updateUserStatus(1, item.email);
    setCurrentItem({});
    setShowDeleteTab(false);
    console.log(deletePress);
    setDataChange(!dataChange);
  };

  const onChangePasswordPressed = async (item) => {};

  const onConfirmDeletePressed = async () => {
    const deletePress = await updateUserStatus(0, currentItem.email);
    setCurrentItem({});
    setShowDeleteTab(false);
    console.log(deletePress);
    setDataChange(!dataChange);
  };
  const onItemPerPageChange = (event) => {
    setItemPerPage(event.target.value);
  };

  const initData = async () => {
    const userRes = await getAllUsers();
    setListUsers(userRes.data);
    setListSort(userRes.data);
    console.log("User", userRes.data);

    setPageCount(Math.ceil(userRes.data.length / itemPerPage));
    console.log("Count:", Math.ceil(userRes.data.length / itemPerPage));
    dataSort(userRes.data);
  };

  const dataSort = (list) => {
    let myList = [...list];
    if (searchText != null) {
      myList = myList.filter((item) =>
        (
          item.username +
          " " +
          item.email +
          " " +
          statusNumToText[item.accountStatus] +
          " " +
          item.phonenumber +
          " " +
          item.fullname +
          " " +
          item.birthday +
          " " +
          item.createDate
        )
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }

    switch (sortType) {
      default:
        myList.sort((a, b) => a.userID - b.userID);
    }
    myList.sort((a, b) => b.accountStatus - a.accountStatus);
    console.log(myList);
    setPageCount(Math.ceil(myList.length / itemPerPage));
    console.log("Count:", Math.ceil(myList.length / itemPerPage));

    return setListSort(myList);
  };

  useEffect(() => {
    initData();
  }, [dataChange]);

  useEffect(() => {
    dataSort(listUsers);
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

        <ActionTop
          setAddButtonDisplay={false}
          onItemPerPageChange={onItemPerPageChange}
        />

        <table className="w-full mt-10">
          <tr className="">
            <th className="border">#</th>
            <th className="border">Image</th>
            <th className="border">Username</th>
            <th className="border">Full Name</th>
            <th className="border">Email</th>
            <th className="border">Phone Number</th>
            <th className="border">Birthday</th>
            <th className="border">
              Action
            </th>
          </tr>

          {listSort
            .slice((currentPage - 1) * itemPerPage, itemPerPage * currentPage)
            .map((user) => {
              return (
                <tr
                  className={
                    user.accountStatus == 0
                      ? "bg-slate-500/25"
                      : "even:bg-backgroundInputColor/25"
                  }
                  key={user.userId}
                >
                  <td className="text-center border">{user.userId}</td>
                  <td className="text-center border py-3">
                    <Image
                      className="w-16 h-16 block m-auto rounded-md"
                      width={72}
                      height={72}
                      src={user.imageLink}
                      alt="User image"
                    />
                  </td>
                  <td className="text-center border">{user.username}</td>
                  <td className="text-center border">{user.fullname}</td>
                  <td className="text-center border">{user.email}</td>
                  <td className="text-center border">{user.phonenumber}</td>
                  <td className="text-center border">{user.birthday}</td>

                  {user.accountStatus != 0 ? (
                    <td className="text-center border">
                      <button
                        onClick={() => onDeleteIconPressed(user)}
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
                        onClick={() => onRevertPressed(user)}
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
