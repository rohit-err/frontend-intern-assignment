import useProductStore from "../store/productStore";
import useThemeStore from "../store/themeStore";

const FilterBar = () => {
  const { categories, sortOptions, selectedCategory, selectedSortOption, setSelectedCategory, setSelectedSortOption } = useProductStore();
  const { isDark } = useThemeStore();

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer ${isDark
          ? 'bg-gray-800 text-gray-200 border border-gray-700 focus:border-gray-600 focus:ring-2 focus:ring-gray-600'
          : 'bg-white text-gray-700 border border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-200'
          } focus:outline-none`}
      >
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        value={selectedSortOption}
        onChange={(e) => setSelectedSortOption(e.target.value)}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer ${isDark
          ? 'bg-gray-800 text-gray-200 border border-gray-700 focus:border-gray-600 focus:ring-2 focus:ring-gray-600'
          : 'bg-white text-gray-700 border border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-200'
          } focus:outline-none`}
      >
        {sortOptions.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
