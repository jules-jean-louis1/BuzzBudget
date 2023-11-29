import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import BtnAddTransaction from "../components/button/btnAddTransaction";
import BtnCategories from "../components/button/btnCategories";
import BtnTags from "../components/button/btnTags";

function AccountPage() {
  const storedUser = localStorage.getItem("user_data");
  const user = storedUser ? jwtDecode(storedUser) : null;

  const getAccount = async () => {
    try {
      if (user) {
        const response = await fetch(
          `http://localhost:80/buzzbudget/src/account/display/${user.id}`
        );
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    if (user) {
      getAccount();
    }
  }, [user]);

  return (
    <>
      <div className="pt-12 bg-[#f8f8f8] h-full w-full">
        <h1 className="text-2xl font-bold">Account page</h1>
        <div>
          <p className="">Welcome {user.firstname}</p>
        </div>
        <div id="btnAddTransaction" className="w-full">
          <BtnAddTransaction />
        </div>
        <div id="containerCategoriesTags">
          <div id="containerCategories">
            <BtnCategories />
            <BtnTags />
          </div>
          <div id="containerTags"></div>
        </div>
      </div>
    </>
  );
}

export default AccountPage;
