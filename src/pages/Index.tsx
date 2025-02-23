import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { Product } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface CartItem extends Product {
  quantity: number;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (quantity: number) => void;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const url = selectedCategory
          ? `https://fakestoreapi.com/products/category/${selectedCategory}`
          : "https://fakestoreapi.com/products";
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (quantity: number = 1) => {
    if (selectedProduct) {
      setCartItems((prev) => {
        const existingItem = prev.find(
          (item) => item.id === selectedProduct.id
        );
        if (existingItem) {
          return prev.map((item) =>
            item.id === selectedProduct.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { ...selectedProduct, quantity }];
      });

      toast({
        title: "Added to cart",
        description: `${quantity} x ${selectedProduct.title}`,
      });
      setSelectedProduct(null);
    }
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setCartItems((prev) =>
      quantity === 0
        ? prev.filter((item) => item.id !== productId)
        : prev.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartCount={cartCount}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        categories={categories}
        onCategoryChange={setSelectedCategory}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {isLoading ? (
          <div className="grid product-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-square bg-muted rounded-lg" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}
      </main>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(quantity) => handleAddToCart(quantity)}
      />
    </div>
  );
};

export default Index;
