// CategoriesList.jsx
const TagsList = ({ tags }) => {
  return (
    <>
      <div className="flex flex-col space-y-2 pt-3">
        {tags &&
          tags.map((tags, index) => (
            <div key={index} className="p-3 rounded-xl bg-[#ced1da]">
              <div className="text-lg text-white font-medium">
                <h4 className="flex text-black">
                  <span>{tags.name_tags}</span>
                </h4>
              </div>
            </div>
          ))}
        {!tags.length && <p>Aucun tags</p>}
      </div>
    </>
  );
};

export default TagsList;
