import { useEffect, useRef, useState } from "react";
import useCategories from "../hook/useCategories";
import useTags from "../hook/useTags";
import { jwtDecode } from "jwt-decode";

const FormFilter = ({ onData }) => {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
      if (data.error) {
        console.log(data.error);
      } else {
        onData(data);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    search,
    selectedCat,
    selectedTag,
    selectedDate,
    selectedPaymentMethod,
    selectedOrder,
  ]);

  const handleChangeSearch = (e) => {
    if (e.target.value.length > 2) {
      setSearch(e.target.value);
    }
  };
  const handleChangeCat = (e) => {
    setSelectedCat(e.target.value);
  };
  const handleChangeTag = (e) => {
    setSelectedTag(e.target.value);
  };
  const handleChangeDate = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleChangePaymentMethod = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };
  const handleChangeOrder = (e) => {
    setSelectedOrder(e.target.value);
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
