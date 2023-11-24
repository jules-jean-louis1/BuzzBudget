import { useState, useEffect } from "react";
import useAuth from "../components/hook/useAuth";

function AccountPage() {
  const { user } = useAuth();
  console.log(user);
  const getAccount = async () => {
    try {
      const response = await fetch(
        `http://localhost:80/buzzbudget/src/auth/account/${user.id}`
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
      </div>
    </>
  );
}

export default AccountPage;
