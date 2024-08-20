import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { url } from "../utils/API";

const SearchBar = ({ search, setSearch, fetchPosts }) => {
  const debouncedSearch = useDebounce(search, 1000);
  const location = useLocation();
  const hasMounted = useRef(false);

  const [, setSearchParams] = useSearchParams();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (
      hasMounted.current &&
      debouncedSearch != undefined &&
      debouncedSearch != null
    ) {
      fetchPostsWithSearch();
    } else {
      hasMounted.current = true;
    }
  }, [debouncedSearch]);

  const fetchPostsWithSearch = async () => {
    await fetchPosts({ search: debouncedSearch });
    setSearchParams(debouncedSearch ? `?search=${debouncedSearch}` : "");
  };

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
