
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}

export const ProductModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductModalProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold leading-tight">{product.title}</h2>
            <p className="text-muted-foreground">{product.description}</p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
              <Button onClick={onAddToCart}>Add to Cart</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
