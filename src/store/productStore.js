import { create } from "zustand";
import axios from "axios";

const savedFavorites = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("favorites") || "[]") : [];
const useProductStore = create((set, get) => ({
    allProducts: [],
    products: [],
    categories: [],
    selectedCategory: "All",
    sortOptions: ["Sort by", "Price: Low to High", "Price: High to Low"],
    selectedSortOption: "Sort by",
    isLoading: true,
    error: null,
    selectedProduct: null,
    showProductDetailsModal: false,
    searchText: "",
    currentPage: 0,
    itemsPerPage: 6,
    paginatedProducts: [],
    favorites: savedFavorites,

    toggleFavorite: (id) => {
        const { favorites } = get();
        const updatedFavorites = favorites.includes(id)
            ? favorites.filter((favId) => favId !== id)
            : [...favorites, id];

        set({ favorites: updatedFavorites });

        if (typeof window !== "undefined") {
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        }
    },

    nextPage: () => {
        set({ currentPage: get().currentPage + 1 });
        get().applyPagination();
    },

    prevPage: () => {
        set({ currentPage: get().currentPage - 1 });
        get().applyPagination();
    },

    applyPagination: () => {
        const { products, currentPage, itemsPerPage } = get();

        if (products.length === 0) {
            set({ paginatedProducts: [], currentPage: 0 });
            return;
        }

        const maxPage = Math.ceil(products.length / itemsPerPage) - 1;
        const safePage = Math.min(currentPage, Math.max(0, maxPage));

        const startIndex = safePage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginated = products.slice(startIndex, endIndex);

        set({
            paginatedProducts: paginated,
            currentPage: safePage
        });
    },

    setSelectedCategory: (cat) => {
        set({ selectedCategory: cat, currentPage: 0 });
        get().applyFilters();
    },

    setSelectedSortOption: (opt) => {
        set({ selectedSortOption: opt, currentPage: 0 });
        get().applyFilters();
    },

    setSearchText: (text) => {
        set({ searchText: text, currentPage: 0 });
        get().applyFilters();
    },

    setSelectedProduct: (product) => set({ selectedProduct: product }),

    openProductModal: (product) =>
        set({ showProductDetailsModal: true, selectedProduct: product }),

    closeProductModal: () =>
        set({ showProductDetailsModal: false, selectedProduct: null }),

    fetchProducts: async () => {
        set({ isLoading: true, error: null });

        try {
            const res = await axios.get("https://fakestoreapi.com/products");
            const products = res.data;
            const uniqueCategories = ["All", ...new Set(products.map((p) => p.category))];

            set({
                allProducts: products,
                products,
                categories: uniqueCategories,
            });

            get().applyPagination();
        } catch (error) {
            console.error(error);
            set({ error: "Failed to load products" });
        } finally {
            set({ isLoading: false });
        }
    },

    applyFilters: () => {
        const { searchText, allProducts, selectedCategory, selectedSortOption } = get();
        let filtered = [...allProducts];

        if (searchText.trim()) {
            filtered = filtered.filter((p) =>
                p.title.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        if (selectedCategory !== "All") {
            filtered = filtered.filter((p) => p.category === selectedCategory);
        }

        if (selectedSortOption !== "Sort by") {
            filtered.sort((a, b) =>
                selectedSortOption === "Price: Low to High" ? a.price - b.price : b.price - a.price
            );
        }

        set({ products: filtered });
        get().applyPagination();
    },
}));

export default useProductStore;
