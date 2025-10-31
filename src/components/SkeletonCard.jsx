import useThemeStore from "../store/themeStore";

const SkeletonCard = () => {
    const { isDark } = useThemeStore();
    return (
        <div className={`rounded-lg shadow-sm p-4 animate-pulse ${isDark ? "bg-gray-800" : "bg-white"}`}>
            <div className={`w-full h-48 rounded-lg mb-4 ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
            <div className={`h-4 rounded mb-2 ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
            <div className={`h-4 rounded mb-3 w-3/4 ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
            <div className={`h-3 rounded mb-2 w-2/3 ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
            <div className={`h-5 rounded mb-4 w-1/3 ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
            <div className={`h-10 rounded-lg w-full ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
        </div>
    );
};

export default SkeletonCard;

