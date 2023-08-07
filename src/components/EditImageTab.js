import {
  getProductImagesByProdID,
  insertProductImage,
  updateProductByImageID,
} from "@/services/AppService";
import { dataCheck } from "@/utils/helper";
import { memo, useEffect, useState } from "react";
import Image from "next/image";

export default function EditImageTab({
  onBackgroundPressed,
  onDeletePress,
  item,
}) {
  const [listProductImages, setListProductImages] = useState([]);
  const [listUploadImages, setListUploadImages] = useState([]);
  const [listImageLinks, setListImageLinks] = useState([]);
  const [newImg, setNewImg] = useState("");

  const onEditButtonPressed = async () => {
    for (let index = 0; index < listImageLinks.length; index++) {
      const res = await insertProductImage(
        listImageLinks[index],
        2,
        item.productID
      );
      console.log(res);
    }
    onDeletePress();
  };

  const uploadImageToClient = async (event) => {
    setListUploadImages((prev) => [...prev, event.target.files[0]]);
  };

  const onProductImagePressed = async (status, item) => {
    const res = await updateProductByImageID(
      item.productImageID,
      item.productImageLink,
      status,
      item.productID
    );
    onDeletePress();
    console.log(res)
  };

  const onAddImageLink = () => {
    if (newImg != "" && newImg.slice(0, 5) == "https") {
      setListImageLinks((prev) => [...prev, newImg]);
      setNewImg("");
    }
  };

  const initData = async () => {
    const res = await getProductImagesByProdID(item.productID);
    if (res.data != null) {
      setListProductImages(res.data);
      
    }
    console.log("Get product image result:", res.data);
  };

  useEffect(() => {
    initData();
  }, [item]);

  return (
    <div className=" w-full h-full top-0 left-0 fixed">
      <button
        onClick={onBackgroundPressed}
        className="bg-gray-600/20 fixed w-full h-full"
      ></button>
      <div className="absolute mt-20 w-1/2 left-1/3 top-8 h-fit rounded-2xl bg-secondaryColor border border-inputBorderColor">
        <h1 className="text-center mt-4 text-lg font-bold text-white">
          {item ? "Edit Product Image" : "Add Product Image"}
        </h1>
        <p className="ms-4 mt-2 font-bold text-white">
          {item ? "Current Product Image" : ""}
        </p>
        <div className="flex flex-row w-full h-1/5 items-center p-6 flex-wrap justify-around">
          {listProductImages ? (
            listProductImages.map((prodImg) => {
              return (
                <div className="flex flex-col" key={prodImg.productImageID}>
                  <button
                    onClick={onProductImagePressed}
                    key={prodImg.productImageID}
                    className=" w-24 h-24 items-center justify-center bg-slate-200 rounded-xl"
                  >
                    <Image
                      width={100}
                      height={100}
                      src={prodImg.productImageLink}
                      alt={"Product Image"}
                    />
                  </button>
                  <select
                    onChange={(event) =>
                      onProductImagePressed(event.target.value, prodImg)
                    }
                  >
                    <option
                      selected={prodImg.status == 0 ? true : false}
                      value={0}
                    >
                      Disable
                    </option>
                    <option
                      selected={prodImg.status == 1 ? true : false}
                      value={1}
                    >
                      Default
                    </option>
                    <option
                      selected={prodImg.status == 2 ? true : false}
                      value={2}
                    >
                      Sub
                    </option>
                  </select>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>

        {/* {listUploadImages ? (
          <div className="flex flex-row w-full h-1/5 items-center p-6 flex-wrap justify-around">
            {listUploadImages.map((upFiles, key) => {
              return (
                <button
                  key={key}
                  className=" w-24 h-24 items-center justify-center flex bg-slate-200 rounded-xl transition-all"
                >
                  <Image
                    width={100}
                    height={100}
                    src={URL.createObjectURL(upFiles)}
                    alt={"Upload Product Image"}
                  />
                </button>
              );
            })}
          </div>
        ) : (
          <></>
        )} */}

        <div className="flex flex-row w-full h-1/5 items-center p-6 flex-wrap justify-around">
          {listImageLinks.map((img, key) => {
            return (
              <button
                key={key}
                className=" w-24 h-24 items-center justify-center flex bg-slate-200 rounded-xl transition-all"
              >
                <Image
                  width={100}
                  height={100}
                  src={img}
                  alt={"Upload Product Image"}
                />
              </button>
            );
          })}
        </div>

        <div className="flex  w-full justify-around  px-4">
          {/* <div className="justify-center items-center flex flex-col">
            <div className=" w-24 h-24 items-center justify-center flex bg-slate-200 rounded-xl">
              <svg
                className="absolute w-10"
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
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <input
                onChange={(event) => uploadImageToClient(event)}
                type="file"
                className=" w-24 h-24 opacity-0 absolute"
              ></input>
            </div>
            <p className="text-white">Add Local Image</p>
          </div> */}

          <div className="flex-1 justify-center items-center flex flex-col">
            <input
              className=" w-4/5 border border-black rounded-lg ps-2"
              placeholder="Add image link"
              value={newImg}
              onChange={(event) => setNewImg(event.target.value)}
            ></input>
            <button onClick={onAddImageLink} className="text-white mt-2">
              Add Image Link
            </button>
          </div>
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
