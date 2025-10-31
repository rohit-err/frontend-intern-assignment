import { useEffect } from "react"
import SearchBar from "../components/SearchBar"
import FilterBar from "../components/FilterBar"
import ProductCard from "../components/ProductCard"
import SkeletonCard from "../components/SkeletonCard"
import ProductDetailModal from "../components/ProductDetailModal"
import useProductStore from "../store/productStore"
import useThemeStore from "../store/themeStore"

const Dashboard = () => {
    const { paginatedProducts, products, isLoading, fetchProducts, prevPage, nextPage, currentPage, itemsPerPage, error } = useProductStore()
    const { isDark, toggleTheme } = useThemeStore()
    const totalPages = Math.ceil(products.length / itemsPerPage)

    // fetch products when component mounts
    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    if (isLoading) {
        return (
            <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
                <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
            </div>
        )
    }
    if (error) {
        return (
            <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
                <div className="max-w-6xl mx-auto p-6">
                    <div className={`rounded-lg p-8 text-center shadow-sm ${isDark ? "bg-gray-800" : "bg-white"}`}>
                        <h2 className={`text-lg font-semibold mb-3 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
                            Failed to load products
                        </h2>

                        <p className={`text-sm mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            {error}
                        </p>

                        <button
                            onClick={fetchProducts}
                            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${isDark
                                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
            {/* Header */}
            <header className={`sticky top-0 z-10 border-b backdrop-blur-sm transition-colors ${isDark ? "bg-gray-800/95 border-gray-700" : "bg-white/95 border-gray-200"}`}>
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className={`text-xl font-semibold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                        Product Dashboard
                    </h1>
                    <button
                        onClick={toggleTheme}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isDark ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                        {isDark ? "☀️ Light" : "🌙 Dark"}
                    </button>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-6xl mx-auto px-6 py-8">
                {/* Search + Filters */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
                    <SearchBar />
                    <FilterBar />
                </div>

                {/* Products */}
                {paginatedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {paginatedProducts.map(item => <ProductCard key={item.id} product={item} />)}
                    </div>
                ) : (
                    <div className={`text-center py-16 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        <p className="text-lg">No products found</p>
                    </div>
                )}

                {/* Pagination */}
                {paginatedProducts.length > 0 && (
                    <div className="flex items-center justify-center gap-3 py-6">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 0}
                            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${isDark
                                ? "bg-gray-800 text-gray-200 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-600"
                                : "bg-white text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 border border-gray-200"
                                } disabled:cursor-not-allowed`}
                        >
                            ← Prev
                        </button>

                        <span className={`text-sm font-medium px-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                            Page {currentPage + 1} of {totalPages}
                        </span>

                        <button
                            onClick={nextPage}
                            disabled={currentPage >= totalPages - 1}
                            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${isDark
                                ? "bg-gray-800 text-gray-200 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-600"
                                : "bg-white text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 border border-gray-200"
                                } disabled:cursor-not-allowed`}
                        >
                            Next →
                        </button>
                    </div>
                )}
            </main>

            <ProductDetailModal />
        </div>
    )
}

export default Dashboard
