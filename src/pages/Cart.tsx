import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateQuantity, removeFromCart } from "@/store/cartSlice";

interface CartItem extends Product {
  quantity: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Get both items and total from Redux store
  const { items, total } = useSelector((state: RootState) => state.cart);

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            className="mb-8"
            onClick={() => navigate("/products")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Store
          </Button>
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <Button onClick={() => navigate("/products")}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate("/products")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Store
        </Button>

        <div className="space-y-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 p-4 bg-card rounded-lg shadow-sm"
            >
              <div className="w-24 h-24 relative rounded-md overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  ${item.price.toFixed(2)} each
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleUpdateQuantity(
                        item.id,
                        Math.max(0, item.quantity - 1)
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium">Total</span>
              <span className="text-2xl font-semibold">
                ${total.toFixed(2)}
              </span>
            </div>
            <Button className="w-full" size="lg">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
