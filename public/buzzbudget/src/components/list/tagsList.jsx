// CategoriesList.jsx
const TagsList = ({ tags }) => {
  return (
    <div>
      {tags &&
        tags.map((category, index) => (
          <p key={index} className="text-gray-50">
            {tags.name_tags}
          </p>
        ))}
      {!tags.length && <p>Aucun tags</p>}
    </div>
  );
};

export default TagsList;
