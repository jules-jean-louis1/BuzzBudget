import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import BtnAddTransaction from "../components/button/btnAddTransaction";
import BtnCategories from "../components/button/btnCategories";
import BtnTags from "../components/button/btnTags";
import { Link } from "react-router-dom";
import HistorySvg from "../components/svg/historySvg";

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
      <div className="pt-12 bg-[#f8f8f8] h-full w-full px-2">
        <div>
          <p className="text-2xl font-bold">Welcome {user.firstname}</p>
        </div>
        <div className="flex flex-col space-y-4">
          <div id="containerRecapAccount"></div>
          <div id="btnAddTransaction" className="w-full">
            <BtnAddTransaction />
          </div>
          <div id="containerLinkHistory">
            <Link to="/account/history">
              <button
                type="button"
                className="flex items-center justify-between px-2 rounded-xl w-full min-h-16 h-16 bg-[#3e3e3e]"
              >
                <span className="text-xl text-[#f8f8f8]">Historiques</span>
                <span className="bg-[#222222] rounded-full p-3">
                  <HistorySvg fill={"none"} stroke={"#f8f8f8"} />
                </span>
              </button>
            </Link>
          </div>
          <div
            id="containerCategoriesTags"
            className="flex items-center justify-between w-full space-x-2"
          >
            <div id="containerCategories" className="w-full">
              <BtnCategories />
            </div>
            <div id="containerTags" className="w-full">
              <BtnTags />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountPage;
