import { useState, useEffect, useRef } from "react";
import GenericInput from "./input/genericInput";
import useCategories from "../hook/useCategories";
import useTags from "../hook/useTags";
import GenericAddBtn from "../button/AddSome/GenericAddBtn";
import ChevronUp from "../svg/chevronUp";
import ChevronDown from "../svg/chevronDown";

function FormAddTransaction({ onDataSuccess }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState(false);
  const [recurrent, setRecurrent] = useState(false);
  const [tag, setTag] = useState(false);
  const [category, setCategory] = useState(false);
  const [checkedTags, setCheckedTags] = useState([]);

  const [selectedType, setSelectedType] = useState("depense");
  const [dataSuccess, setDataSuccess] = useState(false);

  const { categories, isLoading, reload } = useCategories();
  const { tags, isLoadingTags, reloadTags } = useTags();

  const formRef = useRef();
  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchData = async () => {
    try {
      const formData = new FormData(formRef.current);
      const response = await fetch(
        "http://localhost:80/buzzbudget/src/transaction/add",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setDataSuccess(true);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonClicked(true);
  };

  useEffect(() => {
    if (buttonClicked) {
      fetchData();
      if (dataSuccess) {
        onDataSuccess(dataSuccess);
      }
      setButtonClicked(false);
    }
  }, [buttonClicked]);

  return (
    <div>
      <form ref={formRef} action="" method="post" onSubmit={handleSubmit}>
        <div>
          <div className="border-2 border-b-0 border-[#4A4A4A] rounded-t-xl flex items-center justify-between px-2 min-h-16 h-20">
            <GenericInput
              label={"Nom de la transaction"}
              type={"text"}
              name={"name"}
              id={"name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="border-2 border-b-0 border-[#4A4A4A] flex items-center justify-between px-2 min-h-16 h-20">
            <GenericInput
              label={"Montant"}
              type={"number"}
              name={"amount"}
              id={"amount"}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="border-2 border-b-0 border-[#4A4A4A] flex items-center justify-between px-2  min-h-16 h-20">
            <GenericInput
              label={"Date"}
              type={"date"}
              name={"date"}
              id={"date"}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="border-2 border-b-0 border-[#4A4A4A] flex items-center justify-between px-2 min-h-16 h-20">
            <div className="flex flex-col pt-1 w-full relative">
              <label htmlFor="type" className="text-[#8E8E92] absolute">
                Type
              </label>
              <select
                name="type"
                id="type"
                className="bg-[#0E1217] rounded-xl p-3 text-white text-xl outline-none mt-1"
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="depense">Dépense</option>
                <option value="revenu">Revenu</option>
              </select>
            </div>
          </div>

          {selectedType === "depense" && (
            <div className="border-2 border-b-0 border-[#4A4A4A] flex items-center justify-between px-2 min-h-16 h-20">
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
                  className="bg-[#0E1217] rounded-xl p-3 text-white text-xl outline-none mt-1"
                >
                  <option value="n/a">Non défini</option>
                  <option value="carte">Carte</option>
                  <option value="espece">Espèces</option>
                  <option value="cheque">Chèque</option>
                  <option value="virement">Virement</option>
                </select>
              </div>
            </div>
          )}
          <div className="border-2 border-b-0 border-[#4A4A4A] flex items-center justify-between px-2 min-h-[80px] max-h-full">
            <div className="flex flex-col h-full w-full py-4">
              <div className="w-full flex items-center justify-between">
                <p className="text-white text-xl">Description</p>
                <button
                  type="button"
                  onClick={() => setDescription(!description)}
                >
                  {description ? (
                    <div className="p-2 rounded-md bg-[#1c1f26]">
                      <p className="text-[#a8b3cfa3]">Masquer</p>
                    </div>
                  ) : (
                    <div className="p-2 rounded-md bg-[#1c1f26]">
                      <p className="text-[#a8b3cfa3]">Ajouter</p>
                    </div>
                  )}
                </button>
              </div>
              {description && (
                <div className="w-full h-fit ">
                  <textarea
                    name="description"
                    id="description"
                    cols="40"
                    rows="5"
                    className="bg-[#1C1F26] rounded-lg w-full p-3 text-white text-xl outline-none"
                  ></textarea>
                </div>
              )}
            </div>
          </div>
          <div className="border-2 border-b-0 border-[#4A4A4A] flex items-center justify-between px-2 min-h-[80px] max-h-full">
            <div className="flex flex-col w-full h-full py-4">
              <div className="w-full h-full flex items-center justify-between">
                <p className="text-white text-xl">Récurrence</p>
                <button type="button" onClick={() => setRecurrent(!recurrent)}>
                  {recurrent ? (
                    <div className="p-2 rounded-md bg-[#1c1f26]">
                      <p className="text-[#a8b3cfa3]">Masquer</p>
                    </div>
                  ) : (
                    <div className="p-2 rounded-md bg-[#1c1f26]">
                      <p className="text-[#a8b3cfa3]">Ajouter</p>
                    </div>
                  )}
                </button>
              </div>
              {recurrent && (
                <div className="w-full">
                  <select
                    name="recurrent"
                    id="recurrent"
                    className="bg-[#1C1F26] rounded-lg w-full p-3 text-white text-xl outline-none"
                  >
                    <option value="day">Jour</option>
                    <option value="week">Semaine</option>
                    <option value="month">Mois</option>
                    <option value="year">Année</option>
                  </select>
                </div>
              )}
            </div>
          </div>
          <div className="border-2 border-b-0 border-[#4A4A4A] flex items-center justify-between px-2 min-h-[80px] max-h-full">
            <div
              className="flex flex-col w-full h-full py-4"
              id="containersCategories"
            >
              <div className="w-full h-full flex items-center justify-between">
                <p className="text-white text-xl">Catégories</p>
                <button type="button" onClick={() => setCategory(!category)}>
                  {category ? (
                    <div className="p-2 rounded-md bg-[#1c1f26]">
                      <p className="text-[#a8b3cfa3]">Masquer</p>
                    </div>
                  ) : (
                    <div className="p-2 rounded-md bg-[#1c1f26]">
                      <p className="text-[#a8b3cfa3]">Ajouter</p>
                    </div>
                  )}
                </button>
              </div>
              {category && (
                <div>
                  <div>
                    <select
                      name="categories"
                      id="categories"
                      className="bg-[#1C1F26] rounded-lg w-full p-3 text-white text-xl outline-none"
                    >
                      {categories.map((category) => (
                        <option
                          value={category.id_categories}
                          key={category.id_categories}
                        >
                          {category.name_categories}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="border-2 border-b-2 rounded-b-xl border-[#4A4A4A] flex items-center justify-between px-2 min-h-[80px] max-h-full">
            <div className="flex flex-col w-full h-full py-4">
              <div className="w-full h-full flex items-center justify-between">
                <p className="text-white text-xl">Tags</p>
                <button type="button" onClick={() => setTag(!tag)}>
                  {tag ? (
                    <div className="p-2 rounded-md bg-[#1c1f26]">
                      <p className="text-[#a8b3cfa3]">Masquer</p>
                    </div>
                  ) : (
                    <div className="p-2 rounded-md bg-[#1c1f26]">
                      <p className="text-[#a8b3cfa3]">Ajouter</p>
                    </div>
                  )}
                </button>
              </div>
              {tags && tag && (
                <div>
                  <div>
                    {tags.map((tag) => (
                      <div key={tag.id_tags}>
                        <input
                          type="checkbox"
                          name="tags[]"
                          id={`tags${tag.id_tags}`}
                          value={tag.id_tags}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCheckedTags([...checkedTags, e.target.value]);
                            } else {
                              setCheckedTags(
                                checkedTags.filter(
                                  (id) => id !== e.target.value
                                )
                              );
                            }
                          }}
                        />
                        <label htmlFor={`tags${tag.id_tags}`}>
                          {tag.name_tags}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="pt-14">
          <GenericAddBtn text={"Ajouter une transaction"} />
        </div>
      </form>
    </div>
  );
}

export default FormAddTransaction;
