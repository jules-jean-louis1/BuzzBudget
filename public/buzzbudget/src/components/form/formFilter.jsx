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
            name="autoComplete"
            id="autoComplete"
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
                      <option value="">--Choisir une catégorie--</option>
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
                      <option value="">--Choisir un tag--</option>
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
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default FormFilter;
