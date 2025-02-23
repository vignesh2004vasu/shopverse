import { ShoppingCart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  cartCount: number;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
  searchQuery: string; // Add this line
}

export const Header = ({
  cartCount,
  onSearchChange,
  selectedCategory,
  categories,
  onCategoryChange,
  searchQuery, // Add this line
}: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-morphism">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 
              className="text-2xl font-semibold tracking-tight cursor-pointer"
              onClick={() => navigate("/")}
            >
              Store
            </h1>
          </div>
          
          <div className="flex-1 flex justify-center space-x-4">
            <div className="relative w-full max-w-2xl"> {/* Changed from max-w-xs to max-w-2xl */}
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10 h-10 text-base" /* Added h-10 for height and text-base for font size */
                onChange={(e) => onSearchChange(e.target.value)}
                value={searchQuery} /* Add this prop */
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={cn(
                    "px-3 py-1 rounded text-sm transition-colors",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-end">
            <button 
              className="relative p-2 rounded-full hover:bg-secondary/80 transition-colors"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center"
                  variant="destructive"
                >
                  {cartCount}
                </Badge>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
