import { useEffect, useState } from "react";

function useTags() {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const reload = () => {
    fetchData();
  };

  return { tags, isLoading, reload };
}
export default useTags;
