import BtnDeleteCategories from "../button/btnDeleteCategories";
import BtnEditCategories from "../button/btnEditCategories";
// CategoriesList.jsx
const CategoriesList = ({ categories, onSuccesDelete, onSuccessEdit }) => {
  return (
    <div className="flex flex-col space-y-2 pt-3">
      {categories &&
        categories.map((category, index) => (
          <div key={index} className="rounded-xl bg-[#ced1da]">
            <div className="flex justify-between text-lg text-white font-medium">
              <h4 className="text-black p-3">
                <span>{category.name_categories}</span>
              </h4>
              <div className="flex items-center">
                <BtnEditCategories
                  categoriesId={category.id_categories}
                  valueCategories={category.name_categories}
                  onSuccessEdit={onSuccessEdit}
                />
                <BtnDeleteCategories
                  categoriesId={category.id_categories}
                  onSuccesDelete={onSuccesDelete}
                />
              </div>
            </div>
          </div>
        ))}
      {!categories.length && <p>Aucune catégorie</p>}
    </div>
  );
};

export default CategoriesList;
