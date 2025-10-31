import useProductStore from "../store/productStore";
import useThemeStore from "../store/themeStore";

const ProductCard = ({ product }) => {
  const { openProductModal, toggleFavorite, favorites } = useProductStore();
  const { isDark } = useThemeStore();
  const isFavorite = favorites.includes(product.id);

  return (
    <div
      className={`relative rounded-lg shadow-sm p-4 hover:shadow-lg transition-all duration-300 group ${isDark ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:shadow-xl"
        }`}
    >
      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(product.id);
        }}
        className={`absolute top-3 right-3 text-xl transition-transform hover:scale-110 z-10 ${isFavorite ? "animate-pulse" : ""
          }`}
        aria-label="Toggle favorite"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      {/* Product Image */}
      <div
        className={`w-full h-48 flex items-center justify-center mb-4 rounded-lg overflow-hidden ${isDark ? "bg-gray-900/50" : "bg-gray-50"
          }`}
      >
        <img
          src={product.image}
          alt={product.title}
          className="object-contain h-full w-full p-4 group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <h2
        className={`font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem] ${isDark ? "text-gray-100" : "text-gray-900"
          }`}
      >
        {product.title}
      </h2>

      <p
        className={`text-xs mb-2 capitalize ${isDark ? "text-gray-400" : "text-gray-500"
          }`}
      >
        {product.category}
      </p>

      <p className={`font-bold text-base mb-4 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
        ${product.price.toFixed(2)}
      </p>

      <button
        onClick={() => openProductModal(product)}
        className={`w-full rounded-lg text-sm py-2.5 font-medium transition-all ${isDark
          ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
