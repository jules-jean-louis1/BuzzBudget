import { useState, useEffect } from "react";
import useAuth from "../components/hook/useAuth";
import BtnAddTransaction from "../components/button/btnAddTransaction";

function AccountPage() {
  const { user } = useAuth();
  console.log(user);
  const getAccount = async () => {
    try {
      const response = await fetch(
        `http://localhost:80/buzzbudget/src/account/display/${user.id}`
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    getAccount();
  }, []);
  return (
    <>
      <div className="mt-10">
        <h1 className="text-2xl font-bold">Account page</h1>
        <div>
          <p className="">Welcome {user.firstname}</p>
        </div>
        <div id="btnAddTransaction">
          <BtnAddTransaction />
        </div>
      </div>
    </>
  );
}

export default AccountPage;
