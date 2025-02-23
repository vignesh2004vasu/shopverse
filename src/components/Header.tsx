import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-yellow-400 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1
              className="text-xl sm:text-2xl font-bold cursor-pointer text-black hover:text-gray-800"
              onClick={() => navigate("/")}
            >
              Shopverse
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between flex-1 pl-8">
            {!isLandingPage && onSearchChange && (
              <div className="flex-1 max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search products..."
                    className="w-full pl-12 h-12 bg-white border-2 border-gray-200 text-black
                      placeholder:text-gray-500 rounded-full outline-none
                      focus:border-black focus:ring-2 focus:ring-yellow-200"
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                </div>
              </div>
            )}

            {isLandingPage && (
              <nav className="flex gap-8">
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
              </nav>
            )}
          </div>

          {/* Cart and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button className="relative p-2" onClick={() => navigate("/cart")}>
              <ShoppingCart className="h-6 w-6 text-black" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-black" />
              ) : (
                <Menu className="h-6 w-6 text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {!isLandingPage && (
              <>
                <div className="mb-4">
                  <input
                    type="search"
                    placeholder="Search products..."
                    className="w-full pl-12 h-12 bg-white border-2 border-gray-200 text-black
                      placeholder:text-gray-500 rounded-full outline-none"
                    onChange={(e) => onSearchChange?.(e.target.value)}
                  />
                </div>
                {categories && (
                  <div className="flex flex-col gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          onCategoryChange?.(category);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium
                          ${
                            selectedCategory === category
                              ? "bg-yellow-200 text-black"
                              : "bg-orange-400 text-black"
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
            {isLandingPage && (
              <nav className="flex flex-col gap-4">
                <button
                  className="text-black hover:text-gray-800 font-medium py-2"
                  onClick={() => {
                    navigate("/products");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Shop Now
                </button>
                <button
                  className="text-black hover:text-gray-800 font-medium py-2"
                  onClick={() => {
                    navigate("/about");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  About
                </button>
                <button
                  className="text-black hover:text-gray-800 font-medium py-2"
                  onClick={() => {
                    navigate("/contact");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Contact
                </button>
              </nav>
            )}
          </div>
        )}

        {/* Desktop Categories */}
        {!isLandingPage && !isMobileMenuOpen && categories && (
          <div className="hidden md:flex justify-center mt-4">
            <div className="flex gap-2 overflow-x-auto py-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange?.(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium
                    ${
                      selectedCategory === category
                        ? "bg-yellow-200 text-black"
                        : "bg-orange-400 text-black hover:bg-orange-500"
                    }`}
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
