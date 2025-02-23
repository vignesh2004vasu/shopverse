import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { Product } from "@/types";

const LandingPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = [
    "electronics",
    "jewelry",
    "men's clothing",
    "women's clothing",
  ];
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=4"
        );
        const data = await response.json();
        setFeaturedProducts(data);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartCount={cartCount}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        categories={categories}
        onCategoryChange={setSelectedCategory}
      />

      {/* Hero Section */}
      <section className="pt-56 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Welcome to Our Store
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover our curated collection of premium products at amazing
            prices
          </p>
          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary/90"
            onClick={() => navigate("/products")}
          >
            Explore Products <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div
                key={category}
                className="bg-white rounded-lg shadow-md p-6 text-center cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/products?category=${category}`)}
              >
                <h3 className="text-xl font-medium capitalize">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/products`)}
              >
                <div className="h-48 p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-4 border-t">
                  <h3 className="text-lg font-medium mb-2 line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-xl font-bold text-secondary">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-footer text-footer-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">
                We offer the best products at competitive prices.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/products"
                    className="text-gray-400 hover:text-white"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a href="/cart" className="text-gray-400 hover:text-white">
                    Cart
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">
                Email: info@store.com
                <br />
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
