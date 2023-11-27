import { useState } from "react";
import GenericInput from "./input/genericInput";
import useCategories from "../hook/useCategories";
import GenericAddBtn from "../button/AddSome/GenericAddBtn";

function FormAddTransaction() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState(false);
  const [recurrent, setRecurrent] = useState(false);
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState(false);

  const { categories, isLoading, reload } = useCategories();

  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <h1>Ajouter un transaction</h1>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div>
          <GenericInput
            label={"Nom de la transaction"}
            type={"text"}
            name={"name"}
            id={"name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <GenericInput
          label={"Montant"}
          type={"number"}
          name={"amount"}
          id={"amount"}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <GenericInput
          label={"Date"}
          type={"date"}
          name={"date"}
          id={"date"}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div>
          <label htmlFor="type">Méthode de paiement</label>
          <select name="type" id="type">
            <option value="1">Carte</option>
            <option value="2">Espèces</option>
            <option value="3">Chèque</option>
          </select>
        </div>
        <div>
          <p>Déscription</p>
          <button onClick={() => setDescription(!description)}>
            {description ? "Masquer" : "Ajouter"}
          </button>

          {description && (
            <div>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
              ></textarea>
            </div>
          )}
        </div>
        <div>
          <p>Récurrent</p>
          <button onClick={() => setRecurrent(!recurrent)}>
            {recurrent ? "Masquer" : "Ajouter"}
          </button>
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
        <div className="pt-14">
          <GenericAddBtn text={"Ajouter une transaction"} />
        </div>
      </form>
    </div>
  );
}

export default FormAddTransaction;
