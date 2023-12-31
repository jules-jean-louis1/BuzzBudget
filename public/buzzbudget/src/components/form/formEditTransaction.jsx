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
  const [nameTransaction, setNameTransaction] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [description, setDescription] = useState("");

  // Error
  const [errorName, setErrorName] = useState("");
  const [errorAmount, setErrorAmount] = useState("");
  const [errorDate, setErrorDate] = useState("");
  const [errorType, setErrorType] = useState("");
  const [errorPaymentMethod, setErrorPaymentMethod] = useState("");

  const handleCategories = (event) => {
    const selectedCategoryId = event.target.value;
    if (selectedCategoryId) {
      setCategoriesData([{ id_categories: parseInt(selectedCategoryId) }]);
    } else {
      setCategoriesData([]);
    }
  };

  const handleTags = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setTagsData([...tagsData, { id_tags: parseInt(value) }]);
    } else {
      setTagsData(tagsData.filter((data) => data.id_tags !== parseInt(value)));
    }
  };
  console.log(categoriesData);
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

        // Set value
        setNameTransaction(data.success.transaction.name_transaction || "");
        setAmount(data.success.transaction.amount_transaction || "");
        setDate(
          data.success.transaction.date_of_transaction
            ? data.success.transaction.date_of_transaction.substring(0, 10)
            : ""
        );
        setSelectedType(data.success.transaction.type_of_transaction || "");
        setSelectedPaymentMethod(data.success.transaction.payment_method || "");
        setDescription(data.success.transaction.description || "");
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
  }, [transactionId]);

  const sendData = async () => {
    const formData = new FormData(formRef.current);
    formData.append("tags", JSON.stringify(tagsData));
    formData.append("categories", JSON.stringify(categoriesData));
    try {
      const response = await fetch(
        `http://localhost:80/buzzbudget/src/testEdit/${transactionId}`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    if (buttonClicked) {
      sendData();
      setButtonClicked(false);
    }
  }, [buttonClicked]);

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
            <div className="flex flex-col w-full relative">
              <p className="text-[#8E8E92] absolute">Tags</p>
              <div className="pt-6">
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
                      onChange={handleTags}
                    />
                    <label htmlFor={tag.name_tags}>{tag.name_tags}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-2 border-[#4A4A4A] flex items-center justify-between px-2 bg-[#E0E4EC] h-16 rounded-b-xl">
          <div className="flex flex-col w-full h-full justify-evenly">
            <div className="flex flex-col pt-1 w-full h-full relative space-y-7">
              <label htmlFor="categories" className="text-[#8E8E92] absolute">
                Catégories
              </label>
              <select
                name="categories"
                id="categories"
                value={categoriesData[0]?.id_categories || "n/a"}
                onChange={handleCategories}
              >
                <option value="n/a">Non défini</option>
                {categories.map((categorie) => (
                  <option
                    key={categorie.id_categories}
                    value={categorie.id_categories}
                  >
                    {categorie.name_categories}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <button
            onClick={handleSubmit}
            type="submit"
            id="EditTransaction"
            className="flex justify-between items-center rounded-xl bg-[#E0E4EC] w-full px-2 py-4"
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
