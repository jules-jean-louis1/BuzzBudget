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
          <div
            className="rounded-xl"
            style={{ background: "linear-gradient(140deg, #FF2E00, #FD9D58)" }}
          >
            <div
              id="totalAccount"
              className="flex items-center justify-between px-2 w-full min-h-16 h-16 text-white"
            >
              <span className="text-xl">Solde</span>
              <span className="text-xl font-bold">{account.total} €</span>
            </div>
            <div className="p-2 text-slate-50">
              <div id="trancation" className="rounded-xl bg-[#0000001a]">
                <div className="w-full">
                  <h3 className="text-center">Dernières transactions</h3>
                </div>
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id_transaction}
                    className="flex items-center justify-between mx-2 min-h-14 h-14"
                  >
                    <span className="text-lg w-28">
                      {transaction.name_transaction}
                    </span>
                    <span className="text-sm w-24">
                      <FormattedDate
                        dateString={transaction.date_of_transaction}
                      />
                    </span>
                    <span className="text-lg w-16">
                      {transaction.amount_transaction} €
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <>
      <div className="pt-16 bg-[#f2f2f6] h-full w-full px-2">
        <div className="px-2 py-3">
          <p className="text-2xl font-bold flex space-x-2">
            <span>Bonjour</span>
            <span>{user.current.firstname}</span>
          </p>
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
                className="flex items-center justify-between px-2 rounded-xl w-full min-h-16 h-16 bg-[#ced1da]"
              >
                <span className="text-xl text-[#222222]">Historiques</span>
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
