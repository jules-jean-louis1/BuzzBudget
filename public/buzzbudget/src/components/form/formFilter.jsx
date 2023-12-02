import { useEffect, useRef, useState } from "react";

const FormFilter = () => {
  const [filter, setFilter] = useState(false);
  const formRef = useRef();

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
              <div id="filterCategories"></div>
              <div id="filterTags"></div>
              <div id="filterDate"></div>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default FormFilter;
