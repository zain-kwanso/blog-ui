import { useEffect, useRef } from "react";
import useDebounce from "../hooks/useDebounce";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  fetchPostsWithSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  search,
  setSearch,
  fetchPostsWithSearch,
}) => {
  const debouncedSearch = useDebounce(search, 300);
  const hasMounted = useRef(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
