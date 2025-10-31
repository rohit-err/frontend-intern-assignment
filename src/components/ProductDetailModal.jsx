import useProductStore from "../store/productStore";
import useThemeStore from "../store/themeStore";

const ProductDetailModal = () => {
    const { selectedProduct, closeProductModal, showProductDetailsModal } = useProductStore();
    const { isDark } = useThemeStore();

    if (!showProductDetailsModal || !selectedProduct) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
            onClick={closeProductModal}
        >
            <div
                className={`w-full max-w-lg rounded-lg shadow-2xl overflow-hidden animate-slideUp ${isDark ? "bg-gray-800" : "bg-white"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    className={`flex items-center justify-between p-4 border-b ${isDark ? "border-gray-700" : "border-gray-200"
                        }`}
                >
                    <h2
                        className={`text-base font-semibold line-clamp-1 pr-4 ${isDark ? "text-gray-100" : "text-gray-900"
                            }`}
                    >
                        {selectedProduct.title}
                    </h2>

                    <button
                        onClick={closeProductModal}
                        className={`text-2xl leading-none transition-colors flex-shrink-0 ${isDark
                            ? "text-gray-400 hover:text-gray-200"
                            : "text-gray-400 hover:text-gray-600"
                            }`}
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Image */}
                    <div
                        className={`w-full flex items-center justify-center mb-6 rounded-lg p-6 ${isDark ? "bg-gray-900/50" : "bg-gray-50"
                            }`}
                    >
                        <img
                            src={selectedProduct.image}
                            alt={selectedProduct.title}
                            className="w-48 h-48 object-contain"
                        />
                    </div>

                    {/* Description */}
                    <p
                        className={`text-sm leading-relaxed mb-4 ${isDark ? "text-gray-300" : "text-gray-600"
                            }`}
                    >
                        {selectedProduct.description}
                    </p>

                    {/* Category & Price */}
                    <div
                        className={`flex items-center justify-between py-3 mb-3 border-t border-b ${isDark ? "border-gray-700" : "border-gray-200"
                            }`}
                    >
                        <p
                            className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                            Category:{" "}
                            <span
                                className={`capitalize font-medium ${isDark ? "text-gray-100" : "text-gray-900"
                                    }`}
                            >
                                {selectedProduct.category}
                            </span>
                        </p>

                        <p className={`font-bold text-lg ${isDark ? "text-gray-100" : "text-gray-900"}`}>
                            ${selectedProduct.price.toFixed(2)}
                        </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-yellow-500 font-medium">
                            ⭐ {selectedProduct.rating.rate}
                        </span>
                        <span
                            className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"
                                }`}
                        >
                            ({selectedProduct.rating.count} reviews)
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;
