import { useEffect, useRef, useState } from "react";
import useCategories from "../hook/useCategories";
import useTags from "../hook/useTags";

const FormFilter = () => {
  const [filter, setFilter] = useState(false);
  const formRef = useRef();
  // get categories and tags
  const { categories, isLoading, reload } = useCategories();
  const { tags, isLoadingTags, reloadTags } = useTags();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form ref={formRef} action="" method="post">
        <div id="containerInputAuto">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Rechercher..."
          />
        </div>
        <div id="containerFilter">
          <button type="button" onClick={() => setFilter(!filter)}>
            Filter
          </button>
          {filter && (
            <>
              <div id="filterCategories">
                <select name="categories" id="categories">
                  {isLoading ? (
                    <option value="">Loading...</option>
                  ) : (
                    <>
                      <option value="all">--Choisir une catégorie--</option>
                      {categories.map((category) => (
                        <option
                          key={category.id_categories}
                          value={category.id_categories}
                        >
                          {category.name_categories}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
              <div id="filterTags">
                <select name="tags" id="tags">
                  {isLoadingTags ? (
                    <option value="">Loading...</option>
                  ) : (
                    <>
                      <option value="all">--Choisir un tag--</option>
                      {tags.map((tag) => (
                        <option key={tag.id_tags} value={tag.id_tags}>
                          {tag.name_tags}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
              <div id="filterDate">
                <input type="date" name="date" id="date" />
              </div>
              <div id="containerMethode">
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
              <div id="containerOrder">
                <label htmlFor="order" className="text-[#8E8E92] absolute">
                  Ordre
                </label>
                <select
                  name="order"
                  id="order"
                  className="bg-[#0E1217] rounded-xl p-3 text-white text-xl outline-none mt-1"
                >
                  <option value="asc">Croissant</option>
                  <option value="desc">Décroissant</option>
                </select>
              </div>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default FormFilter;
