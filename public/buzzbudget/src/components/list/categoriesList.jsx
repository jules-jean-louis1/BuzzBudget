// CategoriesList.jsx
const CategoriesList = ({ categories }) => {
  return (
    <div>
      {categories &&
        categories.map((category, index) => (
          <p key={index} className="text-gray-50">
            {category.name_categories}
          </p>
        ))}
      {!categories.length && <p>Aucune catégorie</p>}
    </div>
  );
};

export default CategoriesList;
