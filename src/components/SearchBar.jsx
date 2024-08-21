import { useEffect, useRef } from "react";
import useDebounce from "../hooks/useDebounce";

const SearchBar = ({ search, setSearch, fetchPostsWithSearch }) => {
  const debouncedSearch = useDebounce(search, 300);
  const hasMounted = useRef(false);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (
      hasMounted.current &&
      debouncedSearch != undefined &&
      debouncedSearch != null
    ) {
      fetchPostsWithSearch(debouncedSearch);
    } else {
      hasMounted.current = true;
    }
  }, [debouncedSearch]);

  return (
    <input
      type="search"
      value={search}
      onChange={handleChange}
      placeholder="Search posts"
      className="w-full p-4 border outline-purple-400 rounded-xl"
    />
  );
};

export default SearchBar;
