import { ShoppingCart, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  cartCount: number;
  onSearchChange?: (query: string) => void;
  selectedCategory?: string;
  categories?: string[];
  onCategoryChange?: (category: string) => void;
}

export const Header = ({
  cartCount,
  onSearchChange,
  selectedCategory,
  categories,
  onCategoryChange,
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-yellow-400 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="w-32">
            <h1
              className="text-2xl font-bold tracking-tight cursor-pointer text-black hover:text-gray-800"
              onClick={() => navigate("/")}
            >
              Shopverse
            </h1>
          </div>

          {/* Search Bar - only show on non-landing pages */}
          {!isLandingPage && onSearchChange && (
            <div className="flex-1 max-w-3xl mx-auto">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-12 h-14 bg-white border-2 border-gray-200 text-black text-lg
                    placeholder:text-gray-500 rounded-full outline-none
                    focus:border-black focus:ring-2 focus:ring-yellow-200
                    transition-all duration-200"
                  onChange={(e) => onSearchChange(e.target.value)}
                />
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500"
                  aria-hidden="true"
                />
              </div>
            </div>
          )}

          {/* Landing page nav items */}
          {isLandingPage && (
            <div className="flex-1 flex justify-center gap-8">
              <button
                className="text-black hover:text-gray-800 font-medium"
                onClick={() => navigate("/products")}
              >
                Shop Now
              </button>
              <button
                className="text-black hover:text-gray-800 font-medium"
                onClick={() => navigate("/about")}
              >
                About
              </button>
              <button
                className="text-black hover:text-gray-800 font-medium"
                onClick={() => navigate("/contact")}
              >
                Contact
              </button>
            </div>
          )}

          {/* Cart */}
          <div className="w-32 flex justify-end">
            <button
              className="relative p-2 rounded-full hover:bg-yellow-500 transition-colors"
              onClick={() => navigate("/cart")}
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart className="h-6 w-6 text-black" />
              {cartCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center 
                    justify-center bg-black text-white"
                  variant="destructive"
                >
                  {cartCount}
                </Badge>
              )}
            </button>
          </div>
        </div>

        {/* Categories - only show on non-landing pages */}
        {!isLandingPage && categories && onCategoryChange && (
          <div className="flex justify-center mt-4">
            <div className="flex gap-2 overflow-x-auto py-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={
                    selectedCategory === category
                      ? "px-4 py-2 rounded-full text-sm font-medium bg-yellow-200 text-black transition-colors"
                      : "px-4 py-2 rounded-full text-sm font-medium bg-orange-400 text-black hover:bg-orange-500 transition-colors"
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
