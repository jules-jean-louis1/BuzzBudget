import { useState, useEffect, useRef } from "react";
import EditCircle from "../svg/editCircle";
import { useValidateSuccess } from "../hook/useValidateSuccess";
import GenericInput from "./input/genericInput";
import useTags from "../hook/useTags";
import useCategories from "../hook/useCategories";

const FormEditTransaction = ({ transactionId }) => {
  const { setSuccess } = useValidateSuccess();
  const { tags } = useTags();
  const { categories } = useCategories();

  const [buttonClicked, setButtonClicked] = useState(false);

  const [transaction, setTransaction] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  const formRef = useRef();
  const [nameTransaction, setNameTransaction] = useState(
    transaction.name_transaction || ""
  );
  const [amount, setAmount] = useState(transaction.amount_transaction || "");
  const [date, setDate] = useState(
    transaction.date_of_transaction
      ? transaction.date_of_transaction.substring(0, 10)
      : ""
  );
  const [selectedType, setSelectedType] = useState(
    transaction.type_of_transaction || ""
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    transaction.payment_method || ""
  );
  const [description, setDescription] = useState(transaction.description || "");

  // Error
  const [errorName, setErrorName] = useState("");
  const [errorAmount, setErrorAmount] = useState("");
  const [errorDate, setErrorDate] = useState("");
  const [errorType, setErrorType] = useState("");
  const [errorPaymentMethod, setErrorPaymentMethod] = useState("");

  const handleCategories = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setCategoriesData([...categoriesData, { id_categories: value }]);
    } else {
      setCategoriesData(
        categoriesData.filter((data) => data.id_categories !== value)
      );
    }
  };

  const getDataFormTransaction = async () => {
    try {
      const response = await fetch(
        `http://localhost:80/buzzbudget/src/transaction/getOne/${transactionId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        setTransaction(data.success.transaction);
        setTagsData(data.success.tags);
        setCategoriesData(data.success.categories);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonClicked(true);
    setSuccess(true);
  };

  useEffect(() => {
    getDataFormTransaction();
  }, []);

  return (
    <>
      <form action="" method="post" ref={formRef}>
        <div className="border-2 border-b-0 border-[#4A4A4A] bg-[#E0E4EC] rounded-t-xl flex items-center justify-between px-2">
          <div className="flex flex-col w-full">
            <GenericInput
              label={"Nom de la transaction"}
              type={"text"}
              name={"name"}
              value={nameTransaction}
              onChange={(e) => setNameTransaction(e.target.value)}
            />
            {errorName && (
              <p className="text-red-500 text-center text-base">{errorName}</p>
            )}
          </div>
        </div>
        <div className="border-2 border-b-0 border-[#4A4A4A] flex items-center justify-between px-2  bg-[#E0E4EC]">
          <div className="flex flex-col w-full">
            <GenericInput
              label={"Montant"}
              type={"number"}
              name={"amount"}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {errorAmount && (
              <p className="text-red-500 text-center text-base">
                {errorAmount}
              </p>
            )}
          </div>
        </div>
        <div className="border-2 border-b-0 border-[#4A4A4A] flex items-center justify-between px-2  bg-[#E0E4EC]">
          <div className="flex flex-col w-full">
            <GenericInput
              label={"Date"}
              type={"date"}
              name={"date"}
              id={"date"}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {errorDate && (
              <p className="text-red-500 text-center text-base">{errorDate}</p>
            )}
          </div>
        </div>
        <div className="border-2 border-b-0 border-[#4A4A4A] flex items-center justify-between px-2  bg-[#E0E4EC]">
          <div className="flex flex-col w-full">
            <div className="flex flex-col pt-1 w-full relative">
              <label htmlFor="type" className="text-[#8E8E92] absolute">
                Type
              </label>
              <select
                name="type"
                id="type"
                className=" bg-[#E0E4EC] rounded-xl p-3 text-black text-xl outline-none mt-1"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="depense">Dépense</option>
                <option value="revenu">Revenu</option>
              </select>
            </div>
            {errorType && (
              <p className="text-red-500 text-center text-base">{errorType}</p>
            )}
          </div>
        </div>
        {selectedType === "depense" && (
          <div className="border-2 border-b-0 border-[#4A4A4A] flex items-center justify-between px-2 bg-[#E0E4EC]">
            <div className="flex flex-col w-full">
              <div className="flex flex-col pt-1 w-full relative">
                <label
                  htmlFor="paymentMethod"
                  className="text-[#8E8E92] absolute"
                >
                  Méthode de paiement
                </label>
                <select
                  name="paymentMethod"
                  id="paymentMethod"
                  value={selectedPaymentMethod}
                  className="bg-[#E0E4EC] rounded-xl p-3 text-black text-xl outline-none mt-1"
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                >
                  <option value="n/a">Non défini</option>
                  <option value="carte">Carte</option>
                  <option value="espece">Espèces</option>
                  <option value="cheque">Chèque</option>
                  <option value="virement">Virement</option>
                </select>
              </div>
              {errorPaymentMethod && (
                <p className="text-red-500 text-center text-base">
                  {errorPaymentMethod}
                </p>
              )}
            </div>
          </div>
        )}
        <div className="border-2 border-b-0 border-[#4A4A4A] flex items-center justify-between px-2 bg-[#E0E4EC]">
          <div className="flex flex-col w-full">
            <GenericInput
              label={"Description"}
              type={"text"}
              name={"description"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="border-2 border-b-0 border-[#4A4A4A] flex items-center justify-between px-2 bg-[#E0E4EC]">
          <div className="flex flex-col w-full">
            <div className="flex flex-col pt-1 w-full relative">
              <label htmlFor="tags" className="text-[#8E8E92] absolute">
                Tags
              </label>
              {tags.map((tag) => (
                <div key={tag.id_tags}>
                  <input
                    type="checkbox"
                    name="tags"
                    id={tag.name_tags}
                    value={tag.id_tags}
                    checked={tagsData.some(
                      (data) => data.id_tags === tag.id_tags
                    )}
                  />
                  <label htmlFor={tag.name_tags}>{tag.name_tags}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-2 border-b-0 border-[#4A4A4A] flex items-center justify-between px-2 bg-[#E0E4EC]">
          <div className="flex flex-col w-full">
            <div className="flex flex-col pt-1 w-full relative">
              <label htmlFor="categories" className="text-[#8E8E92] absolute">
                Catégories
              </label>
              {categories.map((category) => (
                <div key={category.id_categories}>
                  <input
                    type="checkbox"
                    name="categories"
                    id={category.name_categories}
                    value={category.id_categories}
                    checked={categoriesData.some(
                      (data) => data.id_categories === category.id_categories
                    )}
                    onChange={handleCategories}
                  />
                  <label htmlFor={category.name_categories}>
                    {category.name_categories}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-4">
          <button
            onClick={handleSubmit}
            type="submit"
            id="EditTransaction"
            className="flex justify-between items-center rounded-xl bg-[#E0E4EC] h-10 w-full p-2"
          >
            <span className="text-xl text-black">Modifier</span>
            <span>
              <EditCircle className={"w-7 h-7"} stroke={"#0e1217"} />
            </span>
          </button>
        </div>
      </form>
    </>
  );
};

export default FormEditTransaction;
