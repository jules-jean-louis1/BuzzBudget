import { useEffect, useState } from "react";

function useTags() {
  const [tags, setTags] = useState([]);
  const [isLoadingTags, setIsLoadingTags] = useState(true);

  const fetchData = async () => {
    const response = await fetch(
      "http://localhost:80/buzzbudget/src/tags/get/",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await response.json();
    setTags(result);
    setIsLoadingTags(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const reloadTags = () => {
    fetchData();
  };

  return { tags, isLoadingTags, reloadTags };
}
export default useTags;
