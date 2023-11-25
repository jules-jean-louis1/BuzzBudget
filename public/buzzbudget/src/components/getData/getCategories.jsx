import { useState, useEffect } from "react";

function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:80/buzzbudget/src/categories/get"
      );
      const result = await response.json();
      console.log(result);
      setCategories(result);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { categories, isLoading };
}

export default useCategories;
