import React from "react";
import logo from "@/images/logo.png";
import Image from "next/image";
import cartIcon from "../../images/cartIcon.png";
import { BiCaretDown } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { StateProps } from "../../../types";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { addUser } from "@/store/nextSlice";

const Header = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { productData, favoriteData, userInfo } = useSelector(
    (state: StateProps) => state.next
  );
  // console.log(session)
  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        })
      );
    }
  }, [session]);
  // const [allData, setAllData] = useState([]);

  return (
    <div className=" w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50">
      <div className="h-full w-full mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4">
        {/* Logo */}
        <Link
          href={"/"}
          className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]"
        >
          <Image
            className="mt-1 w-28 object-cover"
            src={logo}
            width={150}
            height={150}
            alt="logo"
          />
        </Link>
        {/* Location */}
        <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300  items-center justify-center h-[70%] hidden xl:inline-flex gap-1">
          <SlLocationPin />
          <div className="text-xs">
            <p>Deliver In</p>
            <p className="text-white font-bold uppercase">India</p>
          </div>
        </div>
        {/* SearchBox */}
        <div className="flex-1 h-10 hidden md:inline-flex items-center relative  justify-between">
          <input
            className="h-full w-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] outline-none border-transparent focus-visible:border-amazon_yellow"
            type="text"
            placeholder="Search Items "
          />
          <span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md">
            <HiOutlineSearch />
          </span>
        </div>
        {/* sign in  */}
        {userInfo ? (
          <div className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] gap-1">
            <Image
              src={userInfo.image}
              alt="userImage"
              className="w-8 h-8 rounded-full object-cover"
              height={8}
              width={8}
            />
            <div className="text-xs text-gray-100 flex flex-col justify-between">
              <p className="text-white font-bold">{userInfo.name}</p>
              <p>{userInfo.email}</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => signIn()}
            className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"
          >
            <p>Hii,Sign In</p>
            <p className="text-white font-bold flex items-center">
              {" "}
              AccountList{" "}
              <span>
                <BiCaretDown />
              </span>{" "}
            </p>
          </div>
        )}
        {/* Favotite */}
        <Link
          href={"/favourite"}
          className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative"
        >
          <p>Marked</p>
          <p className="text-white font-bold">& Favorite</p>
          {favoriteData.length > 0 && (
            <span className="absolute right-2 top-2 w-4 h-4 border-[1px] border-gray-400 flex items-center justify-center text-xs text-amazon_yellow">
              {favoriteData.length}
            </span>
          )}
        </Link>
        {/* CartItems */}
        <Link
          href={"/cart"}
          className="px-2 relative flex items-center border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"
        >
          <Image
            className="w-auto h-8 object-cover"
            src={cartIcon}
            alt="cart"
          />
          <p className="text-xs text-white mt-3 text-bold">cart</p>
          <span className="absolute text-amazon_yellow text-sm top-2 left-[29px] font-semibold ">
            {productData ? productData.length : 0}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
