import React, { useState } from "react";
import GenericInput from "./input/genericInput";

function FormAddTransaction() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState(false);
  const [recurrent, setRecurrent] = useState(false);
  return (
    <div>
      <h1>FormAddTransaction</h1>
      <form action="" method="post">
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
          <button onClick={() => setDescription(!description)}>Ajouter</button>
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
          <button onClick={() => setRecurrent(!recurrent)}>Ajouter</button>
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
      </form>
    </div>
  );
}

export default FormAddTransaction;
