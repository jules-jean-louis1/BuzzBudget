import { useEffect, useRef, useState } from "react";
import useCategories from "../hook/useCategories";
import useTags from "../hook/useTags";
import { jwtDecode } from "jwt-decode";

const FormFilter = () => {
  const [search, setSearch] = useState(""); // [1]
  const [selectedCat, setSelectedCat] = useState(null); // [1]
  const [filter, setFilter] = useState(false);
  const formRef = useRef();

  const storedUser = localStorage.getItem("user_data");
  const user = useRef(storedUser ? jwtDecode(storedUser) : null);
  // get categories and tags
  const { categories, isLoading, reload } = useCategories();
  const { tags, isLoadingTags, reloadTags } = useTags();

  const fetchData = async () => {
    try {
      const formData = new FormData(formRef.current);
      const response = await fetch(
        `http://localhost:80/buzzbudget/src/history/get/filter/${user.current.id}`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, selectedCat]);

  const handleChangeSearch = (e) => {
    if (e.target.value.length > 2) {
      setSearch(e.target.value);
    }
  };
  const handleChangeCat = (e) => {
    setSelectedCat(e.target.value);
  };
  const handleChangeTag = (e) => {
    console.log(e.target.value);
  };
  const handleChangeDate = (e) => {
    console.log(e.target.value);
  };
  const handleChangePaymentMethod = (e) => {
    console.log(e.target.value);
  };
  const handleChangeOrder = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <form ref={formRef} action="" method="post">
        <div id="containerInputAuto" className="flex">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Rechercher..."
            onKeyUp={handleChangeSearch}
          />
          <button type="button" onClick={() => setFilter(!filter)}>
            Filter
          </button>
        </div>
        <div id="optionFilter">
          <div id="containerFilter">
            {filter && (
              <>
                <div id="filterCategories">
                  <select
                    name="categories"
                    id="categories"
                    onChange={handleChangeCat}
                  >
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
                  <select name="tags" id="tags" onChange={handleChangeTag}>
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
                  <input
                    type="date"
                    name="date"
                    id="date"
                    onChange={handleChangeDate}
                  />
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
                    onChange={handleChangePaymentMethod}
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
                    onChange={handleChangeOrder}
                  >
                    <option value="asc">Croissant</option>
                    <option value="desc">Décroissant</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default FormFilter;
