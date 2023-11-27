import { useState } from "react";
import GenericInput from "./input/genericInput";
import useCategories from "../hook/useCategories";
import useTags from "../hook/useTags";
import GenericAddBtn from "../button/AddSome/GenericAddBtn";

function FormAddTransaction() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState(false);
  const [recurrent, setRecurrent] = useState(false);
  const [tag, setTag] = useState(false);
  const [category, setCategory] = useState(false);

  const { categories, isLoading, reload } = useCategories();
  const { tags, isLoadingTags, reloadTags } = useTags();

  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <h1>Ajouter un transaction</h1>
      <form action="" method="post" onSubmit={handleSubmit}>
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
                Méthode de paiement
              </label>
              <select
                name="type"
                id="type"
                className="bg-[#0E1217] rounded-xl p-3 text-white text-xl outline-none"
              >
                <option value="1">Carte</option>
                <option value="2">Espèces</option>
                <option value="3">Chèque</option>
              </select>
            </div>
          </div>
          <div className="border-2 border-b-0 border-[#4A4A4A] flex items-center justify-between px-2 min-h-[80px] max-h-full">
            <div className="flex flex-col h-full w-full">
              <div className="w-full flex items-center justify-between">
                <p className="text-white text-xl">Déscription</p>
                <button onClick={() => setDescription(!description)}>
                  {description ? "Masquer" : "Ajouter"}
                </button>
              </div>
              {description && (
                <div className="w-full h-fit">
                  <textarea
                    name="description"
                    id="description"
                    cols="40"
                    rows="5"
                  ></textarea>
                </div>
              )}
            </div>
          </div>
          <div className="border-2 border-b-0 border-[#4A4A4A] flex items-center justify-between px-2 min-h-16 h-20">
            <div className="w-full flex items-center justify-between">
              <p className="text-white text-xl">Récurrent</p>
              <button onClick={() => setRecurrent(!recurrent)}>
                {recurrent ? "Masquer" : "Ajouter"}
              </button>
            </div>
            {recurrent && (
              <div>
                <div>
                  <label htmlFor="recurrent">Tous les</label>
                  <input type="number" name="recurrent" id="recurrent" />
                </div>
                <div>
                  <label htmlFor="recurrent">Jour(s)</label>
                  <input type="number" name="recurrent" id="recurrent" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div></div>
        <div id="containersCategories">
          <p>Catégories</p>
          <button onClick={() => setCategory(!category)}>
            {category ? "Masquer" : "Ajouter"}
          </button>
          {category && (
            <div>
              <div>
                <label htmlFor="categories">Catégories</label>
                <select name="categories" id="categories">
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
        <div id="containerTags">
          <p>Tags</p>
          <button onClick={() => setTag(!tag)}>
            {tag ? "Masquer" : "Ajouter"}
          </button>
          {tag && (
            <div>
              <div>
                {tags.map((tag) => (
                  <div key={tag.id_tags}>
                    <input
                      type="checkbox"
                      name="tags"
                      id="tags"
                      value={tag.id_tags}
                    />
                    <label htmlFor="tags">{tag.name_tags}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="pt-14">
          <GenericAddBtn text={"Ajouter une transaction"} />
        </div>
      </form>
    </div>
  );
}

export default FormAddTransaction;
