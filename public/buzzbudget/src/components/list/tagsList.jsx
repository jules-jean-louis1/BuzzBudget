import BtnDeleteTags from "../button/btnDeleteTags";
import BtnEditTags from "../button/btnEditTags";

// CategoriesList.jsx
const TagsList = ({ tags, onSuccesDelete }) => {
  return (
    <>
      <div className="flex flex-col space-y-2 pt-3">
        {tags &&
          tags.map((tags, index) => (
            <div key={index} className="rounded-xl bg-[#ced1da]">
              <div className="flex justify-between text-lg text-white font-medium">
                <h4 className="text-black p-3">
                  <span>{tags.name_tags}</span>
                </h4>
                <div className="flex items-center">
                  <BtnEditTags
                    tagsId={tags.id_tags}
                    valueTags={tags.name_tags}
                  />
                  <BtnDeleteTags
                    tagsId={tags.id_tags}
                    onSuccesDelete={onSuccesDelete}
                  />
                </div>
              </div>
            </div>
          ))}
        {!tags.length && <p>Aucun tags</p>}
      </div>
    </>
  );
};

export default TagsList;
