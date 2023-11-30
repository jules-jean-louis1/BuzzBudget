import { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import BtnAddTransaction from "../components/button/btnAddTransaction";
import BtnCategories from "../components/button/btnCategories";
import BtnTags from "../components/button/btnTags";
import { Link } from "react-router-dom";
import HistorySvg from "../components/svg/historySvg";
import FormattedDate from "../components/form/formattedDate";

function AccountPage() {
  const storedUser = localStorage.getItem("user_data");
  const user = useRef(storedUser ? jwtDecode(storedUser) : null);

  const [account, setAccount] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [dataSuccessT, setDataSuccessT] = useState(false);

  const getAccount = async () => {
    try {
      if (user.current) {
        const response = await fetch(
          `http://localhost:80/buzzbudget/src/account/display/${user.current.id}`
        );
        const data = await response.json();
        console.log(data);
        if (data) {
          setAccount(data.account);
          setTransactions(data.transaction);
        }
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleDataSuccessT = (success) => {
    setDataSuccessT(success);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user.current) {
        await getAccount();
        setDataSuccessT(false); // Remettre à faux après le fetch
      }
    };

    // Appeler la fonction d'initialisation lors de l'arrivée sur la page
    if (user.current && !dataSuccessT) {
      fetchData();
    }

    // Appeler la fonction de mise à jour lorsque dataSuccess change
    if (user.current && dataSuccessT) {
      fetchData();
    }
  }, [user.current, dataSuccessT]);

  function displayAccount() {
    if (account && transactions) {
      return (
        <>
          <div className=" rounded-xl bg-[#e9e9e9]">
            <div
              id="totalAccount"
              className="flex items-center justify-between px-2 w-full min-h-16 h-16"
            >
              <span className="text-xl text-[#222222]">Compte</span>
              <span className="text-xl text-[#222222]">{account.total} €</span>
            </div>
            <div id="trancation" className="rounded-xl mx-2 bg-[#b9b9b9]">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id_transaction}
                  className="flex items-center justify-between  w-full min-h-14 h-14"
                >
                  <span className="text-lg text-[#222222]">
                    {transaction.name_transaction}
                  </span>
                  <span className="text-lg text-[#222222]">
                    <FormattedDate
                      dateString={transaction.date_of_transaction}
                    />
                  </span>
                  <span className="text-lg text-[#222222]">
                    {transaction.amount_transaction} €
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <>
      <div className="pt-12 bg-[#f8f8f8] h-full w-full px-2">
        <div>
          <p className="text-2xl font-bold">Welcome {user.current.firstname}</p>
        </div>
        <div className="flex flex-col space-y-4">
          <div id="containerRecapAccount">
            <div id="TotalInAccount">{displayAccount()}</div>
          </div>
          <div id="btnAddTransaction" className="w-full">
            <BtnAddTransaction onDataSuccess={handleDataSuccessT} />
          </div>
          <div id="containerLinkHistory">
            <Link to={`/account/history/${user.current.id}`}>
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
