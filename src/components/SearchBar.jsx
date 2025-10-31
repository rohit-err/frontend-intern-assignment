import useProductStore from "../store/productStore";
import useThemeStore from "../store/themeStore";

const SearchBar = () => {
  const { searchText, setSearchText } = useProductStore();
  const { isDark } = useThemeStore();

  return (
    <div className="w-full sm:w-auto sm:flex-1 sm:max-w-md">
      <div className="relative">
        <span
          className={`absolute left-3 top-1/2 -translate-y-1/2 text-lg ${isDark ? "text-gray-400" : "text-gray-400"
            }`}
        >
          🔍
        </span>

        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={`w-full rounded-lg pl-10 pr-4 py-2 text-sm font-medium transition-all ${isDark
            ? "bg-gray-800 text-gray-200 border border-gray-700 placeholder:text-gray-500 focus:border-gray-600 focus:ring-2 focus:ring-gray-600"
            : "bg-white text-gray-700 border border-gray-200 placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            } focus:outline-none`}
        />

        {searchText && (
          <button
            onClick={() => setSearchText("")}
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm transition-colors ${isDark
              ? "text-gray-400 hover:text-gray-200"
              : "text-gray-400 hover:text-gray-600"
              }`}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
